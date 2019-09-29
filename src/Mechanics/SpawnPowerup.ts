import Phaser from "phaser";
import BaseRectangle from "../Prefabs/Blocks/BaseRectangle";
import PowerUp from "../Prefabs/Powerups/PowerUp";
import Invincible from "../Prefabs/Powerups/Invincible";
import Freeze from "../Prefabs/Powerups/Freeze";
import sample from "lodash/sample";

const availablePowerups = [
    Invincible,
    Freeze
]

export default function SpawnPowerup(scene: Phaser.Scene, rectangle: BaseRectangle): PowerUp {
    const shouldSpawn = Math.random() < rectangle.powerUpDropChance;

    if (!shouldSpawn) return null;

    const nextPowerUp = sample(availablePowerups);

    return new nextPowerUp(scene, rectangle.x, rectangle.y);
}