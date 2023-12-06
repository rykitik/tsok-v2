function createTextOptionElement(id, style, size, maxlength,placeholder) {
    let div = document.createElement('div');
    div.className = 'text-option-container';

    let input = document.createElement("input");
    
    input.type = "text";
    input.className = "text-option-input";
    input.setAttribute("size", size ? maxlength:  12);
    input.setAttribute("maxLength", maxlength ? maxlength:  12);
    input.setAttribute("placeholder", placeholder? placeholder: "");
    input.id = "text_answer_" + id;

    div.appendChild(input);
    let inputBtn = document.createElement("input");
    inputBtn.type ="button";
    inputBtn.value="✓";
    inputBtn.className="text-option-button";
    inputBtn.id = "text_answer_btn_" + id;
    div.appendChild(inputBtn);
    
    if (style) div.classList.add(style);
    return div;
}
