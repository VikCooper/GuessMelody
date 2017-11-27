import welcome from './modules/welcome/welcome-screen';
import game from './modules/game/game-screen';
import result from './modules/result/result-screen';

const screen = {
  WELCOME: welcome,
  GAME: game,
  RESULT: result,
};

class Application {
  showWelcome() {
    screen.WELCOME.init();
  }

  showGame() {
    const newGame = new screen.GAME();
    newGame.init();
  }

  showResult(stats, status) {
    const newResult = new screen.RESULT(stats, status);
    newResult.init();
  }
}

export default new Application();
