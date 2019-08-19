import Phaser from "phaser";
import Ball from "./Ball";

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    private static assetKey = "paddle";

    public static Preload(scene: Phaser.Scene) {
        scene.load.image(Paddle.assetKey, "assets/png/paddleRed.png");
    }

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private velocity = 1000;
    private Bounce: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Paddle.assetKey);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.Bounce = this.scene.add.tween({
            targets: this,
            props: {
                y: {
                    value: this.body.y + 10,
                    duration: 30,
                    yoyo: true
                }
            },
            paused: true,
        });
    }

    update (delta: number) {
        this.setX(this.scene.input.mouse.manager.activePointer.x);

        // TODO: Make cursor controls
        if (this.cursors.left.isDown) {
            this.setVelocityX(this.velocity * -1);
        }else if (this.cursors.right.isDown) {
            this.setVelocityX(this.velocity);
        }else {
            this.setVelocity(0);
        }

    }

    public Collision(paddle: Paddle, ball: Ball) {
        paddle.Bounce.play();
        
        const collisionOffset = ball.x - paddle.x;
        
        ball.setVelocityX(collisionOffset * 15);
    }
}