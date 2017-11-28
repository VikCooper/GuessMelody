import App from '../../app';
import Artist from './artist-view';
import Genre from './genre-view';
import Timer from './timer-view';
import {showScreen} from '../util';
import {initialGame, levels, stats, endGame, addLevel, updateTime, setAnswer} from '../data/guessMelody';

const view = {
  artist: Artist,
  genre: Genre,
};

export default class GamePresenter {
  constructor() {
    this.game = initialGame;
    this.levels = levels;
    this.stats = stats;

    this.startTimer();
  }

  get state() {
    return Object.assign({}, this.game, {levels: this.levels}, {stats: this.stats});
  }

  init() {
    const currentLevel = this.levels[this.game.level];
    const LevelView = view[currentLevel.type];
    const level = new LevelView(currentLevel);

    level.onClick = (answer) => {
      const newState = setAnswer(this.state, answer);
      this.formatState(newState);
      this.nextLevel();
    };

    showScreen(level);
  }

  formatState(state) {
    this.game = {
      level: state.level,
      lives: state.lives,
      time: state.time,
    };
    this.levels = state.levels;
    this.stats = state.stats;
  }

  nextLevel() {
    const isEnd = endGame(this.state);

    if (isEnd) {
      document.querySelector(`.main-timer`).innerHTML = ``;
      App.showResult(this.stats, isEnd);
    } else {
      this.game.level = addLevel(this.game.level);
      this.init();
    }
  }

  startTimer() {
    const timer = new Timer(this.game.time);
    const container = document.querySelector(`.main-timer`);

    timer.finishGame = () => {
      document.querySelector(`.main-timer`).innerHTML = ``;
      App.showResult(this.stats, `LOSE`);
    };

    timer.updateTime = (animation) => {
      this.updateTime(animation.steps - animation.step);
    };

    container.appendChild(timer.element);
  }

  updateTime(newTime) {
    const newState = updateTime(this.state, newTime);

    this.formatState(newState);
  }

}
