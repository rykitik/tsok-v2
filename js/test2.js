let slideIndex = 0;
function setButtons() {
  // Устанавливаем обработчики событий для кнопок
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
}
// Функция для показа предыдущего слайда
function showPreviousSlide() {
  // Получаем элементы слайдера
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  console.log(1111)
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  const slider = document.querySelector('.slider');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}
function start() {
  updateSlider()
  setButtons()
}

// Инициализация слайдера
// updateSlider();
const questions = [
  {
      id: "20",
      // img:"../img/t_3/img2.PNG",
      question: "Задание. <p style=font-weight:normal><br>Вам предстоит ознакомиться с материалом по теме ВЫБОР ОБОРУДОВАНИЯ, ИНСТРУМЕНТА И ТЕХНОЛОГИЧЕСКОЙ ОСНАСТКИ и выполнить 10 практических заданий. <br>Задания включают вопросы: по выбору правильного ответа, на установление соответствия, вставку пропущенных слов. <br>Время выполнения заданий не ограничено.",
      options: ["продолжить"],
      correct: "продолжить",
      init:  start,
      nextButton: false
    },  
  
  {
      id: "0",
      // img:"../img/t_3/img2.PNG",
      question: "1. Изучите основные виды токарных станков. Нажмите кнопку продолжить, если ознакомились.<p style=font-weight:normal><br>К основным видам токарных станков относятся: <br><div class=slider-container><div class=slider><img src=../img/t_3/2_1.PNG><img src=../img/t_3/2_2.PNG><img src=../img/t_3/2_3.PNG><img src=../img/t_3/2_4.PNG><img src=../img/t_3/2_5.PNG><img src=../img/t_3/2_6.PNG></div><button class=prev-button>&lt;</button><button class=next-button>&gt</button></div>",
      options: ["продолжить"],
      correct: "продолжить",
      init:  start,
      nextButton: false
    },
    {
      id: "1",
    //   img:"../img/t_3/img1.PNG",
      question: "2. Установите соответствие между видами токарных  станков и основным их назначением<br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ["A. Токарно-винторезный станок", "B.	Токарно-карусельный станок", "C.	Токарно-фрезерный обрабатывающий центр", "D.	Автомат продольного точения"],
      droppable: ["Токарные операции при изготовлении деталей в единичном и мелкосерийном производстве", "Токарные работы с крупногабаритными заготовками", "Выполнение токарных, сверлильно-расточных и фрезерных операций", "Токарная обработка деталей из калиброванного прутка, фасонного профиля, проволоки"],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },
    {
      id: "2",
      // img:"../img/t_3/img8.PNG",
      question: "3. Перенесите и вставьте пропущенные слова в тексте<br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['гибкость','производительность', 'точность', 'трудозатраты'],
      droppable: ['В станке с ЧПУ совмещается ', 'универсального оборудования и высокая ', 'автоматического станка, его использование повышает ', 'обработки и сокращает '],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },
  
    // {
    //   id: "3",
    //   img:"../img/t_3/img8.PNG",
    //   question: "2. Выберите тип станка для токарной операции по изготовлению заданной детали в условиях серийного производства. (Выберите единственно правильный ответ)",
    //   options: ["Токарно-винторезный станок", "Токарно-револьверный станок", "Токарно-карусельный станок","Токарно-фрезерный обрабатывающий центр", "Автомат продольного точения", "Токарный станок с ЧПУ"],
    //   correct: "Токарный станок с ЧПУ",
    // },

    {
      id: "3",
      // img:"../img/t_3/img2.PNG",
      question: "4. Изучите конструкции основных технологических приспособлений для токарных станков. <p style=font-weight:normal><br><br>К основным технологическим приспособлениям для токарных станков относятся:<br><div class=slider-container><div class=slider><img src=../img/t_3/4_1.PNG><img src=../img/t_3/4_2.PNG><img src=../img/t_3/4_3.PNG><img src=../img/t_3/4_4.PNG><img src=../img/t_3/4_5.PNG><img src=../img/t_3/4_6.PNG></div><button class=prev-button>&lt;</button><button class=next-button>&gt</button></div></main>",
      options: ["продолжить"],
      correct: "продолжить",
    },

    {
      id: "4",
      // img:"../img/t_3/img15.PNG",
      question: "5. Установите соответствие между конструкциями технологических приспособлений для токарных станков и их назначением <br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['A. Поводковые патроны','B. 4-х кулачковые патроны', 'C.  Токарные оправки', 'D.  Люнеты'],
      droppable: ['1. Для передачи крутящего момента детали, установленной в центрах',
      '2. Для закрепления фасонных заготовок прямоугольной или несимметричной формы',
      '3. Для установки по внутренней поверхности заготовок',
      '4. Дополнительные опоры для повышения жёсткости установки валов в центрах',],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },
    {
      id: "5",
      // img:"../img/t_3/img15.PNG",
      question: "6. Перенесите и вставьте пропущенные слова в тексте <br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['Станочные','Вспомогательный', 'Сборочные', 'Контрольные', 'Транспортно-кантовальные'],
      droppable: ['По целевому назначению различают следующие группы приспособлений:<br>приспособления для установки обрабатываемых заготовок на станках',
      'инструмент для установки рабочих инструментов',
      'приспособления для обеспечения правильного взаимного положения деталей и сборочных единиц',
      'приспособления для контроля обрабатываемых заготовок и изготавливаемых деталей, а также проверки собранных узлов, механизмов и машин',
      'приспособления для захвата, перемещения и перевертывания обрабатываемых заготовок',
      ],
      answers: ["1-1", "2-2", "3-3", "4-4", "5-5"],
      nextButton: false
    },

    // {
    //   id: "6",
    //   img:"../img/t_3/img15.PNG",
    //   question: "5. Выберите тип технологического приспособления для токарной операции по изготовлению заданной детали. (Выберите единственно правильный ответ)",
    //   options: ["Центр", "Поводковый патрон", "Кулачковый патрон","Цанговый патрон", "Токарная оправка", "Люнет"],
    //   correct: "Кулачковый патрон",
    // },

    {
      id: "6",
      // img:"../img/t_3/img2.PNG",
      question: "7. Изучите типы основных режущих инструментов для токарных работ. <p style=font-weight:normal><br><br>К основным режущим инструментам для токарных работ относятся: <br><div class=slider-container><div class=slider><img src=../img/t_3/7_1.PNG><img src=../img/t_3/7_2.PNG><img src=../img/t_3/7_3.PNG><img src=../img/t_3/7_4.PNG><img src=../img/t_3/7_5.PNG><img src=../img/t_3/7_6.PNG></div><button class=prev-button>&lt;</button><button class=next-button>&gt</button></div></main>",
      options: ["продолжить"],
      correct: "продолжить",
    },

    {
      id: "7",
      // img:"../img/t_3/img15.PNG",
      question: "8. Установите соответствие между типами режущих инструментов для токарных работ и их назначением <br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['A. Отрезные резцы','B. Проходные резцы', 'C. Канавочные резцы', 'D.  Расточные резцы'],
      droppable: ['Обработка торцевых поверхностей и отрезка детали от заготовки',
      'Обработка цилиндрических, конических и фасонных поверхностей заготовки',
      'Протачивание канавок',
      'Обработка глухих и сквозных отверстий',
      ],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },

    {
      id: "8",
      // img:"../img/t_3/img2.PNG",
      question: "9. Изучите основные типы измерительных инструментов для контроля размеров. <p style=font-weight:normal><br><br>Измерительные инструменты для контроля наружных и внутренних размеров: <br><div class=slider-container><div class=slider><img src=../img/t_3/9_1.PNG><img src=../img/t_3/9_2.PNG><img src=../img/t_3/9_31.PNG><img src=../img/t_3/9_4.PNG><img src=../img/t_3/9_5.PNG><img src=../img/t_3/9_6.PNG><img src=../img/t_3/9_7.PNG><img src=../img/t_3/9_8.PNG></div><button class=prev-button>&lt;</button><button class=next-button>&gt</button></div></main><script src=script.js></script>",
      options: ["продолжить"],
      correct: "продолжить",
    },

    {
      id: "9",
      // img:"../img/t_3/img15.PNG",
      question: "10. Установите соответствие между типами измерительных инструментов и их назначением <br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['A. Штангенциркули','B. Микрометры', 'C.  Микрометрические глубиномеры', 'D.  Микрометрические нутромеры'],
      droppable: ['Контроль наружных и внутренних размеров',
      'Контроль наружных размеров с высокой точностью',
      'Точное измерение глубин отверстий и других длин',
      'Точное измерения диаметров отверстий, как правило больших размеров',
      ],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },
    {
      id: "10",
      // img:"../img/t_3/img2.PNG",
      question: "11. Ознакомьтесь с содержанием токарной операции по изготовлению заданной детали<br><img src='../img/2_2/img1.jpg'>",
      options: ["продолжить"],
      correct: "продолжить",
    },
    {
      id: "11",
      // img:"../img/t_3/img2.PNG",
      type: 'one_of',
      question: "12. Выберите тип станка для токарной операции по изготовлению заданной детали в условиях серийного производства",
      options: ["Токарно-винторезный станок", "Токарно-револьверный станок", "Токарно-карусельный станок", "Токарно-фрезерный обрабатывающий центр", "Автомат продольного точения", 'Токарный станок с ЧПУ'],
      correct: "Токарный станок с ЧПУ",
      nextButton:true
    },
    {
      id: "12",
      // img:"../img/t_3/img2.PNG",
      type: 'one_of',
      question: "13. Выберите тип технологического приспособления для токарной операции по изготовлению заданной детали",
      options: ["Центр",'Поводковый патрон','Кулачковый патрон','Цанговый патрон','Токарная оправка','Люнет'],
      correct: "Кулачковый патрон",
      nextButton:true
    },

    {
      id: "13",
      // img:"../img/t_3/img15.PNG",
      question: "14. Выберите типы режущих инструментов для токарной операции по изготовлению заданной детали<br><br><br> ",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['Наружный торец','Сквозное отверстие','Глухое отверстие','Наружная цилиндрическая поверхность'],
      droppable: ['Подрезной резец','Сверло','Расточной резец','Проходной резец',],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },

    {
      id: "14",
      // img:"../img/t_3/img15.PNG",
      question: "15. Выберите типы режущих инструментов для токарной операции по изготовлению заданной детали <br><br><br><br>",
      options: ["продолжить"],
      correct: "продолжить",
      dnd: true,
      items: ['<img src="../img/2_2/15_1.png" alt="">','<img src="../img/2_2/15_2.png" alt="">','<img src="../img/2_2/15_3.png" alt="">','<img src="../img/2_2/15_4.png" alt="">'],
      droppable: ['Штангенциркуль','Штангенглубиномер','Калибр-пробка','Калибр-скоба',],
      answers: ["1-1", "2-2", "3-3", "4-4"],
      nextButton: false
    },
  ];
  const exercise =[
    {
      id:"0",
      text:"<p class='text-exercise'>"+"<br> <b>Режущий инструмент </b> – инструмент, предназначенный для изменения формы и размеров заготовки путём удаления части материала в виде стружки с целью получения готовой детали или полуфабриката.</p>"
      
    }
  ];

