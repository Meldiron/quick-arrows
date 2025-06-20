function openGameScene() {
  let score = 0;

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

          const correctAnswer = arrows.getDirection(arrows.list[0]);

          if (direction === correctAnswer) {
            score++;

            arrows.list.shift();
            arrows.render(scene, score);
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

  const timer = new Timer(scene);
  timer.onFinish = () => {
    gameOver([
      "You ran out of time. Your score was <8>" + score + "<8> points.",
    ]);
  };
  timer.start(score);

  const arrows = new Arrows();
  arrows.render(scene, score);

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
}
