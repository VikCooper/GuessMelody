export const resetTimer = () => {
  document.querySelector(`.main-timer`).innerHTML = ``;
};

export const createElement = (template) => {
  const outer = document.createElement(`template`);
  outer.innerHTML = template;
  return outer.content.children[0];
};

const main = document.querySelector(`section.main`);

export const showScreen = (screen) => {
  main.innerHTML = ``;
  main.appendChild(screen.element);
};
