# Quick Arrows 🎯

**A cognitive brain training minigame that challenges your reaction time and mental agility.**

Quick Arrows is an engaging brain training game that tests your ability to quickly process visual information and make split-second decisions. The game progressively increases in difficulty, making it perfect for improving cognitive flexibility and reaction speed.

🎮 **[Play Online](https://quick-arrows.appwrite.network/)**

## 🧠 How to Play

The goal is simple: respond to arrows by pressing the correct direction key (WASD) or swiping on mobile devices. But here's the twist - the color of the arrow determines what action you need to take:

### Arrow Rules

- **🔵 Blue Arrow**: Press the direction the arrow is pointing
- **🟠 Orange Arrow**: Press the OPPOSITE direction of where the arrow is pointing
- **🟢 Green Arrow**: Look at the arrow above and respond as if that arrow were blue or orange

### Controls

- **Desktop**: Use WASD keys (W=Up, A=Left, S=Down, D=Right)
- **Mobile**: Swipe in the correct direction

## 🎯 Scoring & Difficulty

- Each correct response earns you 1 point
- The game starts easy but gets progressively harder as your score increases
- Timer speed increases with higher scores
- Arrow color distribution becomes more challenging over time
- **Score of 100+ is considered excellent performance**

### Difficulty Progression

- **Score 0-4**: Mostly blue arrows with some orange
- **Score 5-9**: Moderate mix of blue, orange, and occasional green
- **Score 10+**: Equal distribution of all arrow types with faster timing

## 🛠️ Technical Details

Quick Arrows is built using:
- **Odyc.js** - A lightweight JavaScript game framework
- Pure JavaScript (ES6+)
- HTML5 Canvas for rendering
- Local storage for high score tracking

### Project Structure

```
quick-arrows/
├── index.html          # Main HTML file
├── assets.js           # Game sprites and configuration
├── scenes/             # Game scenes
│   ├── welcome.js      # Welcome screen
│   ├── menu.js         # Main menu
│   ├── instructions.js # Tutorial/instructions
│   └── game.js         # Main game logic
├── utils/              # Utility classes
│   ├── arrows.js       # Arrow generation and logic
│   └── timer.js        # Game timer system
└── screenshots/        # Game screenshots
```

## 🎮 Game Features

- **Progressive Difficulty**: Game becomes more challenging as you improve
- **High Score Tracking**: Your best score is saved locally
- **Responsive Design**: Works on both desktop and mobile devices
- **Visual Timer**: Color-coded timer bar shows remaining time
- **Clear Instructions**: Built-in tutorial explains all game mechanics

## 🚀 Running Locally

1. Clone the repository
2. Open `index.html` in a web browser
3. Start playing!

No build process or dependencies required - just open and play!

## 📱 Screenshots

The game features a clean, minimalist design with:
- Dark theme for reduced eye strain
- Clear, colorful arrows for easy recognition
- Visual timer indication
- Score tracking and best score display

## 🏆 Tips for High Scores

1. **Start Slow**: Focus on accuracy over speed initially
2. **Practice Green Arrows**: These are the most challenging - practice looking ahead
3. **Stay Calm**: Don't panic when the timer gets faster
4. **Develop Patterns**: Try to recognize common arrow sequences
5. **Take Breaks**: Cognitive fatigue can hurt performance

## 🧪 Cognitive Benefits

Quick Arrows helps train several cognitive abilities:
- **Reaction Time**: Faster response to visual stimuli
- **Cognitive Flexibility**: Switching between different rule sets
- **Working Memory**: Remembering rules while processing information
- **Attention Control**: Maintaining focus under time pressure
- **Pattern Recognition**: Identifying sequences and relationships

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

**Ready to test your reflexes? [Start playing now!](https://quick-arrows.appwrite.network/)**