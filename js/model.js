export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load() {
    return fetch(this.urlRead)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json()
            .then((quests) => {
              return this.getStats()
                .then((stats) => {
                  return {quests, stats};
                });
            });
        }

        throw new Error(`Server responded with an error`);
      })
      .catch(window.console.error);
  }

  getStats() {
    return window.fetch(`https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/vikcooper`)
      .then((response) => response.json())
      .catch((reject) => []);
  }

  send(data) {
    const body = JSON.stringify(data);

    return window.fetch(`https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/vikcooper`, {
      body,
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      }
    });
  }
}
