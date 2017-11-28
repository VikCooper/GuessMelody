import Welcome from './modules/welcome/welcome-screen';
import Game from './modules/game/game-screen';
import Result from './modules/result/result-screen';
import {getHash} from './location';

const route = {
  '': Welcome,
  'game': Game,
  'result': Result,
};

class Application {
  constructor() {
    window.onhashchange = () => {
      this.changeRoute();
    };
  }

  changeRoute() {
    const hash = getHash(location.hash);
    const presenter = new route[hash]();

    presenter.init();
  }

  init() {
    this.changeRoute();
  }

  showWelcome() {
    location.hash = ``;
  }

  showGame() {
    location.hash = `game`;
  }

  showResult(stats, status) {
    const stateObj = JSON.stringify({
      stats,
      status,
    });
    const encode = encodeURIComponent(stateObj);
    location.hash = `result=${encode}`;
  }
}

export default new Application();
