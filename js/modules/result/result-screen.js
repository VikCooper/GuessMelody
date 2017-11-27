import Win from './win-view';
import Lose from './lose-view';
import app from '../../app';
import {showScreen} from '../util';

const view = {
  'WIN': Win,
  'LOSE': Lose
};

export default class ResultPresenter {
  constructor(stats, status) {
    this.view = new view[status](stats);
  }

  init() {
    this.view.onClick = () => {
      app.showGame();
    };

    showScreen(this.view);
  }
}
