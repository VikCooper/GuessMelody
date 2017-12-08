import app from '../../app';
import Artist from './artist-view';
import Genre from './genre-view';
import Timer from './timer-view';
import {showScreen} from '../util';
import {initialGame, updateTime, setAnswer, isEndOfGame, setNextLevel, preprocessToSend} from '../data/guessMelody';

const view = {
  artist: Artist,
  genre: Genre,
};

export default class Game {
  constructor(quests) {
    this.game = initialGame;
    this.quests = quests;
  }

  get state() {
    const game = Object.assign({}, this.game);
    const quests = Object.assign({}, this.quests);

    return Object.assign({}, {game}, {quests});
  }

  init() {
    this.game = initialGame;
    this.startTimer();
    this.continueGame();
  }

  continueGame() {
    const QuestView = this.getQuestView();
    const state = this.getQuestState(this.game.level);

    const questView = new QuestView(state);

    questView.onClick = (answer) => {
      this.onAnswer(answer);
      this.showNextLevel();
    };

    showScreen(questView);
  }

  getQuestView() {
    const quest = this.getQuestState(this.game.level);

    return view[quest.type];
  }

  getQuestState(level) {
    return this.quests[level];
  }

  showNextLevel() {
    const quest = this.getQuestState(this.game.level + 1);
    const endGame = isEndOfGame(this.game.lives, quest);

    if (endGame !== `not end`) {
      this.stopTimer();

      if (endGame === `lives`) {
        this.endGame(false);
      }

      if (endGame === `quests`) {
        this.endGame(true);
      }

    } else {
      this.game = setNextLevel(this.state);
      this.continueGame();
    }
  }

  startTimer() {
    const timer = new Timer(this.game.time);
    const container = document.querySelector(`.main-timer`);

    timer.finishGame = () => {
      this.stopTimer();
      this.endGame(false);
    };

    timer.updateTime = (animation) => {
      this.updateTime(animation.steps - animation.step);
    };

    container.appendChild(timer.element);
  }

  stopTimer() {
    document.querySelector(`.main-timer`).innerHTML = ``;
  }

  updateTime(newTime) {
    const newState = updateTime(this.state, newTime);

    this.updateState(newState);
  }

  onAnswer(answer) {
    const newState = setAnswer(this.state, answer);

    this.updateState(newState);
  }

  updateState(state) {
    this.game = state.game;
  }

  endGame(status) {
    const data = preprocessToSend(this.game);

    app.model.send(data);
    app.endGame(this.game, status);
  }
}
