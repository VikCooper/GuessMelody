import AbstractView from '../view';
import {setTime, getFormattedTimeText} from '../data/guessMelody';

export default class WinView extends AbstractView {
  constructor(stats) {
    super();
    this.stats = setTime(stats);
  }

  get template() {
    const timeText = getFormattedTimeText(this.stats.time);

    return `
<section class="main main--result">
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;${timeText}<br>вы&nbsp;отгадали ${this.stats.rightAnswers}&nbsp;мелодии</div>
  <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.stats.otherPlayersPercent}%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`.trim();
  }

  bind() {
    const replay = this.element.querySelector(`.main-replay`);
    replay.onclick = () => this.onClick();
  }

  onClick() {

  }

}
