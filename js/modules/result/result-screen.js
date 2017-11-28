import Win from './win-view';
import Lose from './lose-view';
import app from '../../app';
import {showScreen} from '../util';
import {getHashObject} from '../../location';

const view = {
  'WIN': Win,
  'LOSE': Lose
};

export default class ResultPresenter {
  constructor() {
    const params = getHashObject(location.hash);
    const isEmptyParams = !Object.keys(params).length;

    this.status = params.status;
    this.stats = isEmptyParams ? {} : params.stats;
    this.view = new view[this.status](this.stats);
  }

  init() {
    this.view.onClick = () => {
      app.showGame();
    };

    showScreen(this.view);
  }
}
