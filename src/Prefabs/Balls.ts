import Phaser from "phaser";
import Ball from "./Ball";

export default class Balls extends Phaser.GameObjects.Group {

    constructor(scene: Phaser.Scene) {
        super(scene);

        const playerOneBall = new Ball(
            scene,
            scene.cameras.main.centerX,
            scene.cameras.main.height - 100    
        );
        const playerTwoBall = new Ball(
            scene,
            scene.cameras.main.centerX,
            100
        );

        this.addMultiple([
            playerOneBall,
            playerTwoBall
        ]);
    }


}