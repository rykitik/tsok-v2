function droppable({ items }) { 
  let appendList = [];
  let dataValue = 1;

  items.forEach(item => {
    appendList.push(`
    <div class="w-75">
        <span class="fw-normal fs-5"></span>
          <div class="row">
            <div class="fw-normal w-25 fs-6 col">
              ${item}
            </div>
            <div data-value=${dataValue} class="col droppable">
              <div id="circle-dnd" style="width: 30px; height: 30px" class="rounded-circle d-flex align-items-center"></div>
            </div>
          </div>
      </div>
    `)

    dataValue++;
  });
  return( 
    '<div class="d-grid">'+ appendList.join('<br>') + '</div>'
  )
}