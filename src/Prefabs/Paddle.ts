import Phaser from "phaser";
import Ball from "./Ball";

interface IPaddleOptions {
    autoPlay?: boolean;
}

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    private static assetKey = "paddle";

    public static Preload(scene: Phaser.Scene) {
        scene.load.image(Paddle.assetKey, "assets/png/paddleRed.png");
    }

    private autoPlay: boolean;
    private Bounce: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number, {autoPlay = false}: IPaddleOptions = {}) {
        super(scene, x, y, Paddle.assetKey);
        this.autoPlay = autoPlay;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);

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
        if(!this.autoPlay) {
            this.setX(this.scene.input.mouse.manager.activePointer.x);
        }
    }

    public Collision(paddle: Paddle, ball: Ball) {
        paddle.Bounce.play();
        
        const collisionOffset = ball.x - paddle.x;
        
        ball.setVelocityX(ball.body.velocity.x + collisionOffset * 15);
    }
}