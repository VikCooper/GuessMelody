import Win from './win-view';
import Lose from './lose-view';
import app from '../../app';
import {showScreen} from '../util';
import {getHashObject} from '../../location';
import {setTime, getWinPersent} from '../data/guessMelody';

const view = {
  'WIN': Win,
  'LOSE': Lose
};

export default class ResultPresenter {
  constructor(stats) {
    this.view = null;
    this.stats = stats;
  }

  init() {
    const params = getHashObject(location.hash);
    const isEmptyParams = !Object.keys(params).length;

    this.state = isEmptyParams ? {} : params.state;
    this.isWin = isEmptyParams ? false : params.status;

    if (this.isWin) {
      this.state = setTime(this.state);
      this.state = getWinPersent(this.state, this.stats);
    }

    this.view = this.setView(this.isWin);

    this.view.onClick = () => {
      app.showWelcome();
    };

    showScreen(this.view);
  }

  setView(isWin) {
    if (isWin) {
      return new view.WIN(this.state);
    } else {
      return new view.LOSE(this.state);
    }
  }
}
