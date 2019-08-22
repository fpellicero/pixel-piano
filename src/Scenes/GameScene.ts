import Phaser from "phaser";
import Paddle from "../Prefabs/Paddle";
import Ball from "../Prefabs/Ball";
import BaseRectangle from "../Prefabs/Blocks/BaseRectangle";
import Rectangles from "../Prefabs/Blocks";
import withProgressBar from "../Enhancers/withProgressBar";

@withProgressBar
export default class GameScene extends Phaser.Scene {

    private Paddle: Paddle;
    private Ball: Ball;

    public preload() {        
        Paddle.Preload(this);
        Ball.Preload(this);
        Rectangles.forEach((rectangle) => rectangle.Preload(this));
    }

    public create() {
        const centerX = parseInt(this.game.config.width as string)/2;
        const paddleY = parseInt(this.game.config.height as string) - 200;

        this.Paddle = new Paddle(this, centerX, paddleY);

        this.Ball = new Ball(this, centerX, paddleY + 100);

        this.physics.add.collider(this.Paddle, this.Ball, this.Paddle.Collision);

        this.generateRectangles();
    }

    public update(time: number, delta: number) {
        this.Paddle.update(delta);
    }

    private generateRectangles() {
        const rows = 10;
        const blocksPerRow = 12;

        const blockSize = {
            width: 64,
            height: 32
        }

        const rectangles: BaseRectangle[] = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < blocksPerRow; j++) {
                const x = blockSize.width / 2 + blockSize.width * j;
                const y = blockSize.height / 2 + blockSize.height * i;

                const rectangle = Rectangles[Math.floor(Math.random() * Rectangles.length)];
                rectangles.push(new rectangle(this, x, y));
                
            }
        }

        rectangles.forEach((rectangle) => {
            this.physics.add.collider(this.Ball, rectangle, this.onBallCollision);
        })
    }

    onBallCollision(Ball: Ball, rectangle: BaseRectangle) {
        rectangle.destroy();
    }
}