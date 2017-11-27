import assert from 'assert';
import {initialGame, addLevel, isCorrectAnswer, endGame} from './guessMelody';

describe(`guessMelody`, () => {
  describe(`addLevel`, () => {
    it(`should add level`, () => {
      assert(2, addLevel(1));
    });
  });

  describe(`isCorrectAnswer`, () => {
    it(`should be an error`, () => {
      const setIncorrectAnswer = () => {
        isCorrectAnswer([2, 3], [4]);
      };
      assert.throws(setIncorrectAnswer);
    });
  });

  describe(`endGame`, () => {
    it(`should be lose`, () => {
      const testGame = Object.assign({}, initialGame);
      testGame.lives = 0;
      assert(`LOSE`, endGame(testGame));
    });
  });

});
