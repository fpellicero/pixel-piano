import Phaser from "phaser";
import BaseRectangle from "./BaseRectangle";

export default class RectangleGrey extends BaseRectangle {
    private static assetKey = "rectangle-grey";
    public static Preload(scene: Phaser.Scene) {
        scene.load.image(RectangleGrey.assetKey, "assets/png/element_grey_rectangle.png");
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, RectangleGrey.assetKey);
    }
}