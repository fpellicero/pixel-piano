import Phaser from "phaser";
import PowerUp, { EPowerUpType } from "./PowerUp";
import Paddle from "../Paddle";

const FRAME_KEY = "power-freeze.png";
export default class Freeze extends PowerUp {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, FRAME_KEY);

        this.Type = EPowerUpType.OFFENSIVE;
        scene.add.existing(this);
    }

    public Activate(paddle: Paddle) {
        paddle.setMaxVelocity(0);

        paddle.tint = 0xFFFFF;

        setTimeout(() => {
            paddle.clearTint();
            paddle.setMaxVelocity(paddle.speedX);
        }, 5000);

        this.destroy();
    }
}