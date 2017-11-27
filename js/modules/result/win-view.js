import AbstractView from '../view';

export default class WinView extends AbstractView {
  constructor(stats) {
    super();
    this.stats = stats;
  }

  get template() {
    return `
<section class="main main--result">
  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;${this.stats.time}&nbsp;минуты<br>вы&nbsp;отгадали ${this.stats.rightAnswers}&nbsp;мелодии</div>
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
