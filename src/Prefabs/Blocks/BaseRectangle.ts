import Phaser from "phaser";
import StarsExplosion, { StarsExplosionPreload } from "../../Mechanics/Effects/StarsExplosion";


export default abstract class BaseRectangle extends Phaser.Physics.Arcade.Sprite {
    protected assetKey: string;
    
    
    public static Preload(scene: Phaser.Scene) {
        StarsExplosionPreload(scene);
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scale = 0;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.setImmovable(true);

        this.scene.add.tween({
            targets: this,
            delay: Math.random() * 1000,
            props: {
                scale: {
                    getStart: () => 0,
                    getEnd: () => 1,
                    ease: "Bounce"
                }
            },
            duration: Math.random() * 1000
        });
    }    

    destroy() {
        StarsExplosion(this.scene, this.x, this.y);

        super.destroy();
    }
}