async function openInstructionsScene() {
  const scene = odyc.createGame({
    background: "#222529",
    dialogInternvalMs: 15,
  });

  await scene.openDialog(
    "Focus on arrow showed to you in the middle of the screen.",
  );
  await scene.openDialog(
    "If arrow is <3>blue<3>, go in the direction of the arrow.",
  );
  await scene.openDialog(
    "If arrow is <5>orange<5>, do the opposite direction.",
  );
  await scene.openDialog(
    "If arrow is <7>green<7>, do what the arrow above would want.",
  );
  await scene.openDialog("Game gets harder overtime. Good luck!");

  openMenuScene();
}
