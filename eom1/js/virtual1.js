const option_list = document.querySelector(".text-exercise");
const timeCount = document.querySelector(".time-counter");
const buttonNext = document.getElementById("next-button");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const buttonPrev = document.querySelector(".prevbutton");
const time_after = document.querySelector(".time_after");
const img = document.querySelector(".img-exercise1");
const text_zadanie = document.querySelector(".text-zadanie");


const tab_exercise_container = document.querySelector(".tab_exercise_container");
tabsShow();
showQuestions(0);
queCounter(1);

let que_count = 0;
let que_numb = 1;
let counter;

function tabsShow(){
  let tab_tag = "";
  for(let i = 0; i < questions.length; i++){
    tab_tag += '<div class="tab"></div>';
  }
  tab_exercise_container.innerHTML = tab_tag;
}

const tab = document.querySelector(".tab");

//if next btn clicked
buttonNext.onclick = ()=>{
  if(que_count < questions.length - 1){
    que_count ++;
    que_numb ++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
  }else{
    container1.classList.add("hide");
    container2.classList.remove("hide");
    console.log("Question completed");
  }
}
buttonPrev.onclick = ()=>{
  que_count --;
  que_numb --;
  showQuestions(que_count);
  queCounter(que_numb);
}
function showQuestions(index){
  const que_text = document.querySelector(".text-zadanie");
  
  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  let que_tag = '<span>'+ questions[index].question+'</span>';
  let img_tag = '';
  img_tag = questions[index].img;
  let opisanie_tag = '';
  opisanie_tag = '<span>'+ questions[index].text+'</span>';
	
  que_text.innerHTML = que_tag;
  option_list.innerHTML = opisanie_tag;
}



  
function ShowResult(){
 
  result_box.innerHTML = userScore; 
  
}


function queCounter(index){
  const ques_counter  = document.querySelector(".counter_exercise");
  let totalQuesTag = ''+ index +'/'+ questions.length +'';
  ques_counter.innerHTML = totalQuesTag;
}

