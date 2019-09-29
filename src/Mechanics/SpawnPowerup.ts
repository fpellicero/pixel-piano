import Phaser from "phaser";
import BaseRectangle from "../Prefabs/Blocks/BaseRectangle";
import PowerUp from "../Prefabs/Powerups/PowerUp";
import Invincible from "../Prefabs/Powerups/Invincible";

export default function SpawnPowerup(scene: Phaser.Scene, rectangle: BaseRectangle): PowerUp {
    const shouldSpawn = Math.random() < rectangle.powerUpDropChance;

    return shouldSpawn 
        ? new Invincible(scene, rectangle.x, rectangle.y)
        : null;
}