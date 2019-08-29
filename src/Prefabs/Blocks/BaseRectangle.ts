import Phaser from "phaser";

export default abstract class BaseRectangle extends Phaser.Physics.Arcade.Sprite {
    protected assetKey: string;
    private static EXPLOSION_PARTICLE_KEY = "particleStar"
    
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(BaseRectangle.EXPLOSION_PARTICLE_KEY, "assets/png/particleStar.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        this.setImmovable(true);
    }    

    destroy() {
        this.Explosion();

        super.destroy();
    }

    private Explosion() {
        const particles = this.scene.add.particles(BaseRectangle.EXPLOSION_PARTICLE_KEY);

        particles.createEmitter({
            x: this.x,
            y: this.y,
            gravityY: 150,
            speedX: {
                min: -100,
                max: 100,
            },
            speedY: {
                min: -150,
                max: 0
            },
            maxParticles: 20,
            active: true
        });
    }
}