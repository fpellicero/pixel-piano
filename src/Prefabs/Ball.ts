import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
    private static assetKey = "ball";

    public static Preload(scene: Phaser.Scene) {
        scene.load.image(Ball.assetKey, "assets/png/ballGrey.png");
    }

    public Color: "red" | "blue";
    private speedY = 500;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Ball.assetKey);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setBounce(1);
        this.setVelocityY(this.speedY);
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(1000, 500);

        this.setDragX(50);
    }
}