import AbstractView from '../view';

export default class GenreView extends AbstractView {
  constructor(state) {
    super();
    this.level = state;
  }

  get template() {
    return `
<section class="main main--level main--level-genre">
  <h2 class="title">Выберите инди-рок треки</h2>
  <form class="genre">
    ${this.level.answers.map((answer) => `
      <div class="genre-answer">
      <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${answer.id}" id="a-${answer.id}">
        <label class="genre-answer-check" for="a-${answer.id}"></label>
      </div>
      `).join(``)}
    <button class="genre-answer-send" type="submit">Ответить</button>
  </form>
</section>`.trim();
  }

  bind() {
    const inputs = this.element.querySelectorAll(`input[type="checkbox"]`);
    const sendAnswer = this.element.querySelector(`.genre-answer-send`);
    sendAnswer.disabled = true;

    inputs.forEach((input) => {
      input.onchange = () => {
        if (input.checked) {
          sendAnswer.disabled = false;
        } else {
          sendAnswer.disabled = true;
        }
      };
    });

    sendAnswer.onclick = () => {
      const getAnswers = () => {
        return Array.from(inputs).filter((input) => {
          return input.checked;
        }).map((input) => {
          return +input.value;
        });
      };

      const answers = getAnswers();

      inputs.forEach((input) => {
        input.checked = false;
      });

      sendAnswer.disabled = true;
      this.onClick(answers);
    };
  }

  onClick(answer) {

  }

}
