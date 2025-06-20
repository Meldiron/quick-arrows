// TODO: Move most of it to utils/arrows.js

const COLOR_SAME = "3";
const COLOR_OPPOSITE = "5";
const COLOR_NEXT = "7";

const easyColors = [
  ...Array(8).fill(COLOR_SAME),
  ...Array(4).fill(COLOR_OPPOSITE),
  COLOR_NEXT,
];
const mediumColors = [
  ...Array(5).fill(COLOR_SAME),
  ...Array(2).fill(COLOR_OPPOSITE),
  COLOR_NEXT,
];
const hardColors = [COLOR_SAME, COLOR_OPPOSITE, COLOR_NEXT];

function openGameScene() {
  let score = 0;
  let arrows = []; // lowest on screen = in array first

  const scene = odyc.createGame({
    dialogInternvalMs: 15,
    background: "#222529",
    cellWidth: 7,
    cellHeight: 7,
    screenWidth: 3,
    screenHeight: 3,
    map: `
        ca.
        .a.
        ttt
        `,
    player: {
      sprite: `
        aa...aa
        a.....a
        .......
        .......
        .......
        a.....a
        aa...aa
      `,
      position: [1, 1],
    },
    templates: {
      a: {
        solid: false,
        sprite: 0,
      },
      t: {
        solid: false,
        sprite: `
                .......
                .......
                .......
                .......
                .......
                .......
                1111111
            `,
      },
      c: {
        visible: false,
        onTurn: () => {
          const pos = scene.player.position;
          scene.player.position = [1, 1];

          let direction;
          if (pos[0] === 0 && pos[1] === 1) {
            direction = "left";
          } else if (pos[0] === 2 && pos[1] === 1) {
            direction = "right";
          } else if (pos[0] === 1 && pos[1] === 0) {
            direction = "up";
          } else if (pos[0] === 1 && pos[1] === 2) {
            direction = "down";
          } else {
            alert("Wrong direction");
          }

          const correctAnswer = getCorrectAnswer(arrows[0]);

          if (direction === correctAnswer) {
            arrows.shift();
            renderArrows();
            score++;
            timer.start(score);
          } else {
            gameOver([
              `You pressed <8>${direction}<8>, but the correct action was <8>${correctAnswer}<8>.`,
              `Your score was <8>${score}<8> points. Thanks for playing.`,
            ]);
          }
        },
      },
    },
  });

  function renderArrows() {
    while (arrows.length < 2) {
      arrows.push(createRandomArrow());
    }
    let i = 0;
    for (const arrow of arrows) {
      scene.setCell(1, 1 - i, arrow);
      i++;
    }
  }

  function createRandomArrow() {
    const directions = ["up", "down", "left", "right"];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    let colors =
      score < 5 ? easyColors : score < 10 ? mediumColors : hardColors;

    const hasGreen = arrows.find((arrow) => arrow.color === COLOR_NEXT);
    if (hasGreen) {
      colors = colors.filter((color) => color !== COLOR_NEXT);
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let sprite = gameConfig.sprites[randomDirection];

    return {
      direction: randomDirection,
      color: randomColor,
      sprite: sprite.split("x").join(randomColor),
    };
  }

  function getCorrectAnswer(arrow) {
    if (arrow.color === COLOR_SAME) {
      return arrow.direction;
    } else if (arrow.color === COLOR_OPPOSITE) {
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
    } else if (arrow.color === COLOR_NEXT) {
      const nextArrow = arrows[arrows.indexOf(arrow) + 1];
      if (!nextArrow) {
        throw new Error("No next arrow found");
      }

      if (nextArrow.color === COLOR_SAME) {
        return nextArrow.direction;
      } else if (nextArrow.color === COLOR_OPPOSITE) {
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

  const timer = new Timer(scene);
  timer.onFinish = () => {
    gameOver([
      "You ran out of time. Your score was <8>" + score + "<8> points.",
    ]);
  };
  timer.start(score);

  async function gameOver(msgs) {
    timer.end();

    const bestScore = +(localStorage.getItem("score") || "0");
    if (score > bestScore) {
      localStorage.setItem("score", `${score}`);
    }

    for (const msg of msgs) {
      await scene.openDialog(msg);
    }

    if (score > bestScore) {
      localStorage.setItem("score", `${score}`);
      await scene.openDialog(
        `Your new best score is <8>${score}<8>, from previous <8>${bestScore}<8> points.`,
      );
    }

    openMenuScene();
  }

  renderArrows();
}
