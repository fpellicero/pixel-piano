import Ball from "../Prefabs/Ball";
import Paddle from "../Prefabs/Paddle";


function PaddleBallCollision(paddle: Paddle, ball: Ball) {
    paddle.Bounce.play();
        
    const collisionOffset = ball.x - paddle.x;
    
    ball.setVelocityX(ball.body.velocity.x + collisionOffset * 15);
    ball.Color = paddle.Color;
}

export default PaddleBallCollision;