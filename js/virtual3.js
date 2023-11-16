const option_list = document.querySelector(".option-list");
const left_list = document.querySelector("#left-list")
const timeCount = document.querySelector(".time-counter");
const ballsCount = document.querySelector(".balls")
const buttonNext = document.getElementById("next-button");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const buttonPrev = document.querySelector(".prevbutton");
const time_after = document.querySelector(".time_after");
// const img = document.querySelector(".img-exercise1");
const text_zadanie = document.querySelector(".text-zadanie");
let currentQuestion = null;
let userScore = 0;
let storage = {}
const tab_exercise_container = document.querySelector(".tab_exercise_container");
tabsShow();
showQuestions(0);
queCounter(1);

let que_count = 0;
let que_numb = 1;
let counter;

function tabsShow(){
  let tab_tag = "";
  console.log(questions.length);
  for(let i = 0; i < questions.length; i++){
    tab_tag += '<div class="tab"></div>';
  }
  tab_exercise_container.innerHTML = tab_tag;
}

const tab = document.querySelector(".tab");
function startTimer(time) {
  let counter = setInterval(timer, 1000);

  function timer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds > 9)
      timeCount.innerHTML = minutes + ":" + seconds, 200, 190;
    else
      timeCount.innerHTML = minutes + ":0" + seconds, 200, 190;
    /* timeCount.innerHTML = time; */
    time--;
    if (time < 0) {
      container1.classList.add("hide");
      container2.classList.remove("hide");

      clearInterval(counter);
    }
  }
}
function setBallsCountText(balls) {
  debugger
  ballsCount.innerHTML = balls + " баллов";
}
function userScoreAdd(score) {
  setBallsCountText(userScore + score);
  userScore = userScore + score;
}
startTimer(1200)
setBallsCountText(userScore);

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
      resPoints.innerHTML=userScore
      if (userScore>=1300) {
        resText.innerHTML=`Поздравляем! Вы успешно завершили данный этап!`
      } else {
        resText.innerHTML=`Рекомендуется повторить материал.<br>Нужно пройти ещё раз`
      }
    console.log("Question completed");
  }
  
}
buttonPrev.onclick = ()=>{
  console.log("нажата кнопка");
  que_count --;
  que_numb --;
  showQuestions(que_count);
  queCounter(que_numb);
}
function showQuestions(index){
  currentQuestion = questions[index]
  option_list.innerHTML=''
  left_list.innerHTML=''
  choiceContent.innerHTML=''
  const que_text = document.querySelector(".text-zadanie");
  
  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  let que_tag = '<span>'+ currentQuestion.question+'</span>';
  
  que_text.innerHTML = que_tag;
  switch (currentQuestion.type) {
    case 'many':
    case 'one_of': { //один из
      if (currentQuestion.id in storage) {
        left_list.innerHTML = storage[currentQuestion.id].left
        option_list.innerHTML = storage[currentQuestion.id].options
        for (let a of option_list.querySelectorAll('.option')) {
          a.onclick=()=>{optionSelected(a)}
        }
      } else {
        for (let a of currentQuestion.options) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{optionSelected(opt)}
          option_list.append(opt)
        }
      }
    } break
    case 'matching': { //соответсвие
      if (currentQuestion.id in storage) {
        left_list.innerHTML = storage[currentQuestion.id].left
        option_list.innerHTML = storage[currentQuestion.id].options
        for (let a of left_list.children) {
          a.onclick=()=>{selectOptL(a)}
        }
        for (let a of option_list.children) {
          a.onclick=()=>{selectOptR(a)}
        }
      } else {
        for (let a of currentQuestion.left) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOptL(opt)}
          left_list.append(opt)
        }
        for (let a of currentQuestion.options) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOptR(opt)}
          option_list.append(opt)
        }
      }
      
    } break
    case 'matchingImg': { //соответсвие с картинками
      if (currentQuestion.id in storage) {
        left_list.innerHTML = storage[currentQuestion.id].left
        option_list.innerHTML = storage[currentQuestion.id].options
        console.log(left_list.children)
        for (let a of left_list.children) {
          console.log(a)
          a.onclick=()=>{selectOptL(a)}
        }
        for (let a of option_list.children) {
          a.onclick=()=>{selectOptR(a)}
        }
      } else {
        for (let a of currentQuestion.left) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOptL(opt)}
          left_list.append(opt)
        }
        for (let a of currentQuestion.options) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span id="choice"><img class=option_img src=../img/3_3/'+a+'.jpg></span>'
          opt.onclick=()=>{selectOptR(opt)}
          option_list.append(opt)
        }
      }
    } break
    case 'choice': {
      let offer = currentQuestion.offer
      for (let o in currentQuestion.options) {
        offer=offer.replace('{'+o+'}', '<div id="select_'+o+'"></div>')
      }
      choiceContent.innerHTML=offer
      for (let o in currentQuestion.options) {
        let arr = currentQuestion.options[o]
        let pss = createSelect('select_'+o, '  ---  ', arr, ()=>{
          if (!document.querySelector('#select_'+o).classList.contains('disabled')) {
            checkChoice(pss.children[0].innerHTML, o)
          }
        })
        document.getElementById('select_'+o).replaceWith(pss)
      }
      if (currentQuestion.id in storage) {
        for (let o in storage[currentQuestion.id]) {
          document.getElementById(o).classList.value=storage[currentQuestion.id][o].style
          document.getElementById(o).innerHTML=storage[currentQuestion.id][o].value
          document.getElementById(o).style='padding:0;margin:0'
        }
      }
    } break
  }
  // option_list.innerHTML = opisanie_tag;
  // img.src= img_tag;
}
function checkChoice(p, o) {
  if (p==currentQuestion.correct[o]) {
    document.querySelector('#select_'+o).classList.add('correct')
  } else {
    document.querySelector('#select_'+o).classList.add('incorrect')
  }
  document.querySelector('#select_'+o).classList.add('disabled')
  document.querySelector('#select_'+o).style='padding:0; margin:0'

  if (!(currentQuestion.id in storage)) storage[currentQuestion.id]={}
  storage[currentQuestion.id]['select_'+o]={style: document.querySelector('#select_'+o).classList.value, value: p}
  if (Object.keys(storage[currentQuestion.id]).length==Object.keys([currentQuestion.correct]).length) {
    for (let i in storage[currentQuestion.id]) {
      if (storage[currentQuestion.id][i].style.includes('incorrect')) return
    }
    userScoreAdd(currentQuestion.cost);
  }
}
let lastOptLeft = lastOptRight = null
function selectOptL(opt) {
  if (!opt.classList.contains('correct') && !opt.classList.contains('incorrect')) {
    if (lastOptLeft) lastOptLeft.classList.remove('selected')
    lastOptLeft=opt
    opt.classList.add('selected')
    checkAnswer()
  }
}
function selectOptR(opt) {
  if (!opt.classList.contains('correct') && !opt.classList.contains('incorrect')) {
    if (lastOptRight) lastOptRight.classList.remove('selected')
    lastOptRight=opt
    opt.classList.add('selected')
    checkAnswer()
  }
}
function checkAnswer() {
  let opts = document.querySelectorAll('.selected')
  if (opts.length==2) {
    left_list.append(opts[0])
    option_list.append(opts[1])
    let ci=0
    for (let q of currentQuestion.left) {
      if (opts[0].innerHTML.includes(q)) {
        console.log(ci)
        if (opts[1].innerHTML.includes(currentQuestion.options[ci])) {
          opts[0].classList.remove('selected')
          opts[1].classList.remove('selected')
          opts[0].classList.add('correct')
          opts[1].classList.add('correct')
        } else {
          opts[0].classList.remove('selected')
          opts[1].classList.remove('selected')
          opts[0].classList.add('incorrect')
          opts[1].classList.add('incorrect')
        }
      }
      ci++
    }
    let bool = true
    let els = document.querySelectorAll('.option')
    for (let el of els) {
      if (el.classList.contains('incorrect') || !el.classList.contains('correct')) {
        bool=false
        break
      }
    }
    if (bool) {
      for (let el of els) {
        el.classList.add('disabled')
      }
      userScore+=currentQuestion.cost
    }
    console.log(userScore)
  }
  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
}
let myanswers = []
function optionSelected(answer){
  if (!answer.classList.contains('incorrect') && !answer.classList.contains('correct') && !answer.classList.contains('disabled')) {
      clearInterval(counter);
let userAns = answer.textContent;
let correctAns = questions[que_count].correct;
console.log(correctAns)
let allOptions = option_list.children.length;
if (typeof correctAns == 'object') {
  if (correctAns.includes(userAns)) {
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
  }
  myanswers.push(userAns)
  if (myanswers.length>=correctAns.length) {
    //selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if(correctAns.includes(option_list.children[i].textContent)){
        option_list.children[i].setAttribute("class", "correct");
      }
    }
    //once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled");
    }
    let bool = true
    for (let a of option_list.querySelectorAll('.option')) {
      if (a.classList.contains('incorrect')) {
        bool = false
        break
      }
    }
    if (bool) userScore+=currentQuestion.cost
    buttonNext.classList.remove("hide");
    myanswers=[]
  }
} else {
  if(userAns == correctAns){
    userScoreAdd(currentQuestion.cost);
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {

    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    //selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "correct");
      }
    }
  }
//once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  buttonNext.classList.remove("hide");
  }
  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
  }

}
// function optionSelected(answer){
//   clearInterval(counter);
//   let userAns = answer.textContent;
//   let correctAns = questions[que_count].correct;
//   let allOptions = option_list.children.length;
  
//   if(userAns == correctAns){
//     userScoreAdd(currentQuestion.cost);
//     console.log(userScore);
//     answer.classList.add("correct");
//     console.log("Answer is correct");
   
//   }else{
    
//     answer.classList.add("incorrect");
//     console.log("Answer is wrong");
//     //selected the correct answer
//     for (let i = 0; i < allOptions; i++) {
//       if(option_list.children[i].textContent == correctAns){
//         option_list.children[i].setAttribute("class", "correct");
//       }
//     }
   
//   }
//   //once user selected disabled all options
// for (let i = 0; i < allOptions; i++) {
//   option_list.children[i].classList.add("disabled");

// }
//  buttonNext.classList.remove("hide");
//  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
// }

  
function ShowResult(){
 
  result_box.innerHTML = userScore; 
  
}


function queCounter(index){
  const ques_counter  = document.querySelector(".counter_exercise");
  let totalQuesTag = ''+ index +'/'+ questions.length +'';
  ques_counter.innerHTML = totalQuesTag;
}

