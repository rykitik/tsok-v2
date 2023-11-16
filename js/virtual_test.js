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
  console.log(questions.length);
  for (let i = 0; i < questions.length; i++) {
    tab_tag += '<div class="tab"></div>';
  }
  tab_exercise_container.innerHTML = tab_tag;
}

const tab = document.querySelector(".tab");

//if next btn clicked
buttonNext.onclick = () => {
  document.querySelector('.text-zadanie').innerHTML=''
  document.querySelector('.option-list').innerHTML=''
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

    img.src = img_tag;
  }
  if (questions[index].dnd) {
    que_text.innerHTML = que_tag;
    $('.text-zadanie').append(droppable({ items: questions[index].droppable }));
    $('.text-zadanie').first().append(dragAndDrop({ items: questions[index].items, top: 176, gap: 100 }));

    $(function () {

      $('.element-dnd').draggable({
        revert: true
      });

      $('.droppable').droppable({
        accept: '.element-dnd',
        hoverClass: 'hovered',
        drop: function (event, ui) {
          const leftValue = $(event.target).attr('data-value');
          const currentAnswer = leftValue + '-' + ui.draggable.attr("data-value");
          console.log(leftValue, currentAnswer, questions[index].answers[leftValue - 1])
          if (questions[index].answers[leftValue - 1] == currentAnswer) { 
            ui.draggable.find('#circle-dnd').css('background-color', 'green');
          }else { 
            ui.draggable.find('#circle-dnd').css('background-color', 'red');
          }

          ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
          ui.draggable.draggable('option', 'revert', false);
        }
      });

    });

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
  console.log(e)
}
}



function optionSelected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].correct;
  let allOptions = option_list.children.length;

  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct");

  } else {

    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    //selected the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
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

function ShowResult() {

  result_box.innerHTML = userScore;

}


function queCounter(index) {
  const ques_counter = document.querySelector(".counter_exercise");
  let totalQuesTag = '' + index + '/' + questions.length + '';
  ques_counter.innerHTML = totalQuesTag;
}


function drawChart() {

  console.log = ("sdfdsf" + userScore);
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
