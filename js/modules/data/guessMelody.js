export const initialGame = Object.freeze({
  lives: 3,
  level: 0,
  time: 120,
});

export const levels = [
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        id: 1,
        imageSrc: ``,
        label: `Пелагея`,
      },
      {
        id: 2,
        imageSrc: ``,
        label: `Краснознаменная дивизия имени моей бабушки`,
      },
      {
        id: 3,
        imageSrc: ``,
        label: `Lorde`,
      },
    ],
    answer: [2],
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        id: 1,
        audio: ``,
      },
      {
        id: 2,
        audio: ``,
      },
      {
        id: 3,
        audio: ``,
      },
      {
        id: 4,
        audio: ``,
      },
    ],
    answer: [4],
  },
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        id: 1,
        imageSrc: ``,
        label: `Пелагея`,
      },
      {
        id: 2,
        imageSrc: ``,
        label: `Краснознаменная дивизия имени моей бабушки`,
      },
      {
        id: 3,
        imageSrc: ``,
        label: `Lorde`,
      },
    ],
    answer: [2],
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        id: 1,
        audio: ``,
      },
      {
        id: 2,
        audio: ``,
      },
      {
        id: 3,
        audio: ``,
      },
      {
        id: 4,
        audio: ``,
      },
    ],
    answer: [4],
  },
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        id: 1,
        imageSrc: ``,
        label: `Пелагея`,
      },
      {
        id: 2,
        imageSrc: ``,
        label: `Краснознаменная дивизия имени моей бабушки`,
      },
      {
        id: 3,
        imageSrc: ``,
        label: `Lorde`,
      },
    ],
    answer: [2],
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        id: 1,
        audio: ``,
      },
      {
        id: 2,
        audio: ``,
      },
      {
        id: 3,
        audio: ``,
      },
      {
        id: 4,
        audio: ``,
      },
    ],
    answer: [4],
  },
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        id: 1,
        imageSrc: ``,
        label: `Пелагея`,
      },
      {
        id: 2,
        imageSrc: ``,
        label: `Краснознаменная дивизия имени моей бабушки`,
      },
      {
        id: 3,
        imageSrc: ``,
        label: `Lorde`,
      },
    ],
    answer: [2],
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        id: 1,
        audio: ``,
      },
      {
        id: 2,
        audio: ``,
      },
      {
        id: 3,
        audio: ``,
      },
      {
        id: 4,
        audio: ``,
      },
    ],
    answer: [4],
  },
  {
    type: `artist`,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        id: 1,
        imageSrc: ``,
        label: `Пелагея`,
      },
      {
        id: 2,
        imageSrc: ``,
        label: `Краснознаменная дивизия имени моей бабушки`,
      },
      {
        id: 3,
        imageSrc: ``,
        label: `Lorde`,
      },
    ],
    answer: [2],
  },
  {
    type: `genre`,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        id: 1,
        audio: ``,
      },
      {
        id: 2,
        audio: ``,
      },
      {
        id: 3,
        audio: ``,
      },
      {
        id: 4,
        audio: ``,
      },
    ],
    answer: [4],
  }
];

export const stats = {
  time: 2,
  rightAnswers: 0,
  otherPlayersPercent: 80,
};

export const addLevel = (level) => {
  return level + 1;
};

export const setAnswer = (state, answer) => {
  const quest = state.levels[state.level];
  const correctAnswer = quest.answer;
  let game;
  if (isCorrectAnswer(correctAnswer, answer)) {
    game = setCorrectAnswerToStatistic(state);
  } else {
    game = setLives(state, state.lives - 1);
  }
  return game;
};

const isCorrectAnswer = (correctAnswer, answer) => {
  return answer.every((currentValue) => {
    return correctAnswer.indexOf(currentValue) >= 0;
  });
};

const setCorrectAnswerToStatistic = (state) => {
  const game = Object.assign({}, state);
  game.stats.rightAnswers += 1;
  return game;
};

export const setLives = (state, lives) => {
  if (lives < 0) {
    throw new RangeError(`Жизнь не может быть меньше нуля`);
  }

  const game = Object.assign({}, state);

  game.lives = lives;

  return game;
};

export const endGame = (state) => {
  if (state.lives === 0) {
    return `LOSE`;
  }

  if (!state.levels[state.level + 1]) {
    return `WIN`;
  }

  return null;
};

export const updateTime = (state, time) => {
  const game = Object.assign({}, state, {time});

  return game;
};
