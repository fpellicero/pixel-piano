import Phaser from "phaser";

export default abstract class BaseRectangle extends Phaser.Physics.Arcade.Sprite {
    protected assetKey: string;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.setImmovable(true);
    }    
}