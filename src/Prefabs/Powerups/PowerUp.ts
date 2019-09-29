import Phaser from "phaser";
import Paddle from "../Paddle";

export enum EPowerUpType {
    OFFENSIVE,
    DEFENSIVE
}

export default abstract class PowerUp extends Phaser.Physics.Arcade.Sprite {
    public static ATLAS_KEY = "powerups";
    static Preload(scene: Phaser.Scene) {
        scene.load.multiatlas(PowerUp.ATLAS_KEY, "assets/png/powers.json", "assets/png");
    }

    public Type: EPowerUpType; 

    constructor(scene: Phaser.Scene, x: number, y: number, frame: string) {
        super(scene, x, y, PowerUp.ATLAS_KEY, frame);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }

    public Activate(paddle: Paddle) {
        throw new Error("You should override this method in your powerup");
    }

}



/*

Type: DEFENSIVE | OFFENSIVE
Activate(Paddle) 

*/