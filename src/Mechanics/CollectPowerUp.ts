import Phaser from "phaser";
import Paddle from "../Prefabs/Paddle";
import PowerUp from "../Prefabs/Powerups/PowerUp";

export default function CollectPowerUp(player: Paddle, powerUp: PowerUp) {
    // For now we don't allow multiple powerups at once
    if(player.powerUpActive) {
        powerUp.destroy();
    }
    
    powerUp.Activate(player);
}