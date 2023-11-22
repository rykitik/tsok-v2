// CONSTANTS
const ALLOTED_TIME = 1200;    // Время на выполнение всех заданий
const ATTEMPT_MAX_COUNT = 10;     // Количество попыток
const shuffle = (array) => {
  let m = array.length, t, i;

  // Пока есть элементы для перемешивания
  while (m) {

    // Взять оставшийся элемент
    i = Math.floor(Math.random() * m--);

    // И поменять его местами с текущим элементом
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
// ELEMENTS
const option_list = document.querySelector(".option-list");
const left_list = document.querySelector("#left-list")
const timeCount = document.querySelector(".time-counter");
const timeAfter = document.querySelector(".time_after");
const ballsCount = document.querySelector(".balls")
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const text_zadanie = document.querySelector(".text-zadanie");
const exercise_zone = document.querySelector(".exercise-zone");
const game = document.querySelector(".game-bg"); 
// VARIABLES
let currentQuestion = null;
let userScore = localStorage.getItem('userScore') ? Number(localStorage.getItem('userScore')) : 0;;
let storage = JSON.parse(localStorage.getItem('storage')) || {};
let questStats = JSON.parse(localStorage.getItem('questStats')) || {};;
let queCount = localStorage.getItem('queCount') ? Number(localStorage.getItem('queCount')) : 0;
// let queNumb = localStorage.getItem('queNumb') ? Number(localStorage.getItem('queNumb')) : 1;
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
setBallsCountText(userScore);
google.charts.load('current', {'packages':['corechart']});

function startApp() {
  showGameCards();
  // queCounter(queNumb);
}

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
    time--;
    localStorage.setItem('timerTime', time);

    if (time < 0) {
      openResultWindow()
    }
  }
}

function stopTimer() {
  time = ALLOTED_TIME;
  timeCount.innerHTML = "";
  if (counter) {
    clearInterval(counter);
    counter = null;
  };
  localStorage.removeItem('isTimeStarted');
  localStorage.removeItem('timerTime');
  localStorage.removeItem('queCount');
  // localStorage.removeItem('queNumb');
  isTimeStarted = false;
}
function setBallsCountText(balls) {
  ballsCount.innerHTML = balls + " баллов";
}
function userScoreAdd(currentQuestion) {
  let resultScore = userScore + currentQuestion.cost;
  setBallsCountText(resultScore);
  userScore = resultScore;
  localStorage.setItem("userScore", userScore);
}

function addQuestionAnswerStatus(id,status) {
  questStats[id] = status;
  localStorage.setItem("questStats", JSON.stringify(questStats));
}

//if next btn clicked
// buttonNext.onclick = ()=>{
//   if(queCount < questions.length - 1){
//     queCount ++;
//     queNumb ++;
//     showQuestions(queCount);
//     queCounter(queNumb); 
//   } else openResultWindow();
// }
function openResultWindow() {
  google.charts.setOnLoadCallback(drawChart(questStats));
  timeAfter.innerHTML = timeCount.textContent;
  stopTimer();
  storage={}
  localStorage.removeItem("questStats");
  questStats = {};
  localStorage.setItem("storage", JSON.stringify(storage));
  container1.classList.add("hide");
  container2.classList.remove("hide");
  resPoints.innerHTML=userScore
  if (userScore>=1300 && ATTEMPT_MAX_COUNT >= attemptNumber) {
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
    if (attemptNumber) localStorage.setItem("attemptNumber", attemptNumber);
  }
  userScore = 0;
  localStorage.removeItem("userScore")
  setBallsCountText(userScore);
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
  // queNumb = 1;
  startApp();
  container1.classList.remove("hide");
  container2.classList.add("hide");
}
// buttonPrev.onclick = ()=>{
//   if (queNumb === 1) return;
//   queCount --;
//   queNumb --;
//   showQuestions(queCount);
//   queCounter(queNumb);
// }

function showGameCards() {
  const gameCards = document.querySelector(".game-cards");
  const game = document.querySelector(".game-bg");
  game.classList.remove("hide");
  exercise_zone.classList.add("hide");
  gameCards.innerHTML = '';
  
  let que_tag = '';
  for (let i = 0; i < questions.length; i++) {
    que_tag += `<div class="game-card ${ questions[i].id in questStats ? questStats[i] ? 'game-card--correct' : 'game-card--incorrect': ''}" onclick="openQuestion(${i})"><p>${questions[i].cost}</p></div>`
  }
  gameCards.innerHTML += que_tag;
}

function hideGameCards() {
  const game = document.querySelector(".game-bg");
  exercise_zone.classList.remove("hide");
  game.classList.add("hide");
}

function openQuestion(index) {
  hideGameCards();
  showQuestions(index);
}
function showQuestions(index){
  if (index < 0 || questions.length === index) return;
  localStorage.setItem("queCount", index);
  queCount = index;
  if ((Object.keys(storage).length === 0 )) startTimer(time); // && queNumb >= 2
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
        option_list.innerHTML = storage[currentQuestion.id].options
        option_list.querySelectorAll('.option').forEach(a => {
          a.onclick=()=>{optionSelected(a)}
        });
      } else {
        let options = shuffle(currentQuestion.options)
        options.forEach(a => {
          let opt = document.createElement('div')
          opt.classList.add('option');
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{optionSelected(opt)}
          option_list.append(opt)
        });
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
        let leftQuestions = shuffle(currentQuestion.left)
        for (let a of leftQuestions) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOpt(opt, true)}
          left_list.append(opt)
        }
        let options = shuffle(currentQuestion.options)
        for (let a of options) {
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
        for (let a of left_list.children) {
          a.onclick=()=>{selectOpt(a, true)}
        }
        for (let a of option_list.children) {
          a.onclick=()=>{selectOpt(a, false)}
        }
      } else {
        let leftQuestions = shuffle(currentQuestion.left)
        for (let a of leftQuestions) {
          let opt = document.createElement('div')
          opt.setAttribute('class','option')
          opt.innerHTML='<span>'+a+'</span>'
          opt.onclick=()=>{selectOpt(opt, true)}
          left_list.append(opt)
        }
        let options = shuffle(currentQuestion.options)
        for (let a of options) {
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
      choiceContent.innerHTML = offer;
      for (let o in currentQuestion.options) {
        let arr = currentQuestion.options[o];
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
    case 'dragdrop': { // TODO: Fix drag and drop
      let id=0
      for (let d of questions[index].droppable) {
        let div = document.createElement('div')
        let drop = createDropElement(id)
        div.classList.add('dropRow')
        div.innerHTML='<div class="dropText">'+d+'</div>'
        div.append(drop)
        option_list.append(div)
        ++id
      }
      id=0
      dragsElement = document.querySelector('.dragContainer')
      
      let dragArr = []
      for (let d of questions[index].items) {
        let drag = createDragElement(id,null,(drag, drop)=>{
          let dragId = drag.id.split('_')[1]
          let dropId = drop.id.split('_')[1]
          console.log(dragId, dropId)
          if (questions[index].answers.includes(dragId+'-'+dropId)) { //если выбор правильный
            drag.children[0].classList.add('bgCorrect')
            drag.children[0].classList.remove('bgInCorrect')
          } else {
            drag.children[0].classList.add('bgInCorrect')
            drag.children[0].classList.remove('bgCorrect')
          }
        })
        drag.style.top=220+(id*50)+'px'
        drag.style.left=800+'px'
        drag.innerHTML='<div id="circle"></div><span class="ps-3 fw-light">'+d+'</span>'
        dragArr.push(drag)
        ++id
      }
      shuffle(dragArr)
      id=0
      for (let d of dragArr) {
        d.style.top=220+(id*50)+'px'
        dragsElement.append(d)
        id++
      }
      dragsElement.style.width=dragsElement.offsetWidth+'px'
      dragsElement.style.height=dragsElement.offsetHeight+'px'
    } break
    case 'dragline': {
      let div = document.createElement('div')
      div.style.width=1100+'px'
      for (let d of questions[index].droppable) {
        let drop = createDropElement(id)
        div.append(d)
        div.append(drop)
        ++id
      }
      id=0
      let div1 = document.createElement('div')
      let dragArr = []
      let linkArr = {}
      for (let d of questions[index].items) {
        let drag = createDragElement(id,null,(drag, drop)=>{
          let dragId = drag.id.split('_')[1]
          let dropId = drop.id.split('_')[1]
          console.log(dragId, dropId)
          if (questions[index].answers.includes(dragId+'-'+dropId)) { //если выбор правильный
            drag.classList.add('bgCorrect')
            drag.classList.remove('bgInCorrect')
          } else {
            drag.classList.add('bgInCorrect')
            drag.classList.remove('bgCorrect')
          }
          drag.style.width='auto'
          drop.style.width=drag.offsetWidth-15+'px'
          for (let i in linkArr) {
            if (linkArr[i]==dragId) delete linkArr[i]
          }
          linkArr[dropId]=dragId
          for (let i in linkArr) {
            if (linkArr[i] != dragElement.object.id.split('_')[1]) {
              let drag1 = document.querySelector('#drag_'+linkArr[i])
              let drop1 = document.querySelector('#drop_'+i)
              drag1.style.left = (drop1.offsetLeft-14)+'px'
              drag1.style.top = (drop1.offsetTop+drop1.offsetHeight/2 - (drag1.offsetHeight/2)) -5 +'px'
            }
          }
        })
        drag.style.top=400+(id*50)+'px'
        drag.style.left=100+'px'
        drag.style.padding=0
        drag.innerHTML='<span class="ps-3 fw-light" style="padding-right: 15px">'+questions[index].items[id]+'</span>'
        dragArr.push(drag)
        ++id
      }
      shuffle(dragArr)
      id=0
      for (let d of dragArr) {
        d.style.top=400+(id*50)+'px'
        div1.append(d)
        ++id
      }
      option_list.append(div)
      option_list.append(div1)
    } break;

    default: {
      console.warn('Такого типа задания не существует');
    }
  }
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
    localStorage.setItem("storage", JSON.stringify(storage));
  }
  storage[currentQuestion.id]['select_' + o]={style: document.querySelector('#select_' + o).classList.value, value: p}
  localStorage.setItem("storage", JSON.stringify(storage));
  for (let i in storage[currentQuestion.id]) {
    if (storage[currentQuestion.id][i].style.includes('incorrect')) return null;
  }
  if (Object.keys(currentQuestion.correct).length === Object.keys(storage[currentQuestion.id]).length) {
    userScoreAdd(currentQuestion);
    addQuestionAnswerStatus(currentQuestion.id, true);
  } else {
    addQuestionAnswerStatus(currentQuestion.id, false);
  }
}
let lastOpt  = { left: null, right: null };

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
    opts[0].classList.add('hidden');
    opts[1].classList.add('hidden');
    function addOpts() {
      left_list.append(opts[0])
      option_list.append(opts[1]);
      opts[0].classList.remove('hidden');
      opts[1].classList.remove('hidden');
      storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
      localStorage.setItem("storage", JSON.stringify(storage));
    }
    setTimeout(addOpts, 400);

    let answer = {};
    let optionImg = opts[1]?.children[0]?.children[0]?.src;
    let secondOption = optionImg ? getFileName(optionImg) : opts[1].innerText
    answer[opts[0].innerText] = secondOption;
    let isCorrect = currentQuestion.correct.some(obj => {
      return JSON.stringify(obj) === JSON.stringify(answer);
    });
    let className = isCorrect ? 'correct' : 'incorrect';
    opts[0].classList.remove('selected');
    opts[1].classList.remove('selected');
    opts[0].classList.add(className);
    opts[1].classList.add(className);
    let isQuestionCorrect = true
    let els = document.querySelectorAll('.option')
    for (let el of els) {
      if (el.classList.contains('incorrect') || !el.classList.contains('correct')) {
        isQuestionCorrect=false
        break
      }
    }
    if (isQuestionCorrect) {
      for (let el of els) {
        el.classList.add('disabled')
      }
      userScoreAdd(currentQuestion);
      addQuestionAnswerStatus(currentQuestion.id, true);
    } else {
      addQuestionAnswerStatus(currentQuestion.id, false);
    }
  }
}
let myanswers = []
function optionSelected(answer){
  if (!answer.classList.contains('incorrect') && !answer.classList.contains('correct') && !answer.classList.contains('disabled')) {
  let userAns = answer.textContent;
  let correctAns = questions[queCount].correct;
  let allOptions = option_list.children.length;
  if (typeof correctAns == 'object') {
  if (correctAns.includes(userAns)) {
    answer.classList.add("correct");
    console.log("Answer is correct");
    
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    addQuestionAnswerStatus(currentQuestion.id, false);
  }

  myanswers.push(userAns)
  if (myanswers.length>=correctAns.length) {
    for (let i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled");
    }
    let isCorrect = true;
    for (let a of option_list.querySelectorAll('.option')) {
      if (a.classList.contains('incorrect')) {
        isCorrect = false
        break
      }
    }
    if (isCorrect) { 
      userScoreAdd(currentQuestion);
      addQuestionAnswerStatus(currentQuestion.id, true);
    } else {
      addQuestionAnswerStatus(currentQuestion.id, false);
    }
    myanswers=[]
  }
} else {
  if (userAns == correctAns){
    userScoreAdd(currentQuestion);
    addQuestionAnswerStatus(currentQuestion.id, true);
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {
    addQuestionAnswerStatus(currentQuestion.id, false);
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
  }
//once user selected disabled all options
  option_list.querySelectorAll('.option').forEach(a => {
    a.classList.add('disabled');
  });
  }
  storage[currentQuestion.id] = {left: left_list.innerHTML, options: option_list.innerHTML}
  localStorage.setItem("storage", JSON.stringify(storage));
  }
}

// function queCounter(index){
//   if (index < 1) return;
//   localStorage.setItem("queNumb", index);
//   const ques_counter  = document.querySelector(".counter_exercise");
//   let totalQuesTag = ''+ index +'/'+ questions.length +'';
//   ques_counter.innerHTML = totalQuesTag;
// }

function drawChart(questStats) { 
  let score = 0;
  for (key in questStats) {
    if (questStats[key]) score++;
  }
  let wrong_ans = questions.length - score;
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Ответы'],
    ['Верные',  score],
    ['Неверные',  wrong_ans],

  ]); 
  var options = {
    title: 'График ответов',
    colors: ['#9ee7d5', 'pink'],
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
} 

function getFileName(src) {
  let srcArray = src.split("/");
  return srcArray[srcArray.length-1].split(".")[0];
}