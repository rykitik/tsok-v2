const dragElement = { object: null, x: 0, y: 0 };

// A central function for handling the beginning of the drag event.
function initiateDrag(e) {
    let obj = e.target.classList.contains('drag') ? e.target : 
              e.target.parentNode.classList.contains('drag') ? e.target.parentNode : 
              null;
    
    if (obj && !obj.classList.contains('disabled')) {
        obj.classList.add('zTop');
        const rect = obj.getBoundingClientRect();
        dragElement.object = obj;
        dragElement.x = e.pageX - (rect.left + window.pageXOffset);
        dragElement.y = e.pageY - (rect.top + window.pageYOffset);
        
        updateDragElementPosition(e);
    }
}

// Function encapsulating the position update of the dragged element.
function updateDragElementPosition(e) {
    if (dragElement.object) {
        const newX = e.pageX - dragElement.x - 311;
        const newY = e.pageY - dragElement.y - 180;

        dragElement.object.style.left = `${newX}px`;
        dragElement.object.style.top = `${newY}px`;
    }
}

// A central function to handle dropping the dragged item.
function dropElement(e) {
    if (dragElement.object) {
        let drag = dragElement.object;
        let drops = document.querySelectorAll('.drop');

        for (let drop of drops) {
            let horizontalOverlap = Math.abs((drag.offsetLeft + drag.offsetWidth / 2) - (drop.offsetLeft + drop.offsetWidth / 2)) < (drag.offsetWidth + drop.offsetWidth) / 2;
            let verticalOverlap = Math.abs((drag.offsetTop + drag.offsetHeight / 2) - (drop.offsetTop + drop.offsetHeight / 2)) < (drag.offsetHeight + drop.offsetHeight) / 2;
            
            if (horizontalOverlap && verticalOverlap) {
                drag.style.left = (drop.offsetLeft-14)+'px'
				drag.style.top = (drop.offsetTop+drop.offsetHeight/2 - (drag.offsetHeight/2)) -5 +'px'

                if (typeof drag.drop === 'function') {
                    try {
                        drag.drop(drag, drop);
                    } catch (e) {
                        console.error(e);
                    }
                }
                break;
            }
        }

        drag.classList.remove('zTop');
        dragElement.object = null;
    }
}

document.addEventListener('mousedown', initiateDrag);
document.addEventListener('mouseup', dropElement);
document.addEventListener('mousemove', updateDragElementPosition);

// Factory function for drop element creation
function createDropElement(id, style) {
    let div = document.createElement('div');
    div.className = 'drop';
    div.id = 'drop_' + id;
    if (style) div.classList.add(style);
    return div;
}

// Factory function for drag element creation
function createDragElement(id, style, dropFunc) {
    let div = document.createElement('div');
    div.className = 'drag';
    div.id = 'drag_' + id;
    if (style) div.classList.add(style);
    div.ondragstart = () => false;
    div.drop = dropFunc || (() => {});
    return div;
}