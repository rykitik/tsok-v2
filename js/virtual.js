
const option_list = document.querySelector(".option-list");
const left_list = document.querySelector("#left-list");
const timeCount = document.querySelector(".time-counter");
const buttonNext = document.getElementById("next-button");
const container1 = document.querySelector(".container1");
const container2 = document.querySelector(".container2");

const buttonPrev = document.querySelector(".prevbutton");
const time_after = document.querySelector(".time_after");

const text_zadanie = document.querySelector(".text-zadanie");

const tab_exercise_container = document.querySelector(".tab_exercise_container");
tabsShow();
showQuestions(0);
queCounter(1);
startTimer(900);
google.charts.load('current', {'packages':['corechart']});


let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 100;
/* var userScore = 0; */
var userScore = 0;

const result_box = document.querySelector(".correct_answers");

function tabsShow(){
  let tab_tag = "";
  console.log(questions.length);
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
    buttonNext.classList.add("hide");
  }else{
    
    container1.classList.add("hide");
      container2.classList.remove("hide");
      clearInterval(counter);
      time_after.innerHTML = timeCount.textContent;
      ShowResult();
      google.charts.setOnLoadCallback(drawChart);

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
  const que_text = document.querySelector(".text-zadanie");
  
  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  let que_tag = '<span>'+ questions[index].question+'</span>';
  let img_tag = '';
  img_tag = questions[index].img;
  let opisanie_tag = '';
  opisanie_tag = '<span>'+ questions[index].text+'</span>';
	
  que_text.innerHTML = que_tag;
  option_list.innerHTML = opisanie_tag;
  img.src= img_tag;
}



function showQuestions(index){
  const que_text = document.querySelector(".text-zadanie");
  
  tab_exercise_container.children[index].setAttribute("class", "active_tab")
  let que_tag = '<span>'+ questions[index].question+'</span>';
  let option_tag = '';
  let left_tag = '';
  for(let i = 0; i < questions[index].options.length; i++){
    option_tag += '<div class="option" id="cells"><span>'+questions[index].options[i]+'</span></div>';
  }
  
  if(questions[index].id==2){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==3){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==4){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==7){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==8){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==11){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==12){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==15){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  else if(questions[index].id==16){
    for(let i = 0; i < questions[index].left.length; i++){ 
      left_tag += '<span id="drag">'+questions[index].left[i]+'</span>';
    }  
  } 
  
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  left_list.innerHTML = left_tag;

  numbers = document.querySelectorAll('#numbers');
  drop = document.querySelectorAll('.option');
  variables = document.querySelectorAll('#variable');
  choice = document.querySelectorAll('#choice');
  setNumbers();

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++){
    if(questions[index].id >= 0){
      option[i].setAttribute("onclick", "optionSelected(this)"); 
    }
  }
}
 
function optionSelected(answer){
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].correct;
  let allOptions = option_list.children.length;
  
  if(userAns == correctAns){

    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct"); 

  }else{ 
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

function startTimer(time){
   let counter = setInterval(timer,1000); 
    function timer(){
    var minutes = Math.floor(time/60);
    var seconds = time%60;
        if(seconds > 9)
        timeCount.innerHTML= minutes + ":" + seconds, 200,190;
        else
        timeCount.innerHTML= minutes + ":0" + seconds, 200,190;
      /* timeCount.innerHTML = time; */
      time--;
      if(time < 0){
        container1.classList.add("hide");
        container2.classList.remove("hide");
          
        clearInterval(counter);
      }
    }
}
  
function ShowResult(){
  result_box.innerHTML = userScore; 
}


function queCounter(index){
  const ques_counter  = document.querySelector(".counter_exercise");
  let totalQuesTag = ''+ index +'/'+ questions.length +'';
  ques_counter.innerHTML = totalQuesTag;
}


function drawChart() { 
  console.log =("sdfdsf"+userScore);
  let wrong_ans = questions.length - userScore;
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Ответы'],
    ['Верные',  userScore  ],
    ['Неверные',  wrong_ans],

  ]); 
  var options = {
    title: 'График ответов',
    colors: ['#43698F', '#A2BEDD'],
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
} 
let ansvariables = [""];
let ansvariables1 = [""];
let ansvariables2 = [""];
let ansvariables3 = [""];
let ansvariables4 = [""];
let ansvariables5 = [""];
let ansvariables6 = [""];
let ansvariables7 = [""];
let ansvariables8 = [""];
let ansvariables9 = [""];
let ansvariables10 = [""];
let ansvariables11 = [""];
let ansvariables12 = [""];
let ansvariables13 = [""];
let ansvariables14 = [""];
let ansvariables15 = [""];
let ansvariables16 = [""];
let ansvariables17 = [""];
let ansvariables18 = [""];

function setNumbers(){
  
  $(numbers).draggable({
    cursor: 'move', 
  }); 
  $(drop).droppable({
    activeClass:"active",
    hoverClass:"hover",
    drop: function(event, ui){
      if(questions[que_count].id == 2){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='Наружный торец'){
          ansvariables[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Сквозное отверстие'){
          ansvariables[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Глухое отверстие'){
          ansvariables[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Наружная цилиндрическая поверхность'){
          ansvariables[4] = ui.draggable.text()+this.innerHTML;
        }
       
        checkvariablesanswer()
      }
      if(questions[que_count].id == 3){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='36-0,62'){
          ansvariables1[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='12±0,15'){
          ansvariables1[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Ø36+0,1'){
          ansvariables1[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Ø48-0,062'){
          ansvariables1[4] = ui.draggable.text()+this.innerHTML;
        }
       
        checkvariablesanswer1()
      }
      if(questions[que_count].id == 4){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='Токарный станок'){
          ansvariables2[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Сверлильный'){
          ansvariables2[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Шлифовальный станок'){
          ansvariables2[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Фрезерный станок'){
          ansvariables2[4] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Протяжной станок'){
          ansvariables2[5] = ui.draggable.text()+this.innerHTML;
        }
         
        checkvariablesanswer2()
      }
      if(questions[que_count].id == 7){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='универсальное'){
          ansvariables3[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='обрабатывающие центры'){
          ansvariables3[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='автоматические линии'){
          ansvariables3[3] = ui.draggable.text()+this.innerHTML;
        }
      
         
        checkvariablesanswer3()
      }
      if(questions[que_count].id == 8){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='Резец'){
          ansvariables4[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Фреза'){
          ansvariables4[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Сверло'){
          ansvariables4[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Метчик'){
          ansvariables4[4] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Плашка'){
          ansvariables4[5] = ui.draggable.text()+this.innerHTML;
        }
         
        checkvariablesanswer4()
      }
      if(questions[que_count].id == 11){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='У10'){
          ansvariables5[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='ХВГ'){
          ansvariables5[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Р6М5'){
          ansvariables5[3] = ui.draggable.text()+this.innerHTML;
        }
      
         
        checkvariablesanswer5()
      }
      if(questions[que_count].id == 12){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='Станочное приспособление'){
          ansvariables6[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Вспомогательный инструмент'){
          ansvariables6[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Сборочное приспособление'){
          ansvariables6[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Контрольное приспособление'){
          ansvariables6[4] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Приспособления для захвата заготовок'){
          ansvariables6[5] = ui.draggable.text()+this.innerHTML;
        }
         
        checkvariablesanswer6()
      }
      if(questions[que_count].id == 15){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='универсальное'){
          ansvariables7[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='наладочное'){
          ansvariables7[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='специальное'){
          ansvariables7[3] = ui.draggable.text()+this.innerHTML;
        }
      
         
        checkvariablesanswer7()
      }
      if(questions[que_count].id == 16){ 
        ui.draggable.draggable('disable')
        if(ui.draggable.text()=='Микрометр'){
          ansvariables8[1] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Штангенциркуль'){
          ansvariables8[2] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Нутромер'){
          ansvariables8[3] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Кронциркуль'){
          ansvariables8[4] = ui.draggable.text()+this.innerHTML;
        }
        if(ui.draggable.text()=='Штангенглубиномер'){
          ansvariables8[5] = ui.draggable.text()+this.innerHTML;
        }
         
        checkvariablesanswer8()
      }
      
      // console.log();
      // console.log(this.innerHTML);
      // console.log(ui.draggable.text());
      
    }
  });
  $(variables).draggable({
    cursor: 'move',
  });
  $(choice).droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    drop: function(event, ui){
      
      
    }
  })
}
oncevariablesA=1;
oncevariablesB=1;
oncevariablesC=1;
oncevariablesD=1;
function checkvariablesanswer(){
  if(ansvariables.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables[1].includes("Проходной резец")){ 
      if(oncevariablesA==1){
        userScore += oncevariablesA;
        oncevariablesA--;
      } 
    }
    if(ansvariables[2].includes("Подрезной резец")){
      if(oncevariablesB==1){
        userScore += oncevariablesB;
        oncevariablesB--;
      } 
    }
    if(ansvariables[3].includes("Расточной резец")){
      if(oncevariablesC==1){
        userScore += oncevariablesC;
        oncevariablesC--;
      } 
    }
    if(ansvariables[4].includes("Сверло")){
      if(oncevariablesD==1){
        userScore += oncevariablesD;
        oncevariablesD--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA1=1;
oncevariablesB1=1;
oncevariablesC1=1;
oncevariablesD1=1;
function checkvariablesanswer1(){
  if(ansvariables1.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables1[1].includes("Калибр-пробка")){ 
      if(oncevariablesA1==1){
        userScore += oncevariablesA1;
        oncevariablesA11--;
      } 
    }
    if(ansvariables1[2].includes("Калибр-скоба")){
      if(oncevariablesB1==1){
        userScore += oncevariablesB1;
        oncevariablesB1--;
      } 
    }
    if(ansvariables1[3].includes("Штангенциркуль")){
      if(oncevariablesC1==1){
        userScore += oncevariablesC1;
        oncevariablesC1--;
      } 
    }
    if(ansvariables1[4].includes("Штангенглубиномер")){
      if(oncevariablesD1==1){
        userScore += oncevariablesD1;
        oncevariablesD1--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA2=1;
oncevariablesB2=1;
oncevariablesC2=1;
oncevariablesD2=1;
oncevariablesE2=1;
function checkvariablesanswer2(){
  if(ansvariables2.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables2[1].includes("1")){ 
      if(oncevariablesA2==1){
        userScore += oncevariablesA2;
        oncevariablesA2--;
      } 
    }
    if(ansvariables2[2].includes("2")){
      if(oncevariablesB2==1){
        userScore += oncevariablesB2;
        oncevariablesB2--;
      } 
    }
    if(ansvariables2[3].includes("3")){
      if(oncevariablesC2==1){
        userScore += oncevariablesC2;
        oncevariablesC2--;
      } 
    }
    if(ansvariables2[4].includes("4")){
      if(oncevariablesD2==1){
        userScore += oncevariablesD2;
        oncevariablesD2--;
      } 
    }
    if(ansvariables2[5].includes("5")){
      if(oncevariablesE2==1){
        userScore += oncevariablesE2;
        oncevariablesE2--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA3=1;
oncevariablesB3=1;
oncevariablesC3=1;
function checkvariablesanswer3(){
  if(ansvariables3.length==4){
    buttonNext.classList.remove("hide");
    if(ansvariables3[1].includes("в единичном производстве")){ 
      if(oncevariablesA3==1){
        userScore += oncevariablesA3;
        oncevariablesA3--;
      } 
    }
    if(ansvariables3[2].includes("в серийном")){
      if(oncevariablesB3==1){
        userScore += oncevariablesB3;
        oncevariablesB3--;
      } 
    }
    if(ansvariables3[3].includes("в массовом")){
      if(oncevariablesC3==1){
        userScore += oncevariablesC3;
        oncevariablesC3--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA4=1;
oncevariablesB4=1;
oncevariablesC4=1;
oncevariablesD4=1;
oncevariablesE4=1;
function checkvariablesanswer4(){
  if(ansvariables4.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables4[1].includes("1")){ 
      if(oncevariablesA4==1){
        userScore += oncevariablesA4;
        oncevariablesA4--;
      } 
    }
    if(ansvariables4[2].includes("2")){
      if(oncevariablesB4==1){
        userScore += oncevariablesB4;
        oncevariablesB4--;
      } 
    }
    if(ansvariables4[3].includes("3")){
      if(oncevariablesC4==1){
        userScore += oncevariablesC4;
        oncevariablesC4--;
      } 
    }
    if(ansvariables4[4].includes("4")){
      if(oncevariablesD4==1){
        userScore += oncevariablesD4;
        oncevariablesD4--;
      } 
    }
    if(ansvariables4[5].includes("5")){
      if(oncevariablesE4==1){
        userScore += oncevariablesE4;
        oncevariablesE4--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA5=1;
oncevariablesB5=1;
oncevariablesC5=1;
function checkvariablesanswer5(){
  if(ansvariables5.length==4){
    buttonNext.classList.remove("hide");
    if(ansvariables5[1].includes("В качестве материала режущей части применяют: инструментальные углеродистую сталь ... для сверл, метчиков, плашек,")){ 
      if(oncevariablesA5==1){
        userScore += oncevariablesA5;
        oncevariablesA5--;
      } 
    }
    if(ansvariables5[2].includes("инструментальную легированную сталь ... для протяжек и фрез;")){
      if(oncevariablesB5==1){
        userScore += oncevariablesB5;
        oncevariablesB5--;
      } 
    }
    if(ansvariables5[3].includes("быстрорежущую сталь ... для обработки вязких, но прочных сталей")){
      if(oncevariablesC5==1){
        userScore += oncevariablesC5;
        oncevariablesC5--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA6=1;
oncevariablesB6=1;
oncevariablesC6=1;
oncevariablesD6=1;
oncevariablesE6=1;
function checkvariablesanswer6(){
  if(ansvariables6.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables6[1].includes("1")){ 
      if(oncevariablesA6==1){
        userScore += oncevariablesA6;
        oncevariablesA6--;
      } 
    }
    if(ansvariables6[2].includes("2")){
      if(oncevariablesB6==1){
        userScore += oncevariablesB6;
        oncevariablesB6--;
      } 
    }
    if(ansvariables6[3].includes("3")){
      if(oncevariablesC6==1){
        userScore += oncevariablesC6;
        oncevariablesC6--;
      } 
    }
    if(ansvariables6[4].includes("4")){
      if(oncevariablesD6==1){
        userScore += oncevariablesD6;
        oncevariablesD6--;
      } 
    }
    if(ansvariables6[5].includes("5")){
      if(oncevariablesE6==1){
        userScore += oncevariablesE6;
        oncevariablesE6--;
      } 
    }
    console.log(userScore)
  }
}

oncevariablesA7=1;
oncevariablesB7=1;
oncevariablesC7=1;
function checkvariablesanswer7(){
  if(ansvariables7.length==4){
    buttonNext.classList.remove("hide");
    if(ansvariables7[1].includes("в единичном производстве")){ 
      if(oncevariablesA7==1){
        userScore += oncevariablesA7;
        oncevariablesA7--;
      } 
    }
    if(ansvariables7[2].includes("в серийном")){
      if(oncevariablesB7==1){
        userScore += oncevariablesB7;
        oncevariablesB7--;
      } 
    }
    if(ansvariables7[3].includes("в массовом")){
      if(oncevariablesC7==1){
        userScore += oncevariablesC7;
        oncevariablesC7--;
      } 
    }
    console.log(userScore)
  }
}


oncevariablesA8=1;
oncevariablesB8=1;
oncevariablesC8=1;
oncevariablesD8=1;
oncevariablesE8=1;
function checkvariablesanswer8(){
  if(ansvariables8.length==5){
    buttonNext.classList.remove("hide");
    if(ansvariables8[1].includes("1")){ 
      if(oncevariablesA8==1){
        userScore += oncevariablesA8;
        oncevariablesA8--;
      } 
    }
    if(ansvariables8[2].includes("2")){
      if(oncevariablesB8==1){
        userScore += oncevariablesB8;
        oncevariablesB8--;
      } 
    }
    if(ansvariables8[3].includes("3")){
      if(oncevariablesC8==1){
        userScore += oncevariablesC8;
        oncevariablesC8--;
      } 
    }
    if(ansvariables8[4].includes("4")){
      if(oncevariablesD8==1){
        userScore += oncevariablesD8;
        oncevariablesD8--;
      } 
    }
    if(ansvariables8[5].includes("5")){
      if(oncevariablesE8==1){
        userScore += oncevariablesE8;
        oncevariablesE48--;
      } 
    }
    console.log(userScore)
  }
}