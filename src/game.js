import Phaser from "phaser";
import DungeonScene from "./maze.js";

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    backgroundColor: "#000",
    parent: "game-container",
    pixelArt: true,
    scene: DungeonScene,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 }
      }
    }
  };

  const game = new Phaser.Game(config);