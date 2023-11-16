
function dragAndDrop({items, top, gap}) {  
    const gapArray = gap ? gap : 70;
    let dataValue = 1;
    let appendList = [];

    items.forEach(item => {
      appendList.push(`<div data-value=${dataValue} style="left: 810px; top: ${top}px" class="element-dnd d-flex position-absolute rounded-5 ps-3 align-items-center">
        <div id="circle-dnd" class="rounded-circle w-8 h-65"></div>
        <span class="ps-3 fw-light">${item}</span>
      </div>`)
      
      dataValue++;
      top += gapArray;
    });

    return(
      '<div class="element-wrp d-flex">' + appendList.join('') + '</div>'
    )
};