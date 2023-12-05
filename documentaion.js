const questions = [

  // Для добавления картинок есть следующие папки: ../img/1_2/ - для ЭОМ 1, ../img/2_2/ - для ЭОМ 2,  ../img/3_3/ - для ЭОМ 3, ../img/t_3/ - для слайдеров.

    // ЭОМ 3 // 

  // Свойство type - тип вопроса. (matchingImg, matching, one_of, many, choice, optionText)
  // Свойство id - уникальный индефикатор вопроса
  // Свойство question - контент(HTML, картинки и текст) вопроса.
  // Свойство left  -  варианты сопостоавления в верхнем столбике,
  // Свойство options  - варианты ответов // варианты сопостоавления в нижнем столбике, 
  // Свойство correct - верный ответ(ы)
  // Свойство cost - цена задания, количество выдаваемых баллов.
  // Свойство offer - шаблон текста для задания вставки слов, в котором нужно указать места для вставки слов

  // Сопоставление с изображением
  {
    id: 0,
    type: "matchingImg",
    question: "<p style=font-size:18px>Укажите фактор, влияющий на выбор технологических приспособлений ( баллов). <br><br><p style=font-weight:normal;font-size:18px> Кликайте на вариант в верхней и соответствующий ему вариант в нижней строке. <br>Выбранные ответы перемещаются вправо. <br>Верные окрашиваются в зеленый, неверные в красный цвет. Баллы начисляются за полностью верный ответ.<br></br>",
    left: ['Резец','Фреза','Сверло','Метчик'],
    options: ["img6", "img7", "img8", "img9"],
    correct: [{'Резец': 'img6'}, {'Фреза': 'img7'}, {'Сверло':'img8'}, {'Метчик':'img9'}],
    cost: 100,
  },
  // Сопоставление с изображением + картинка сверху
  {
    id: 2,
    type: "matching",
    question: "<p style=font-size:18px>3.	Установите точность поверхностей 1, 2 и 3 по чертежу (100 баллов). <br><br><p style=font-weight:normal;font-size:18px> Кликайте на вариант в верхней и соответствующий ему вариант в нижней строке. <br>Выбранные ответы перемещаются вправо. <br>Верные окрашиваются в зеленый, неверные в красный цвет. Баллы начисляются за полностью верный ответ.<br><br><div style='width: 100%;display: flex;justify-content: center;'> <img style='width: 100%;' src='../img/3_3/img8.jpg' alt='img7'> </div><br>",
    left: ['Поверхность 1','Поверхность 2','Поверхность 3'],
    options: ["Шероховатость Ra 1,25",
              "Шероховатость Ra 6,3", 
              "Шероховатость Ra 2,5"],
    correct: [{'Поверхность 1': 'Шероховатость Ra 1,25'}, 
              {'Поверхность 2': 'Шероховатость Ra 6,3'}, 
              {'Поверхность 3':'Шероховатость Ra 2,5'}],
    cost: 100,
  },
  // Сопоставление
  {
    id: 11,
    type: "matching",
    question: "<p style=font-size:18px>кажите фактор, влияющий на выбор технологических приспособлений ( баллов). <br><br><p style=font-weight:normal;font-size:18px> Кликайте на вариант в верхней и соответствующий ему вариант в нижней строке. <br>Выбранные ответы перемещаются вправо. <br>Верные окрашиваются в зеленый, неверные в красный цвет. Баллы начисляются за полностью верный ответ.<br></br>",
    left: ['1 условие','2 условие ','3 условие'],
    options: ["",
              "", 
              ""],
    correct: [{'1 условие': ''}, 
              {'2 условие': ''}, 
              {'3 условие':''}],
    cost: 250,
  },
  // Выбрать один из вариантов
  {
    id: 4,
    type: 'one_of',
    question: "<p style=font-size:18px>Укажите фактор, влияющий на выбор технологических приспособлений ( баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите единственно правильный ответ.</p><br>",
    options: ["Тип производства", "Материал заготовки", "Твердость заготовки", "Использование СОЖ ", "Высота станка"],
    correct: "Тип производства",
    cost: 150,
  },
  // Выбрать больше одного из вариантов
  {
    id: 6,
    type: 'many',
    question: '<p style=font-size:18px>Укажите типы микрометров ( баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите все правильные ответы</p></br>',
    options: ['Гладкие','Рычажные','Поворотные','Листовые','Призматические','Наклонные','Цилиндрические'],
    correct: ['Гладкие','Рычажные','Листовые','Призматические'],
    cost: 200,
  },
  // Вставить пропущенные слова, выбрав их из предложенного списка
  {
    id: 12,
    type: 'choice',
    question: '<p style=font-size:18px>Вставьте пропущенные слова, выбрав их из предложенного списка ( баллов)<br></br>',
    offer: 'Вылет электрода нагревается за счет теплоты, выделяемой по прохождению по нему тока по закону {0}',
    options: {0: ['Джоуля-Ленца', 'Д.Джоуль', 'В.Кориолиса']},
    correct: {0: 'Джоуля-Ленца'},
    cost: 250,
  },
  // Выбрать один из вариантов с картинкой
  {
    id: 11,
    type: 'one_of',
    question: `<p style=font-size:18px>Определите показание прибора. (250 баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите единственно правильный ответ.</p><br><div style="width: 100%;display: flex;justify-content: center;"> <img src="../img/3_3/pribor_2.png" alt="diagram_signals.jpg"> </div><br><br>`,
    options: ["15 В", "17 В", "90 В В", "102 В"],
    correct: "102 В",
    cost: 250,
  },
  // Ввести ответ текстом с клавиатуры
  {
    id: 0,
    type: "optionText",
    question: "<p style=font-size:18px> Задание с текстом (100 баллов). <br><br>",
    options: ["Первый заяц", "был детнинец, ", "."],
    correct: ["недопонятый гений", "Глупый"],
    cost: 100,
  },
  
    // ЭОМ 2 // 

    // Свойство img:"img1" - добавляет картинку снизу | Картинки должны быть в формате JPG.
    // Свойство id - уникальный индефикатор вопроса
    // Свойство question - контент(HTML, картинки и текст) вопроса.
    // Свойство options  -   массив вариантов ответов, 
    // Свойство correct | answers - верный ответ(ы)
    // Свойство nextButton - отображение option
    // Свойство dnd - данный вопрос имеет DragAndDrop(true/false) 
    // Свойство isSelectText - данный вопрос имеет ввод пропущенных слов с клавиатуры
    // Свойство droppable - элементы, куда перетаскивается
    // Свойство items - перетаскиваемые элементы
    
    
  // Первая страница. Вставляется в начало
  {
    id: "20",
    question: "Задание. <p style=font-weight:normal><br>Вам предстоит ознакомиться с материалом по теме ВЫБОР ОБОРУДОВАНИЯ, ИНСТРУМЕНТА И ТЕХНОЛОГИЧЕСКОЙ ОСНАСТКИ и выполнить 10 практических заданий. <br>Задания включают вопросы: по выбору правильного ответа, на установление соответствия, вставку пропущенных слов. <br>Время выполнения заданий не ограничено.",
    options: ["продолжить"],
    correct: "продолжить",
    init:  start,
    nextButton: false
  },
  // Просто страница с картинкой. <br> - перенос строки. <img src='../img/2_2/img1.jpg'> - картинка. <p style=font-weight:normal> Текст </p> - текст без жирного выделени
  {
    id: "10",
    question: "11. Ознакомьтесь с содержанием токарной операции по изготовлению заданной детали<br><img src='../img/2_2/img1.jpg'>",
    options: ["продолжить"],
    correct: "продолжить",
  },
  // Слайдер
  {
    id: "0",
    question: "1. Изучите основные виды токарных станков. Нажмите кнопку продолжить, если ознакомились.<p style=font-weight:normal><br>К основным видам токарных станков относятся: <br><div class=slider-container><div class=slider><img src=../img/t_3/2_1.PNG><img src=../img/t_3/2_2.PNG><img src=../img/t_3/2_3.PNG><img src=../img/t_3/2_4.PNG><img src=../img/t_3/2_5.PNG><img src=../img/t_3/2_6.PNG></div><button class=prev-button>&lt;</button><button class=next-button>&gt</button></div>",
    options: ["продолжить"],
    correct: "продолжить",
    init:  start,
    nextButton: false
  },
  // Ввести ответ текстом с клавиатуры
  {
    id: "1",
    question: "2. Задание>",
    isSelectText: true,
    options: ["Погода была милой и", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда", "радовала как никогда"],
    correct: ["ответ", "праздничный утренник", "радость", "ответ", "ответ", "ответ"],
    nextButton: false
  },
  // Ввести ответ текстом с клавиатуры [Картинка сверху] - ФОРМАТ КАРТИНКИ ТОЛЬКО JPG 
  {
    id: "0",
    question: "1. Внимательно посмотрите на рисунок и выполните задание. <br/><br/><p style=font-weight:normal> На рисунке дано устройство силового трансформатора. Дайте определение следующим деталям силового трансформатора: </p> <br> <img src='../img/2_2/img1.jpg'>",
    isSelectText: true,
    options: ["Радиатор – это система", "; Обмотки НН – обмотка", ";"],
    correct: ["охлаждения", "низшего напряжения"],
    nextButton: false,
  },
  // Ввести ответ текстом с клавиатуры [Картинка снизу]  - ФОРМАТ КАРТИНКИ ТОЛЬКО JPG
  {
    id: "0",
    question: "1. Внимательно посмотрите на рисунок и выполните задание. <br/><br/><p style=font-weight:normal> На рисунке дано устройство силового трансформатора. Дайте определение следующим деталям силового трансформатора: </p>",
    isSelectText: true,
    options: ["Радиатор – это система", "; Обмотки НН – обмотка", ";"],
    correct: ["охлаждения", "низшего напряжения"],
    nextButton: false,
    img: "img1",
  },
  // Соответствие
  {
    id: "7",
    question: "8. Установите соответствие между типами режущих инструментов для токарных работ и их назначением <br><br><br>",
    options: ["продолжить"],
    correct: "продолжить",
    dnd: true,
    items: ['Отрезные резцы','Проходные резцы', 'Канавочные резцы', 'Расточные резцы'],
    droppable: [
    '1. Обработка цилиндрических, конических и фасонных поверхностей заготовки',
    '2. Сверление и рассверливание отверстий',
    '3. Обработка торцевых поверхностей и создание уступов на внешней стороне детали',
    '4. Обработка глухих и сквозных отверстий',
    '5. Протачивание канавок',
    '6. Обработка торцевых поверхностей и отрезка детали от заготовки',
    ],
    answers: ["0-5", "1-0", "2-4", "3-3"],
    nextButton: false
  },
  // Вставка пропущенных слов
  {
    id: "2",
    question: "3. Перенесите и вставьте пропущенные слова в тексте<br><br>",
    options: ["продолжить"],
    correct: "продолжить",
    dnd: true,
    items: ['гибкость','производительность', 'точность', 'трудозатраты'],
    droppable: ['В станке с ЧПУ совмещается ', 'универсального оборудования и высокая ', 'автоматического станка, его использование повышает ', 'обработки и сокращает', '.'],
    answers: ["0-0","1-1", "2-2", "3-3"],
    nextButton: false,
    line:true
  },
  // Выбрать один из вариантов
  {
    id: "11",
    question: "12. Выберите тип станка для токарной операции по изготовлению заданной детали в условиях серийного производства<br><br><p style=font-weight:normal;font-size:18px>Выберите единственно правильный ответ.</p><br>",
    options: ["Токарно-винторезный станок", "Токарно-револьверный станок", "Токарно-карусельный станок", "Токарно-фрезерный обрабатывающий центр", "Автомат продольного точения", 'Токарный станок с ЧПУ'],
    correct: "Токарный станок с ЧПУ",
    nextButton:true
  },
  // Выбрать несколько из вариантов
  {
    id: "12",
    question: "13. Выберите тип станка для токарной операции по изготовлению заданной детали в условиях серийного производства<br><br><br><br><p style=font-weight:normal;font-size:18px>Выберите все правильные ответы</p></br>",
    options: ["Токарно-винторезный станок", "Токарно-револьверный станок", "Токарно-карусельный станок", "Токарно-фрезерный обрабатывающий центр", "Автомат продольного точения", 'Токарный станок с ЧПУ'],
    correct: ["Токарный станок с ЧПУ","Токарно-револьверный станок"],
    nextButton:true
  },
]




// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  ЭОМ 3 - НЕ РАБОЧЕЕЕ
// {
//   id: 1,
//   type: "dragdrop", // TODO: Fix drag and drop NOT WORK
//   question: "<p style=font-size:18px>Установите соответствие между изображениями и видами режущего инструмента (100 баллов). ",
//   items: ['Резец','Фреза','Сверло','Метчик','Плашка'],
//   droppable: ["img6", "img7", "img8", "img9", "img10"],
//   answers: [],
//   cost: 100,
// },
// {
//   id: 2,
//   type: "dragline", // TODO: Fix drag and drop NOT WORK
//   question: "<p style=font-size:18px>Установите соответствие между изображениями и видами режущего инструмента (100 баллов). ",
//   items: ['Резец','Фреза','Сверло','Метчик','Плашка'],
//   droppable: ["img6", "img7", "img8", "img9", "img10"],
//   answers: [],
//   cost: 100,
// },