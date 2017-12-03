import Welcome from './modules/welcome/welcome-screen';
import Game from './modules/game/game-screen';
import Result from './modules/result/result-screen';
import {getHash} from './location';
import Model from './model';

class Application {
  init() {
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/oO`;
      }
    }();

    this.model.load()
      .then((data) => this.setup(data))
      .then(() => this.changeRoute())
      .catch(window.console.error);
  }

  setup(data) {
    this.routes = {
      '': new Welcome(),
      'game': new Game(data.quests),
      'result': new Result(data.stats)
    };

    window.onhashchange = () => {
      this.changeRoute();
    };
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
    const stateObj = JSON.stringify({
      state,
      status,
    });
    const encode = encodeURIComponent(stateObj);
    location.hash = `result=${encode}`;
  }
}

export default new Application();
