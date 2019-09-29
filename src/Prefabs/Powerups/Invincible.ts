import Phaser from "phaser";
import PowerUp, { EPowerUpType } from "./PowerUp";
import Paddle from "../Paddle";

const FRAME_KEY = "power-invincible.png";
export default class Invincible extends PowerUp {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, FRAME_KEY);

        this.Type = EPowerUpType.DEFENSIVE;
        scene.add.existing(this);
    }

    public Activate(paddle: Paddle) {
        const {scaleX, scaleY} = paddle;
        const activate = this.scene.add.tween({
            targets: paddle,
            props: {
                scale: 3,
            },
            duration: 500,
        });

        const deactivate = this.scene.add.tween({
            targets: paddle,
            props: {
                scaleX,
                scaleY
            },
            duration: 500,
            paused: true
        })
        
        setTimeout(() => deactivate.play(), 5000);

        

        this.destroy();
    }
}