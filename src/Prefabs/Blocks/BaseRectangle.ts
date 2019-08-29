import Phaser from "phaser";
import StarsExplosion, { StarsExplosionPreload } from "../../Mechanics/Effects/StarsExplosion";


export default abstract class BaseRectangle extends Phaser.Physics.Arcade.Sprite {
    protected assetKey: string;
    
    
    public static Preload(scene: Phaser.Scene) {
        StarsExplosionPreload(scene);
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.setImmovable(true);
    }    

    destroy() {
        StarsExplosion(this.scene, this.x, this.y);

        super.destroy();
    }
}