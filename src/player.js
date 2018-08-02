export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
  
      const anims = scene.anims;
      anims.create({
        key: "player-walk-down",
        frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      });

      anims.create({
        key: "player-walk-left",
        frames: anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
      });

      anims.create({
        key: "player-walk-right",
        frames: anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
      });

      anims.create({
        key: "player-walk-up",
        frames: anims.generateFrameNumbers("player", { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1
      });
  
      this.sprite = scene.physics.add
        .sprite(x, y, "player", 0)
        .setSize(16, 16)
        .setOffset(0, 0);
  
      this.sprite.anims.play("player-walk-up");
  
      this.keys = scene.input.keyboard.createCursorKeys();
    }
  
    freeze() {
      this.sprite.body.moves = false;
    }
  
    update() {
      const keys = this.keys;
      const sprite = this.sprite;
      const speed = 200;
      const prevVelocity = sprite.body.velocity.clone();
  
      // Stop any previous movement from the last frame
      sprite.body.setVelocity(0);
  
      // Horizontal movement
      if (keys.left.isDown) {
        sprite.body.setVelocityX(-speed);
        sprite.setFlipX(true);
      } else if (keys.right.isDown) {
        sprite.body.setVelocityX(speed);
        sprite.setFlipX(false);
      }
  
      // Vertical movement
      if (keys.up.isDown) {
        sprite.body.setVelocityY(-speed);
      } else if (keys.down.isDown) {
        sprite.body.setVelocityY(speed);
      }
  
      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      sprite.body.velocity.normalize().scale(speed);
  
      // Update the animation last and give left/right/down animations precedence over up animations
      if (keys.down.isDown) {
        sprite.anims.play("player-walk-down", true);
      } 

      else if (keys.left.isDown) {
        sprite.anims.play("player-walk-left", true);
      } 

      else if (keys.right.isDown) {
        sprite.anims.play("player-walk-right", true);
      } 
      
      else if (keys.up.isDown) {
        sprite.anims.play("player-walk-up", true);
      } 
      
      else {
        sprite.anims.stop();
  
        // If we were moving & now we're not, then pick a single idle frame to use
        if (prevVelocity.y < 0) sprite.setTexture("player", 4);
        else sprite.setTexture("player", 2);
      }
    }
  
    destroy() {
      this.sprite.destroy();
    }
  }
  