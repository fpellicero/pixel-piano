import Phaser from "phaser";
import Balls from "./Balls";
import Ball from "./Ball";

interface IPaddleOptions {
    autoPlay?: boolean;
    type?: "red" | "blue";
    balls?: Balls
}

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    private static assetKeys = {
        red: "paddle-red",
        blue: "paddle-blue"
    };

    public static Preload(scene: Phaser.Scene) {
        scene.load.image(Paddle.assetKeys["red"], "assets/png/paddleRed.png");
        scene.load.image(Paddle.assetKeys["blue"], "assets/png/paddleBlue.png");
    }

    private autoPlay: boolean;
    private balls: Balls;
    public Bounce: Phaser.Tweens.Tween;
    public Color: "red" | "blue";

    constructor(scene: Phaser.Scene, x: number, y: number, {autoPlay = false, type = "red", balls}: IPaddleOptions = {}) {
        super(scene, x, y, Paddle.assetKeys[type]);

        if(autoPlay && !balls) {
            throw new Error("Paddle set to autoPlay without providing Balls reference.");
        }

        this.autoPlay = autoPlay;
        this.Color = type;
        this.balls = balls;

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
        if (this.autoPlay) {
            this.IAControl();
        } else {
            this.cursorControl()
        }
    }

    private IAControl (): void {
        const closestBall = this.getClosestBall();

        if(closestBall.x > this.x) {
            const ballOffset = closestBall.x - this.x;
            this.setVelocityX(10*ballOffset);
            return;
        }

        if(closestBall.x < this.x) {
            const ballOffset = this.x - closestBall.x;
            this.setVelocityX(-10*ballOffset);
            return;
        }

        this.setVelocityX(0);
    }

    private cursorControl(): void {
        this.setX(this.scene.input.mouse.manager.activePointer.x);
    }

    private getClosestBall(): Ball {
        const balls = (this.balls.children.entries as Ball[])
            .map((item) => ({ball: item, distance: Math.abs(this.y - item.y)}))
            .sort((a, b) => a.distance - b.distance)
            .map(({ball}) => ball);

        return balls[0];
    }
}