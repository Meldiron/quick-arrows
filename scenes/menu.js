async function openMenuScene() {
  const scene = odyc.createGame({
    background: "#222529",
  });

  const responseIndex = await scene.prompt(
    "Play game",
    "Instructions",
    "Cancel",
  );

  switch (responseIndex) {
    case 0: // Play game
      openGameScene();
      break;
    case 1: // Instructions
      openInstructionsScene();
      break;
    case 2: // Cancel
      openWelcomeScene();
      break;
  }
}
