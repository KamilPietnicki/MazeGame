import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import Player from "./player.js";
import TILES from "./tile-mapping.js";
import RoomShadow from "./room-shadow.js";

/**
 * Scene that generates a new dungeon
 */
export default class DungeonScene extends Phaser.Scene {
  preload() {
    this.load.image("tiles", "../assets/tilesets/maze_tiles.png");
    this.load.spritesheet(
      "player",
      "../assets/spritesheets/skellysprite.png",
      {
        frameWidth: 16,
        frameHeight: 16,
        margin: 0,
        spacing: 0,
      }
    );
  }

  create() {

    this.hasPlayerReachedStairs = false;

    const dungeon = new Dungeon({
      width: 50,
      height: 50,
      rooms: {
        width: { min: 7, max: 15 },
        height: { min: 7, max: 15 },
        maxRooms: 12
      }
    });

    // Create a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
      tileWidth: 48,
      tileHeight: 48,
      width: dungeon.width,
      height: dungeon.height
    });

    const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing
    const layer = map.createBlankDynamicLayer("Layer 1", tileset);


    const mappedTiles = dungeon.getMappedTiles({ empty: -1, floor: 6, door: 6, wall: 20 });
    layer.putTilesAt(mappedTiles, 0, 0);
    layer.setCollision(20); // We only need one tile index (the walls) to be colliding for now

    // Place the player in the center of the map.
    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2);

    // Add player collisions
    this.physics.add.collider(this.player.sprite, layer);

    // Camera following player character
    const camera = this.cameras.main;
    camera.startFollow(this.player.sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys to move", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    this.player.update();
  }
}