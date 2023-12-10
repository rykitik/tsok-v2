const option_list = document.querySelector(".option-list");
const option_list2 = document.querySelector(".option-list2");
const left_list = document.querySelector("#left-list")
const timeCount = document.querySelector(".time-counter");
const buttonNext = document.getElementById("next-button");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");
const time_after = document.querySelector(".time_after");
const img2 = document.querySelector(".img-container");
const buttonPrev = document.querySelector(".prevbutton");
const textContainer = document.querySelector('.text-options-container');
const result_box = document.querySelector(".correct_answers");
const tab_exercise_container = document.querySelector(".tab_exercise_container");
const dragContainer = document.querySelector('.dragContainer')

let currentQuestion = null;
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 100;
let userScore = 0;

tabsShow();
showQuestions(0);
queCounter(1);
startStopwatch();

class ScoreCounter {
  constructor() {
    this.errors = 0;
    this.answers = {}; // Обьект для хранения ID отвеченных заданий
  }

  incrementErrors() {
    this.errors++;
    this.saveToSessionStorage(); // Сохраняем изменения в sessionStorage
  }

  getErrorCount() {
    return this.errors;
  }

  recordAnswer(answerId, isCorrect) {
    if (Object.keys(this.answers).includes(answerId)) return null;
    if (this.answers[answerId] === false) return null;
    this.answers[answerId] = isCorrect;
    this.saveToSessionStorage();
  }

  getPerfectScoreCount() {
    let correctAnswersCount = 0
    for (let key in this.answers ) {
      if (this.answers[key] === true) {
        correctAnswersCount++;
      }
    }
    return correctAnswersCount;
  }

  reset() {
    this.errors = 0;
    this.answers = [];
    this.saveToSessionStorage(); // Сохраняем изменения в sessionStorage
  }

  // Сохранение в sessionStorage
  saveToSessionStorage() {
    const scoreData = {
      errors: this.errors,
      answers: this.answers,
    };
    sessionStorage.setItem('scoreData', JSON.stringify(scoreData));
  }

  // Получение из sessionStorage
  static loadFromSessionStorage() {
    const savedData = sessionStorage.getItem('scoreData');
    if (savedData) {
      const { errors, answers } = JSON.parse(savedData);
      const scoreCounter = new ScoreCounter();
      scoreCounter.errors = errors;
      scoreCounter.answers = answers;
      return scoreCounter;
    }
    return new ScoreCounter();
  }

  showScoreCounter() {
    const correctTasksCount = this.getPerfectScoreCount();
    const errorCount = this.getErrorCount();
    const mistake_count = document.querySelector("#mistake-count");
    const correct_tasks_count = document.querySelector("#correct-tasks-count");
    mistake_count.textContent = errorCount;
    correct_tasks_count.textContent = correctTasksCount;
    this.reset();
  }
}

const loadedScoreCounter = ScoreCounter.loadFromSessionStorage();

function recordIncorrectAnswer(questionID) {
  loadedScoreCounter.incrementErrors();
  loadedScoreCounter.recordAnswer(questionID, false);
}
function recordCorrectAnswer(questionID) {
  loadedScoreCounter.recordAnswer(questionID, true);
}

function tabsShow() {
  let tabHtml = "";
  for (let i = 0; i < questions.length; i++) {
    tabHtml += '<div class="tab"></div>';
  }
  tab_exercise_container.innerHTML = tabHtml;
}

const tab = document.querySelector(".tab");
//if next btn clicked
buttonNext.onclick = () => {
  document.querySelector('.text-zadanie').innerHTML=''
  document.querySelector('.option-list').innerHTML=''
  document.querySelector('.option-list2').innerHTML=''
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    // buttonNext.classList.add("hide");
  } else {
    clearInterval(window.counter);
    container1.classList.add("hide");
    container2.classList.remove("hide");
    time_after.innerHTML = timeCount.textContent;
    loadedScoreCounter.showScoreCounter();
    sessionStorage.clear();
    console.log("Question completed");
  }

}

buttonPrev.onclick = () => {
  if (que_count === 0) return;
  document.querySelector('.text-zadanie').innerHTML=''
  document.querySelector('.option-list').innerHTML=''
  document.querySelector('.option-list2').innerHTML=''
  que_count--;
  que_numb--;
  showQuestions(que_count);
  queCounter(que_numb);
}

function showQuestions(index) {
  const que_text = document.querySelector(".text-zadanie");

  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  currentQuestion = questions[index];
  let que_tag = '<span>' + currentQuestion.question + '</span>';
  let option_tag = '';
  let img_tag = '';
  left_list.innerHTML=''
  try {
    for (let i = 0; i < currentQuestion.options.length; i++) {
      if (currentQuestion.nextButton) {
        option_tag += `<div class="option${currentQuestion.type === "matchingImg" || currentQuestion.type === "matching"? '2': ''}"><span> ${currentQuestion.options[i]} </span></div>`;
      }
    }
    if (currentQuestion?.img) {
      img_tag = '<br><img src="../img/2_2/' + currentQuestion.img + '.jpg" alt=""/>';
      img2.innerHTML = img_tag;
    }
  } catch (e) {
    console.log(e)
  }
  if (currentQuestion.line) {
    que_text.innerHTML = que_tag;
    img2.innerHTML = img_tag;
    textContainer.innerHTML = "";
    // Создаем предложение на основе элементов вопроса
    let sentence = currentQuestion.droppable.reduce((acc, placeholder, index) => {
      const items = currentQuestion.items;
      if (items.length === index) return acc;
      return acc + `${placeholder}<span class="droppable" id="dropArea${index}" data-index="${index}" data-answer="${currentQuestion.answers[index]}"></span>`;
    }, '');
  
    // Выводим вопрос на страницу
    dragContainer.innerHTML = `<p>${sentence}</p>`;
    // Добавляем слова для вставки
    currentQuestion.items.forEach((item, index) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('word');
      wordContainer.draggable = true;
      wordContainer.textContent = item;
      wordContainer.dataset.index = index;
      dragContainer.appendChild(wordContainer);
    });
    const draggableWords = document.querySelectorAll('.word');
    const droppableAreas = document.querySelectorAll('.droppable');
  
    let draggedWord = null;
  
    // Обработчики событий для слов
    draggableWords.forEach(word => {
      word.addEventListener('dragstart', function(event) {
        draggedWord = event.target;
      });
    });
  
    // Обработчики событий для областей вставки слов
    droppableAreas.forEach(area => {
      area.addEventListener('dragover', function(event) {
        event.preventDefault();
      });
  
      area.addEventListener('drop', function(event) {
        event.preventDefault();
        if (!area.textContent.trim()) {
          area.textContent = draggedWord.textContent;
          draggedWord.style.display = 'none';
          draggedWord = null;
          checkAnswers();
        }
      });
    });
  
    // Проверка ответов
    function checkAnswers() {
      const allAreas = document.querySelectorAll('.droppable');
      const filledAreas = Array.from(allAreas).filter(area => area.textContent.trim());
      
      if (filledAreas.length === allAreas.length) {
        const correctAnswers = Array.from(allAreas).every(area => {
          const index = area.dataset.index;
          const answer = area.dataset.answer.split('-')[1];
          return index === answer && area.textContent.trim() === currentQuestion.items[index];
        });
  
        if (correctAnswers) {
          recordCorrectAnswer(index)
          dragContainer.innerHTML += '<b>✔ Правильно!</b>';
          dragContainer.classList.add('correct');
        } else {
          recordIncorrectAnswer(index)
          dragContainer.innerHTML += '<b>✖ Неправильно. Попробуйте еще раз!</b>';
          dragContainer.classList.add('incorrect');
        }
      }
    }
  } else if (currentQuestion.isSelectText) {
      que_text.innerHTML = que_tag;
      img2.innerHTML = img_tag;
      textContainer.innerHTML = "";
      dragContainer.innerHTML = "";
      dragContainer.setAttribute('class', 'dragContainer');
      for (let i = 0; i  < currentQuestion.options.length; i++) {
        let newSpan = document.createElement('span');
        const textOption =  createTextOptionElement(i, false , currentQuestion?.correct[i]?.length, currentQuestion?.correct[i]?.length, "...");
        newSpan.textContent = currentQuestion.options[i];
        
        textContainer.appendChild(newSpan);
        if (i < currentQuestion?.options?.length - 1)
          textContainer.appendChild(textOption);
      
        const textOptionBtn = textOption.querySelector(".text-option-button");
        textOptionBtn.addEventListener('click', function() {
          const input = document.querySelector('#text_answer_' + i);
          let newSpan = document.createElement('span');

          let correctClass = input?.value?.toLowerCase()?.trim() === currentQuestion?.correct[i]?.toLowerCase()?.trim() ? "text-correct" : "text-incorrect";
          if (correctClass === "text-incorrect") recordIncorrectAnswer(index)
          if (correctClass === "text-correct") recordCorrectAnswer(index)
          newSpan.classList.add(correctClass);
          newSpan.textContent = input.value;
          textOption.parentNode.insertBefore(newSpan, textOption);
          textOption.parentNode.removeChild(textOption);
        });
      }
  } else if (currentQuestion.type === "matchingImg") {
    dragContainer.innerHTML = "";
    que_text.innerHTML = que_tag;
    img2.innerHTML = img_tag;
    textContainer.innerHTML = "";
    let leftQuestions = shuffle(currentQuestion.left)
    for (let a of leftQuestions) {
      let opt = document.createElement('div')
      opt.setAttribute('class','option2')
      opt.innerHTML='<span>'+a+'</span>'
      opt.onclick=()=>{selectOpt(opt, true)}
      left_list.append(opt)
    }
    let options = shuffle(currentQuestion.options)
    for (let a of options) {
      let opt = document.createElement('div')
      opt.setAttribute('class','option2')
      opt.innerHTML='<span id="choice"><img class=option_img src=img/2_2/'+a+'.jpg></span>'
      opt.onclick=()=>{selectOpt(opt, false)}
      option_list2.append(opt)
    }
  }
  else if(currentQuestion.type === "matching") {
    dragContainer.innerHTML = "";
    que_text.innerHTML = que_tag;
    img2.innerHTML = img_tag;
    textContainer.innerHTML = "";
    let leftQuestions = shuffle(currentQuestion.left)
    for (let a of leftQuestions) {
      let opt = document.createElement('div')
      opt.setAttribute('class','option2')
      opt.innerHTML='<span>'+a+'</span>'
      opt.onclick=()=>{selectOpt(opt, true)}
      left_list.append(opt)
    }
    let options = shuffle(currentQuestion.options)
    for (let a of options) {
      let opt = document.createElement('div')
      opt.setAttribute('class','option2')
      opt.innerHTML='<span>'+a+'</span>'
      opt.onclick=()=>{selectOpt(opt, false)}
      option_list2.append(opt)
    }
  } else {
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    option_list2.innerHTML = "";
    textContainer.innerHTML = "";
    dragContainer.innerHTML = "";
    dragContainer.setAttribute('class', 'dragContainer');
    img2.innerHTML = img_tag;
    for (let el of document.querySelectorAll('.option')) {
      el.onclick=()=>{
        optionSelected(el)
      }
    }
  }
  try {
    start()
  } catch(e) {
    // console.error(e)
  }
}


let myanswers = []
function optionSelected(answer) {
  let userAns = answer.textContent.trim();
  let correctAns = questions[que_count].correct;
  let allOptions = option_list.children.length;
  if (typeof correctAns == 'object') {
    if (correctAns.includes(userAns)) {
      answer.classList.add("correct");
      recordCorrectAnswer(que_count)
      console.log("Answer is correct");   
    } else {
      answer.classList.add("incorrect");
      recordIncorrectAnswer(que_count)
      console.log("Answer is wrong");
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
        userScore += 1;
      }
      myanswers=[]
    }
  } else {
    if (userAns == correctAns) {
      userScore += 1;
      answer.classList.add("correct");
      console.log("Answer is correct");
      recordCorrectAnswer(que_count)
    } else {
      recordIncorrectAnswer(que_count)
      answer.classList.add("incorrect");
      console.log("Answer is wrong");
      //selected the correct answer
      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].classList.add("correct");
        }
      }
    }
    for (let i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled");
    }
  }
  buttonNext.classList.remove("hide");
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
  if (opts.length != 2) return;
  opts[0].classList.add('hidden');
  opts[1].classList.add('hidden');
  function addOpts() {
    left_list.append(opts[0])
    option_list2.append(opts[1]);
    opts[0].classList.remove('hidden');
    opts[1].classList.remove('hidden');
  }
  setTimeout(addOpts, 500);
  
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
  let isQuestionCorrect = true;
  let els = [...document.querySelectorAll('.fixDan >.option2')];
  var allHaveCorrectOrIncorrect = els.every(function(el) {
    return el.classList.contains('correct') || el.classList.contains('incorrect');
  });
  let allEls = document.querySelectorAll('.option2');
  for (let el of els) {
    if (el.classList.contains('incorrect') || !el.classList.contains('correct')) {
      isQuestionCorrect=false;
      break
    }
  }
  if (allHaveCorrectOrIncorrect) {
    for (let elem of allEls) {
      elem.classList.add('disabled');
    }
  }
  let isQuestionCorrect2 = true;
  let els2 = [...document.querySelectorAll('.option-list2 >.option2')];
  var allHaveCorrectOrIncorrect = els2.every(function(el) {
    return el.classList.contains('correct') || el.classList.contains('incorrect');
  });
  let allEls2 = document.querySelectorAll('.option2');
  for (let el of els2) {
    if (el.classList.contains('incorrect') || !el.classList.contains('correct')) {
      isQuestionCorrect2=false;
      break
    }
  }
  if (allHaveCorrectOrIncorrect) {
    for (let elem of allEls2) {
      elem.classList.add('disabled');
    }
  } 
  if (isQuestionCorrect || isQuestionCorrect2) {
    loadedScoreCounter.recordAnswer(currentQuestion.id, true);
  } else if (!isCorrect){
    loadedScoreCounter.incrementErrors();
    loadedScoreCounter.recordAnswer(currentQuestion.id, false);
  }
}
function startStopwatch() {
  let startTime = sessionStorage.getItem('startTime'); // Получаем сохраненное время из sessionStorage

  let time = startTime ? parseInt(startTime, 10) : 0; // Если есть сохраненное время, используем его; иначе начинаем с нуля

  window.counter = setInterval(timer, 1000);

  function timer() {
    try {
      var hours = Math.floor(time / 3600);
      var minutes = Math.floor((time % 3600) / 60);
      var seconds = time % 60;
      
      // Форматирование времени в формат ЧЧ:ММ:СС
      var formattedTime = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

      // Отображение форматированного времени
      timeCount.innerHTML = formattedTime;

      time++;

      // Сохраняем текущее время в sessionStorage
      sessionStorage.setItem('startTime', time);

      // Пример остановки таймера через 24 часа (время в секундах)
      if (time > 86400) {
        clearInterval(window.counter);
        // Действия после завершения времени (пример: скрыть контейнеры)
        container1.classList.add("hide");
        container2.classList.remove("hide");
        sessionStorage.clear();
      }
    } catch (e) {
      console.error(e);
    }
  }
}

function queCounter(index) {
  const ques_counter = document.querySelector(".counter_exercise");
  let totalQuesTag = '' + index + '/' + questions.length + '';
  ques_counter.innerHTML = totalQuesTag;
}

function getFileName(src) {
  let srcArray = src.split("/");
  return srcArray[srcArray.length-1].split(".")[0];
}

function shuffle(array) {
  let remainingElements = array.length, temp, i;
  while (remainingElements) {
    i = Math.floor(Math.random() * remainingElements--);
    temp = array[remainingElements];
    array[remainingElements] = array[i];
    array[i] = temp;
  }
  return array;
}