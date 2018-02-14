import Welcome from './modules/welcome/welcome-screen';
import Game from './modules/game/game-screen';
import Result from './modules/result/result-screen';
import {getHash} from './location';
import Model from './model';
import {preprocessToSend} from './modules/data/guessMelody';
import {Spinner} from 'spin.js';

class Application {
  init() {
    this.model = new class extends Model {
      get urlQuestions() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }

      get urlStats() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/vikcooper`;
      }
    };

    this.setup();
  }

  async setup() {
    const spinner = new Spinner().spin(document.querySelector(`.main`));
    const data = await this.model.load();
    spinner.stop();

    this.routes = {
      '': new Welcome(),
      'game': new Game(data.quests),
      'result': new Result(data.stats)
    };

    window.onhashchange = () => {
      this.changeRoute();
    };

    this.changeRoute();
  }

  changeRoute() {
    const hash = getHash(location.hash);
    const presenter = this.routes[hash];

    presenter.init();
  }

  showWelcome() {
    location.hash = ``;
  }

  showGame() {
    location.hash = `game`;
  }

  endGame(state, status) {
    const data = preprocessToSend(state);
    this.model.send(data);

    const stateObj = JSON.stringify({
      state,
      status,
    });

    const encode = encodeURIComponent(stateObj);
    location.hash = `result=${encode}`;
  }
}

export default new Application();
