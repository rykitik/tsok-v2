// CONSTANTS
const ALLOTED_TIME = 1200;    // Время на выполнение всех заданий
const ATTEMPT_MAX_COUNT = 10;     // Количество попыток

// ELEMENTS
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
const tab_exercise_container = document.querySelector(".tab_exercise_container");
 
// VARIABLES
let currentQuestion = null;
let userScore = 0;
let storage = JSON.parse(localStorage.getItem('user')) || {}
let queCount = localStorage.getItem('queCount') ? Number(localStorage.getItem('queCount')) : 0;
let queNumb = localStorage.getItem('queNumb') ? Number(localStorage.getItem('queNumb')) : 1;
let counter = null;
let time = localStorage.getItem('timerTime') ? Number(localStorage.getItem('timerTime')) : ALLOTED_TIME;
let attemptNumber = localStorage.getItem('attemptNumber') ? Number(localStorage.getItem('attemptNumber')) : 1;

// VARIABLES FLAGS
isTimeStarted = localStorage.getItem('isTimeStarted') || false;

// START APP
startApp();

if (isTimeStarted) {
  isTimeStarted = false;
  startTimer(time);
}

function startApp() {
  tabsShow();
  showQuestions(queCount);
  queCounter(queNumb);
}

function updateTabs(index) {
  for (let i = 0; i < questions.length; i++) {
    tab_exercise_container.children[i].removeAttribute("class", "active_tab");
    tab_exercise_container.children[i].setAttribute("class", "tab");
  }
  tab_exercise_container.children[index].removeAttribute("class", "tab");
  tab_exercise_container.children[index].setAttribute("class", "active_tab");
}

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
  if (isTimeStarted) return;
  if (counter) {
    clearInterval(counter);
    counter = null;
  }
  counter = setInterval(timer, 1000);
  isTimeStarted = true;
  localStorage.setItem('isTimeStarted', isTimeStarted);

  function timer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds > 9)
      timeCount.innerHTML = minutes + ":" + seconds, 200, 190;
    else
      timeCount.innerHTML = minutes + ":0" + seconds, 200, 190;
    /* timeCount.innerHTML = time; */
    time--;
    localStorage.setItem('timerTime', time);

    if (time < 0) {
      openResultWindow()
    }
  }
}

function stopTimer() {
  // if (!isTimeStarted) return;
  time = ALLOTED_TIME;
  timeCount.innerHTML = "";
  if (counter) {
    clearInterval(counter);
    counter = null;
  };
  localStorage.removeItem('isTimeStarted');
  localStorage.removeItem('timerTime');
  localStorage.removeItem('queCount');
  localStorage.removeItem('queNumb');
  isTimeStarted = false;
}
function setBallsCountText(balls) {
  ballsCount.innerHTML = balls + " баллов";
}
function userScoreAdd(score) {
  setBallsCountText(userScore + score);
  userScore = userScore + score;
}

setBallsCountText(userScore);

//if next btn clicked
buttonNext.onclick = ()=>{
  if(queCount < questions.length - 1){
    queCount ++;
    queNumb ++;
    showQuestions(queCount);
    queCounter(queNumb);
  } else openResultWindow();
}
function openResultWindow() {
  stopTimer();
  localStorage.removeItem("storage");
  container1.classList.add("hide");
  container2.classList.remove("hide");
  resPoints.innerHTML=userScore
  if (userScore>=1300) {
    resText.innerHTML=`Поздравляем! Вы успешно завершили данный этап!`
    attemptNumber = 1;
    localStorage.removeItem("attemptNumber");
  } else {
    if (ATTEMPT_MAX_COUNT < attemptNumber) {
      resText.innerHTML=`У вас больше нет попыток. Результат не учтен <br/>
                          <button onclick="resetTryes()" class="tryagain-btn"> Обнулить попытки и вернуться</button> `;
      return;
    }
    resText.innerHTML=`Рекомендуется повторить материал.<br>Нужно пройти ещё раз<br><br> Осталось ${ATTEMPT_MAX_COUNT - attemptNumber} попыток <br>
                        <button onclick="tryAgain()" class="tryagain-btn"> Попробовать еще раз</button> `
    attemptNumber++;
    localStorage.setItem("attemptNumber", attemptNumber);
  }
  console.log("Question completed");
}
function resetTryes() {
  attemptNumber = 1;
  localStorage.removeItem("attemptNumber");
  stopTimer();
  tryAgain();
}
function tryAgain() {
  queCount = 0;
  queNumb = 1;
  startApp();
  container1.classList.remove("hide");
  container2.classList.add("hide");
}
buttonPrev.onclick = ()=>{
  if (queNumb === 1) return;
  console.log("нажата кнопка");
  queCount --;
  queNumb --;
  showQuestions(queCount);
  queCounter(queNumb);
}
function showQuestions(index){
  if (index < 0 || questions.length === index) return;
  updateTabs(index);
  localStorage.setItem("queCount", index);
  if ((Object.keys(storage).length === 0 && queNumb >= 2)) startTimer(time);
  currentQuestion = questions[index];
  option_list.innerHTML=''
  left_list.innerHTML=''
  choiceContent.innerHTML=''
  const que_text = document.querySelector(".text-zadanie");
  
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
          a.onclick=()=>{selectOpt(a, true)}
        }
        for (let a of option_list.children) {
          a.onclick=()=>{selectOpt(a, false)}
        }
      } else {
        for (let a of currentQuestion.left) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOpt(opt, true)}
          left_list.append(opt)
        }
        for (let a of currentQuestion.options) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOpt(opt, false)}
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
          a.onclick=()=>{selectOpt(a, true)}
        }
        for (let a of option_list.children) {
          a.onclick=()=>{selectOpt(a, false)}
        }
      } else {
        for (let a of currentQuestion.left) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOpt(opt, true)}
          left_list.append(opt)
        }
        for (let a of currentQuestion.options) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span id="choice"><img class=option_img src=../img/3_3/'+a+'.jpg></span>'
          opt.onclick=()=>{selectOpt(opt, false)}
          option_list.append(opt)
        }
      }
    } break
    case 'choice': {
      let offer = currentQuestion.offer;
      for (let o in currentQuestion.options) {
        offer=offer.replace('{'+o+'}', '<div id="select_'+o+'"></div>')
      }
      choiceContent.innerHTML=offer
      for (let o in currentQuestion.options) {
        let arr = currentQuestion.options[o]
        let pss = createSelect('select_' + o, '  ---  ', arr, ()=>{
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
  let isCorrect = false;
  for (key in currentQuestion.correct) {
    if (currentQuestion.correct[key] === p) isCorrect = true;
  }
  if (isCorrect) {
    document.querySelector('#select_' + o).classList.add('correct')
  } else {
    document.querySelector('#select_' + o).classList.add('incorrect')
  }
  document.querySelector('#select_' + o).classList.add('disabled')
  document.querySelector('#select_' + o).style='padding:0; margin:0;'
  if (!(currentQuestion.id in storage)) {
    storage[currentQuestion.id]={}
    // localStorage.removeItem("storage");
  }
  storage[currentQuestion.id]['select_' + o]={style: document.querySelector('#select_' + o).classList.value, value: p}
  // localStorage.setItem("storage", JSON.stringify(storage));
  for (let i in storage[currentQuestion.id]) {
    if (storage[currentQuestion.id][i].style.includes('incorrect')) return null;
  }
  if (Object.keys(currentQuestion.correct).length === Object.keys(storage[currentQuestion.id]).length) userScoreAdd(currentQuestion.cost);
}
let lastOptLeft = lastOptRight = null
let lastOpt = { left: null, right: null };
function selectOpt(opt, isLeft) {
  const selectedClass = isLeft ? 'left' : 'right';

  if (!opt.classList.contains('correct') && !opt.classList.contains('incorrect')) {
    if (lastOpt[selectedClass]) lastOpt[selectedClass].classList.remove('selected');
    lastOpt[selectedClass] = opt;
    opt.classList.add('selected');
    checkAnswer();
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
      userScoreAdd(currentQuestion.cost);
    }
    console.log(userScore)
  }
  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
  // localStorage.setItem("storage", JSON.stringify(storage));
}
let myanswers = []
function optionSelected(answer){ // DO: FIX IT
  if (!answer.classList.contains('incorrect') && !answer.classList.contains('correct') && !answer.classList.contains('disabled')) {
  let userAns = answer.textContent;
  let correctAns = questions[queCount].correct;
  console.log(correctAns)
  let allOptions = option_list.children.length;
  if (typeof correctAns == 'object') {
  if (correctAns.includes(userAns)) {
    console.log(userScore);
    answer.classList.add("correct");
    // userScoreAdd(questions[queCount].cost); // DO: FIX IT
    console.log("Answer is correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
  }
  myanswers.push(userAns)
  if (myanswers.length>=correctAns.length) {
    //selected the correct answer
    // for (let i = 0; i < allOptions; i++) {
    //   if(correctAns.includes(option_list.children[i].textContent)){
    //     option_list.children[i].setAttribute("class", "correct");
    //   }
    // }
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
    if (bool) userScoreAdd(currentQuestion.cost);
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
    // for (let i = 0; i < allOptions; i++) {
    //   if(option_list.children[i].textContent == correctAns){
    //     option_list.children[i].setAttribute("class", "correct");
    //   }
    // }
  }
//once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  buttonNext.classList.remove("hide");
  }
  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
  // localStorage.setItem("storage", JSON.stringify(storage));
  }

}
// function optionSelected(answer){
//   stopTimer();
//   let userAns = answer.textContent;
//   let correctAns = questions[queCount].correct;
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
  if (index < 1) return;
  localStorage.setItem("queNumb", index);
  const ques_counter  = document.querySelector(".counter_exercise");
  let totalQuesTag = ''+ index +'/'+ questions.length +'';
  ques_counter.innerHTML = totalQuesTag;
}

