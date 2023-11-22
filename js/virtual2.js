const option_list = document.querySelector(".option-list");
const timeCount = document.querySelector(".time-counter");
const buttonNext = document.getElementById("next-button");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const time_after = document.querySelector(".time_after");
const img = document.querySelector(".img-exercise1");

const buttonPrev = document.querySelector(".prevbutton");


const tab_exercise_container = document.querySelector(".tab_exercise_container");
tabsShow();
showQuestions(0);
queCounter(1);
startTimer(160);
google.charts.load('current', { 'packages': ['corechart'] });


let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 100;
/* var userScore = 0; */
var userScore = 0;

const result_box = document.querySelector(".correct_answers");

function tabsShow() {
  let tab_tag = "";
  for (let i = 0; i < questions.length; i++) {
    tab_tag += '<div class="tab"></div>';
  }
  tab_exercise_container.innerHTML = tab_tag;
}

const tab = document.querySelector(".tab");
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
//if next btn clicked
buttonNext.onclick = () => {
  document.querySelector('.text-zadanie').innerHTML=''
  document.querySelector('.option-list').innerHTML=''
  document.querySelector('.dragContainer').innerHTML=''
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    // buttonNext.classList.add("hide");
  } else {

    container1.classList.add("hide");
    container2.classList.remove("hide");
    clearInterval(counter);
    time_after.innerHTML = timeCount.textContent;
    ShowResult();
    google.charts.setOnLoadCallback(drawChart);

    console.log("Question completed");
  }

}

buttonPrev.onclick = () => {
  document.querySelector('.text-zadanie').innerHTML=''
  document.querySelector('.option-list').innerHTML=''
  document.querySelector('.dragContainer').innerHTML=''
  console.log("нажата кнопка");
  que_count--;
  que_numb--;
  showQuestions(que_count);
  queCounter(que_numb);
}

function showQuestions(index) {
  const que_text = document.querySelector(".text-zadanie");

  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  let que_tag = '<span>' + questions[index].question + '</span>';
  let option_tag = '';
  for (let i = 0; i < questions[index].options.length; i++) {
    if (questions[index].nextButton) {
      option_tag += '<div class="option"><span>' + questions[index].options[i] + '</span></div>';
    }
    img_tag = questions[index].img;
  }
  if (questions[index].dnd) {
    que_text.innerHTML = que_tag;
    let id=0
    if (questions[index].line) {
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
    } else {
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
    }
  } else {
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    for (let el of document.querySelectorAll('.option')) {
      el.onclick=()=>{
        optionSelected(el)
      }
    }
  }

  // const option = document.querySelectorAll(".option");
  // for (let i = 0; i < option.length; i++){
  //   option[i].setAttribute("onclick", "optionSelected(this)");
  // }
  // if (questions[index].init) questions[index].init()
    try {
      start()
    } catch(e) {
      // console.log(e)
    }
}



function optionSelected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].correct;
  let allOptions = option_list.children.length;

  if (userAns == correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    console.log("Answer is correct");

  } else {

    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    //selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].classList.add("correct");
      }
    }

  }
  //once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");

  }
  buttonNext.classList.remove("hide");
}

function startTimer(time) {
  let counter = setInterval(timer, 1000);

  function timer() {
    try {
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
    } catch (e) {

    }
  }
}

function ShowResult() {

  result_box.innerHTML = userScore;

}


function queCounter(index) {
  const ques_counter = document.querySelector(".counter_exercise");
  let totalQuesTag = '' + index + '/' + questions.length + '';
  ques_counter.innerHTML = totalQuesTag;
}


function drawChart() {
  let wrong_ans = questions.length - userScore;
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Ответы'],
    ['Верные', userScore],
    ['Неверные', wrong_ans],

  ]);

  var options = {
    title: 'График ответов',
    colors: ['#43698F', '#A2BEDD'],
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}