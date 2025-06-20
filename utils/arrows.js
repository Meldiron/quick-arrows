class Arrows {
  COLOR_SAME = "3";
  COLOR_OPPOSITE = "5";
  COLOR_NEXT = "7";

  EASY_COLORS = [
    ...Array(8).fill(this.COLOR_SAME),
    ...Array(4).fill(this.COLOR_OPPOSITE),
    this.COLOR_NEXT,
  ];

  MEDIUM_COLORS = [
    ...Array(5).fill(this.COLOR_SAME),
    ...Array(2).fill(this.COLOR_OPPOSITE),
    this.COLOR_NEXT,
  ];

  HARD_COLORS = [this.COLOR_SAME, this.COLOR_OPPOSITE, this.COLOR_NEXT];

  list = [];

  render(scene, score) {
    while (this.list.length < 2) {
      this.list.push(this.#generate(score));
    }
    let i = 0;
    for (const arrow of this.list) {
      scene.setCell(1, 1 - i, arrow);
      i++;
    }
  }

  #generate(score) {
    const directions = ["up", "down", "left", "right"];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    let colors =
      score < 5
        ? this.EASY_COLORS
        : score < 10
          ? this.MEDIUM_COLORS
          : this.HARD_COLORS;

    const hasGreen = this.list.find((arrow) => arrow.color === this.COLOR_NEXT);
    if (hasGreen) {
      colors = colors.filter((color) => color !== this.COLOR_NEXT);
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let sprite = gameConfig.sprites[randomDirection];

    return {
      direction: randomDirection,
      color: randomColor,
      sprite: sprite.split("x").join(randomColor),
    };
  }

  getDirection(arrow) {
    if (arrow.color === this.COLOR_SAME) {
      return arrow.direction;
    } else if (arrow.color === this.COLOR_OPPOSITE) {
      switch (arrow.direction) {
        case "up":
          return "down";
        case "down":
          return "up";
        case "left":
          return "right";
        case "right":
          return "left";
      }
    } else if (arrow.color === this.COLOR_NEXT) {
      const nextArrow = this.list[this.list.indexOf(arrow) + 1];
      if (!nextArrow) {
        throw new Error("No next arrow found");
      }

      if (nextArrow.color === this.COLOR_SAME) {
        return nextArrow.direction;
      } else if (nextArrow.color === this.COLOR_OPPOSITE) {
        switch (nextArrow.direction) {
          case "up":
            return "down";
          case "down":
            return "up";
          case "left":
            return "right";
          case "right":
            return "left";
        }
      }
    } else {
      throw new Error("Unknown color: " + arrow.color);
    }
  }
}
