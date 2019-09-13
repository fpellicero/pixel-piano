import Phaser from "phaser";
import { IMenuOption } from "./IMenuOptions";
import "./Templates/MenuStyles.css";
// @ts-ignore
import template from "./Templates/MenuWrapper.ejs";
import GameScene from "../GameScene";

export default class MainMenu extends Phaser.Scene {

    private options: IMenuOption[] = [
        {
            key: "new-game",
            label: "New Game",
            action: () => this.startGame(),
            focused: false,
        },
        {
            key: "quit",
            label: "Quit",
            action: () => {},
            focused: false,
        }
    ]

    private menuElement: Element;

    public create() {
        this.menuElement = createHtmlElementFromString(template({items: this.options}));
        document.body.appendChild(this.menuElement);
        document.addEventListener("click", this.handleClick);

        this.events.on("shutdown", this.onDestroy);
    }

    private onDestroy = () => {
        // Asset cleanup
        this.menuElement.remove();
        document.removeEventListener("click", this.handleClick);
    }

    private handleClick = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if(!this.menuElement.contains(target)) {
            return;
        }

        const targetKey = target.dataset["key"];

        if(!targetKey) {
            return;
        }

        const optionClicked = this.options.find(({key}) => targetKey === key);

        if(!optionClicked) {
            return;
        }

        optionClicked.action();
    }

    private startGame() {
        this.scene.add(
            GameScene.key,
            new GameScene(GameScene.key),
            false
        );

        this.scene.start(GameScene.key);
    }

}


function createHtmlElementFromString(html: string): Element {
    const root = document.createElement("div");

    root.innerHTML = html;

    return root.children.item(0);
}