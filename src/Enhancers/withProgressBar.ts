import ProgressBar from "../Prefabs/ProgressBar";

export default function withProgressBar(scene: Function) {
    const oldPreload = scene.prototype.preload;
    scene.prototype.preload = function() {
        new ProgressBar(this);
        oldPreload.apply(this);
    }
}