const dragElement = {object: null, x:0, y:0}

document.addEventListener('mousedown', (e)=>{
	let obj=null
	if (e.target.classList.contains('drag')) obj=e.target
	if (e.target.parentNode.classList.contains('drag')) obj=e.target.parentNode
	if (obj && !obj.classList.contains('disabled')) {
		obj.classList.add('zTop')
		dragElement.object = obj
		dragElement.x = e.pageX - (dragElement.object.getBoundingClientRect().left + pageXOffset)
		dragElement.y = e.pageY - (dragElement.object.getBoundingClientRect().top + pageYOffset)
		
		dragElement.object.style.left=(e.pageX-dragElement.x-311)+'px'
		dragElement.object.style.top=(e.pageY-dragElement.y-180)+'px'
	}
})
document.addEventListener('mouseup', (e)=>{
	if (dragElement.object) {
		let drag = dragElement.object
		let drops = document.querySelectorAll('.drop')
		for (let drop of drops) {
			let a=(Math.abs((drag.offsetLeft-drop.offsetLeft)+((drag.offsetLeft + drag.offsetWidth)-(drop.offsetLeft + drop.offsetWidth))) < drag.offsetWidth+drop.offsetWidth)
			let b=(Math.abs((drag.offsetTop-drop.offsetTop)+((drag.offsetTop + drag.offsetHeight)-(drop.offsetTop + drop.offsetHeight))) < drag.offsetHeight+drop.offsetHeight)
			if (a&&b) {
				drag.style.left = (drop.offsetLeft-14)+'px'
				drag.style.top = (drop.offsetTop+drop.offsetHeight/2 - (drag.offsetHeight/2)) -5 +'px'
				try {
					drag.drop(drag, drop)
				} catch (e) {
					console.error(e)
				}
				break
			}
		}
		dragElement.object.classList.remove('zTop')
		dragElement.object = null
	}
})
document.addEventListener('mousemove', (e)=>{
	if (dragElement.object) {
		dragElement.object.style.left=(e.pageX-dragElement.x-311)+'px'
		dragElement.object.style.top=(e.pageY-dragElement.y-180)+'px'
	}
})

function createDropElement(id, style) { //static element
	let div = document.createElement('div')
	div.setAttribute('class','drop')
	div.setAttribute('id','drop_'+id)
	if (style) div.classList.add(style)
	return div
}
function createDragElement(id, style, dropFunc) {
	let div = document.createElement('div')
	div.setAttribute('class','drag')
	div.setAttribute('id','drag_'+id)
	if (style) div.classList.add(style)
	div.ondragstart = ()=> {return false}
	div.drop=dropFunc || (()=>{})
	return div
}


// content.append(createDropElement('1'))
// content.append(createDropElement('2'))
// let drag1 = createDragElement('1','test',(a,b)=>{console.log(a,b)})
// drag1.drop=()=>{console.log('asdasd')}
// drag1.innerHTML='asdasd'
// content.append(drag1)
// content.append(createDragElement('2'))