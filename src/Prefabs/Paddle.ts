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
    public Bounce: Phaser.Tweens.Tween;
    public Color: "red" | "blue";


    private autoPlay: boolean;
    private balls: Balls;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private speedX = 750;
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
        this.setScale(1.5, 1);

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

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update (delta: number) {
        if (this.autoPlay) {
            this.IAControl();
        } else {
            this.manualControls()
        }
    }

    // TODO: Should make IA a bit worse. It never fails.
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

    private manualControls(): void {
        const { activePointer } = this.scene.input.mouse.manager;
        const { left, right } = this.cursors;
        

        if (activePointer.isDown) {
            this.touchControls();
            return;
        }

        if (left.isDown || right.isDown) { 
            this.keyboardControls();
            return; 
        }

        this.setVelocityX(0);
    }

    private touchControls(): void {
        const { activePointer } = this.scene.input.mouse.manager;

        const deadZone = {
            min: this.x - 15,
            max: this.x + 15,
        };

        if (activePointer.x > deadZone.min && activePointer.x < deadZone.max) { 
            this.setVelocityX(0);
            return;
         }

        if (activePointer.x > this.x) {
            this.setVelocityX(this.speedX);
        } else {
            this.setVelocityX(this.speedX * -1);
        }
    }

    private keyboardControls(): void {
        const { right } = this.cursors;

        if (right.isDown) {
            this.setVelocityX(this.speedX);
        } else {
            this.setVelocityX(this.speedX * -1);
        }
    }

    private getClosestBall(): Ball {
        const balls = (this.balls.children.entries as Ball[])
            .map((item) => ({ball: item, distance: Math.abs(this.y - item.y)}))
            .sort((a, b) => a.distance - b.distance)
            .map(({ball}) => ball);

        return balls[0];
    }
}