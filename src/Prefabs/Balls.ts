import Phaser from "phaser";
import Ball from "./Ball";

export default class Balls extends Phaser.GameObjects.Group {

    constructor(scene: Phaser.Scene) {
        super(scene);

        const blueBallPosition = this.blueBallPosition();
        const playerOneBall = new Ball(
            scene,
            blueBallPosition.x,
            blueBallPosition.y
        );

        const redBallPosition = this.redBallPosition();
        const playerTwoBall = new Ball(
            scene,
            redBallPosition.x,
            redBallPosition.y
        );

        this.addMultiple([
            playerOneBall,
            playerTwoBall
        ]);
    }

    public removeCallback = (ball: Ball) => {
        const {x, y} = ball.Color === "blue"
            ? this.blueBallPosition()
            : this.redBallPosition();

        this.add(new Ball(this.scene, x, y));
    }

    private redBallPosition = () => ({
        x: this.scene.cameras.main.centerX,
        y: this.scene.cameras.main.height - 300
    });

    private blueBallPosition = () => ({
        x: this.scene.cameras.main.centerX,
        y: 300
    });


}