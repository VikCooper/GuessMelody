import AbstractView from '../view';

export default class ArtistView extends AbstractView {
  constructor(state) {
    super();
    this.level = state;
  }

  get template() {
    return `
<section class="main main--level main--level-artist">
  <div class="main-wrap">
    <h2 class="title main-title">${this.level.title}</h2>
    <div class="player-wrapper"></div>
    <form class="main-list">
      ${this.level.answers.map((answer) =>
        `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="${answer.id}" name="answer" value="${answer.id}" />
          <label class="main-answer" for="${answer.id}">
            <img class="main-answer-preview" src="${answer.imageSrc}">
            ${answer.label}
          </label>
        </div>`
      ).join(``)}
    </form>
  </div>
</section>`.trim();
  }

  bind() {
    const answers = this.element.querySelectorAll(`.main-answer-r`);
    Array.from(answers).forEach((answer) => {
      answer.onclick = (e) => this.onClick([+e.target.value]);
    });
  }

  onClick(answer) {

  }

}
