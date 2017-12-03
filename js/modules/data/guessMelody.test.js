import assert from 'assert';
import {initialGame, setLives, setNextLevel} from './guessMelody';

describe(`guessMelody`, () => {
  const game = Object.assign({}, initialGame);
  const state = {game};

  describe(`setLives`, () => {
    it(`should set lives`, () => {
      assert(1, setLives(state, 1).lives);
      assert(2, setLives(state, 2).lives);
      assert(3, setLives(state, 3).lives);
    });

    it(`shouldn't allow set negative lives`, () => {
      const setNegativeLives = () => {
        setLives(state, -1);
      };
      assert.throws(setNegativeLives);
    });

    it(`should have 3 lives on start`, () => {
      assert.equal(initialGame.lives, 3);
    });
  });

  describe(`setNextLevel`, () => {
    it(`shouldn't allow set negative level`, () => {
      game.level = -2;
      assert.throws(() => setNextLevel(game));
    });

    it(`shouldn't allow set nonexistent level`, () => {
      game.level = 12;
      assert.throws(() => setNextLevel(game));
    });

    it(`should have 0 level on start`, () => {
      assert.equal(initialGame.level, 0);
    });
  });
});
