import Phaser from "phaser";

const particleAssetKey = "particleStar";

export function StarsExplosionPreload(scene: Phaser.Scene) {
    scene.load.image(particleAssetKey, "assets/png/particleStar.png");
}

function StarsExplosion (scene: Phaser.Scene, x: number, y: number) {
    const particles = scene.add.particles(particleAssetKey);

    particles.createEmitter({
        x,
        y,
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

export default StarsExplosion;
