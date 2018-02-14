export default class Model {
  get urlQuestions() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlStats() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  async load() {
    try {
      const quests = await this.getQuestions();
      const stats = await this.getStats();
      return {quests, stats};
    } catch (err) {
        return err.message;
    }
  }

  async getQuestions() {
    const response = await fetch(this.urlQuestions);
    if (response.status === 200) {
      const questions = await response.json();
      return questions;
    }
  }

  async getStats() {
    const response = await fetch(this.urlStats);
    if (response.status === 200) {
      const stats = await response.json();
      return stats;
    } else return [];
  }

  send(data) {
    const body = JSON.stringify(data);

    return fetch(this.urlStats, {
      body,
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      }
    });
  }
}
