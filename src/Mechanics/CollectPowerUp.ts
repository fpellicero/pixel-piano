import Phaser from "phaser";
import Paddle from "../Prefabs/Paddle";
import PowerUp, { EPowerUpType } from "../Prefabs/Powerups/PowerUp";

const CollectPowerUp = (RedPaddle: Paddle, BluePaddle: Paddle) => (currentPaddle: Paddle, powerUp: PowerUp) => {
    // For now we don't allow multiple powerups at once
    if(currentPaddle.powerUpActive) {
        powerUp.destroy();
    }

    if (powerUp.Type === EPowerUpType.OFFENSIVE) {
        const paddleToActivate = currentPaddle.Color === "red"
            ? BluePaddle
            : RedPaddle;
        
        powerUp.Activate(paddleToActivate);
        return;
    }
    
    powerUp.Activate(currentPaddle);
}

export default CollectPowerUp;
