const questions = [
  {
    id: 0,
    type: "matchingImg",
    question: "<p style=font-size:18px>Укажите фактор, влияющий на выбор технологических приспособлений ( баллов). <br><br><p style=font-weight:normal;font-size:18px> Кликайте на вариант в верхней и соответствующий ему вариант в нижней строке. <br>Выбранные ответы перемещаются вправо. <br>Верные окрашиваются в зеленый, неверные в красный цвет. Баллы начисляются за полностью верный ответ.<br></br>",
    left: ['Резец','Фреза','Сверло','Метчик'],
    options: ["img6", "img7", "img8", "img9"],
    correct: [{'Резец': 'img6'}, {'Фреза': 'img7'}, {'Сверло':'img8'}, {'Метчик':'img9'}],
    cost: 100,
  },
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
  {
    id: 4,
    type: 'one_of',
    question: "<p style=font-size:18px>Укажите фактор, влияющий на выбор технологических приспособлений ( баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите единственно правильный ответ.</p><br></br> ",
    options: ["Тип производства", "Материал заготовки", "Твердость заготовки", "Использование СОЖ ", "Высота станка"],
    correct: "Тип производства",
    cost: 150,
  },
  {
    id: 6,
    type: 'many',
    question: '<p style=font-size:18px>Укажите типы микрометров ( баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите все правильные ответы</p> <br></br>',
    options: ['Гладкие','Рычажные','Поворотные','Листовые','Призматические','Наклонные','Цилиндрические'],
    correct: ['Гладкие','Рычажные','Листовые','Призматические'],
    cost: 200,
  },
  {
    id: 12,
    type: 'choice',
    question: '<p style=font-size:18px>Вставьте пропущенные слова, выбрав их из предложенного списка ( баллов)<br></br>',
    offer: 'Вылет электрода нагревается за счет теплоты, выделяемой по прохождению по нему тока по закону {0}',
    options: {0: ['Джоуля-Ленца', 'Д.Джоуль', 'В.Кориолиса']},
    correct: {0: 'Джоуля-Ленца'},
    cost: 250,
  },
  {
    id: 11,
    type: 'one_of',
    question: `<p style=font-size:18px>Определите показание прибора. (250 баллов). <br><br><p style=font-weight:normal;font-size:18px>Выберите единственно правильный ответ.</p><br><div style="width: 150%;display: flex;justify-content: center;"> <img src="../img/3_3/pribor_2.png" alt="diagram_signals.jpg"> </div><br><br>`,
    options: ["15 В", "17 В", "90 В В", "102 В"],
    correct: "102 В",
    cost: 250,
  },
  {
    id: 0,
    type: "optionText",
    question: "<p style=font-size:18px> Задание с текстом (100 баллов). <br><br>",
    options: ["Первый заяц", "был детнинец, ", "."],
    correct: ["недопонятый гений", "Глупый"],
    cost: 100,
  },
]








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