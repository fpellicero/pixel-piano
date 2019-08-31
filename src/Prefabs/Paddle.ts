import Phaser from "phaser";

interface IPaddleOptions {
    autoPlay?: boolean;
    type?: "red" | "blue";
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
    public Bounce: Phaser.Tweens.Tween;
    public Color: "red" | "blue";

    constructor(scene: Phaser.Scene, x: number, y: number, {autoPlay = false, type = "red"}: IPaddleOptions = {}) {
        super(scene, x, y, Paddle.assetKeys[type]);
        this.autoPlay = autoPlay;
        this.Color = type;

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
}