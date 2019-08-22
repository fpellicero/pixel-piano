import Phaser from "phaser";

export default class ProgressBar {  
    private width: number = 250;
    private heigth: number = 50;
    private textStyle = {
        font: "20px monospace",
        fill: "#FFF"
    };


    private x: number;
    private y: number;

    private progressBox: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;
    private loadingText: Phaser.GameObjects.Text;
    private currentAsset: Phaser.GameObjects.Text;

    constructor(private scene: Phaser.Scene) {

        this.x = (scene.cameras.main.width / 2) - (this.width/2);
        this.y = (scene.cameras.main.height / 2) - (this.heigth/2);
        
        this.progressBox = scene.add.graphics();
        this.progressBar = scene.add.graphics();

        this.progressBox.fillStyle(0xFFFFFFF, 1);
        this.progressBox.fillRect(
            this.x,
            this.y,
            this.width,
            this.heigth
        );

        this.loadingText = scene.make.text({
            x: this.x,
            y: this.y - this.heigth,
            text: "Loading...",
            style: this.textStyle,
        });

        scene.load.on("progress", (value) => {
            this.UpdateBar(value);
        });
        scene.load.on("fileprogress", (asset: any) => {
            this.setCurrentAsset(asset.src);
        })
        scene.load.on("complete", () => {
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.loadingText.destroy();
            this.currentAsset.destroy();
        })

    }

    private UpdateBar(progress: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffff, 1);
        this.progressBar.fillRect(
            this.x,
            this.y,
            this.width * progress,
            this.heigth
        );
    }

    private setCurrentAsset(assetName: string) {
        if (!this.currentAsset) {
            this.currentAsset = this.scene.make.text({
                x: this.x,
                y: this.y + this.heigth,
                text: this.currentAsset,
                style: this.textStyle
            })
        }else {
            this.currentAsset.text = assetName;
        }


    }
}