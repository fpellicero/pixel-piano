import Phaser from "phaser";
import { PlayerScore } from "../RegistryKeys";

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
        
        this.setCollideWorldBounds(true);        

        this.setMaxVelocity(700, 500);

        this.setDragX(50);

        this.scene.add.tween({
            targets: this,
            props: {
                scale: {
                    value: 2,
                    duration: 500,
                    yoyo: true,
                },
            },
            repeat: 2,
            onComplete: () => this.setVelocityY(this.speedY)
        });      
    }

    public update() {
        const isOutsideWorld = this.y < 0 || this.y > this.scene.cameras.main.height;
        if(isOutsideWorld) {
            this.destroy();
        }
    }

    public destroy() {
        const playerAtFault = this.y < 0 ? "blue" : "red";
        
        const currentScore = this.scene.registry.get(PlayerScore(playerAtFault));
        this.scene.registry.set(PlayerScore(playerAtFault), currentScore - 5);

        this.scene.cameras.main.shake();

        // TODO: Some dramatic sound maybe?

        super.destroy();
    }
}