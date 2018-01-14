import WelcomeView from './welcome-view';
import {showScreen, initializeTimer} from '../util';
import App from '../../app';

export default class WelcomePresenter {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    initializeTimer();
    showScreen(this.view);

    this.view.onClick = () => {
      App.showGame();
    };
  }
}
