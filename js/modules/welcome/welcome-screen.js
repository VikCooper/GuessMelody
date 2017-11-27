import WelcomeView from './welcome-view';
import {showScreen} from '../util';
import app from '../../app';

class WelcomePresenter {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    showScreen(this.view);

    this.view.onClick = () => {
      app.showGame();
    };
  }
}

export default new WelcomePresenter();
