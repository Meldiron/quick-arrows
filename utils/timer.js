class Timer {
  onFinish;

  #timeLeft; // max 21
  #timer;
  #scene;

  constructor(scene) {
    this.#scene = scene;
    requestAnimationFrame(() => this.#renderTick());
  }

  start(score) {
    this.#timeLeft = 21;

    this.#render();

    const speed = this.#getTimerSpeed(score);

    if (this.#timer) {
      clearInterval(this.#timer);
      this.#timer = null;
    }

    this.#timer = setInterval(() => {
      this.#tick();
    }, speed);
  }

  end() {
    if (this.#timer) {
      clearInterval(this.#timer);
      this.#timer = null;
    }
  }

  #renderTick() {
    if (!this.#timer) {
      return;
    }

    this.#render();

    setTimeout(() => {
      requestAnimationFrame(() => this.#renderTick());
    }, 100);
  }

  #tick() {
    this.#timeLeft--;
    if (this.#timeLeft <= 0) {
      if (this.#timer) {
        clearInterval(this.#timer);
        this.#timer = null;
      }

      if (this.onFinish) {
        this.onFinish();
      }
    }
  }

  #render() {
    for (let i = 0; i < 3; i++) {
      const startingJ = i * 7 + 1;
      const colors = [];

      for (let j = startingJ; j <= startingJ + 7; j++) {
        const color = j <= this.#timeLeft ? "1" : "0";
        colors.push(color);
      }

      this.#scene.setCell(i, 2, {
        sprite: `
                .......
                .......
                .......
                .......
                .......
                .......
                ${colors.join("")}
                `,
      });
    }
  }

  #getTimerSpeed(score) {
    let timerSpeed =
      score < 5
        ? 250
        : score < 10
          ? 200
          : score < 15
            ? 150
            : score < 20
              ? 100
              : score < 80
                ? 70
                : null;

    if (timerSpeed === null) {
      timerSpeed =
        score < 150
          ? 60
          : score < 200
            ? 50
            : score < 250
              ? 40
              : score < 300
                ? 30
                : 20;
    }

    return timerSpeed;
  }
}
