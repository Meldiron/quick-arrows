async function openWelcomeScene() {
  const scene = odyc.createGame({
    background: "#222529",   
  });
  
  const bestScore = +(localStorage.getItem("score") || "0");
  
  await scene.openMessage(
    `<5>Quick arrows<5>\n<6>(cognitive minigame)<6>\n\n\nBest score: ${bestScore}\n\n\n<2>Controls: WASD/Swipe<2>\n<2>Press SPACE to start.<2>`
  );
  
  openMenuScene();
}