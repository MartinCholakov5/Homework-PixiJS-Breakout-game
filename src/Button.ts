/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as PIXI from "pixi.js";

import { GameApplication } from "./GameApplication";

export class Button extends PIXI.Container {
    protected background: PIXI.Sprite;
    private text: PIXI.Text;
    private label: string;
    protected dispacher: PIXI.utils.EventEmitter


    constructor(label: string) {
        super();
        this.label = label;
        this.init();
    }
    public getDispacher(): PIXI.utils.EventEmitter {
        return this.dispacher;
    }

    protected init() {
        //GameApplication.getApp().renderer
        this.dispacher = new PIXI.utils.EventEmitter()
        this.createBackground();
        this.interactive = true;
        // this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);

        this.setInterativeCallbacks()
        this.createText()

    }
    private setInterativeCallbacks() {
        this.addListener('pointerdown', this.onPointerUp);
        this.addListener('pointerup', this.onPointerDown);
    }
    private createBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff)
        gfx.drawRoundedRect(0, 0, 200, 40, 10);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.background = new PIXI.Sprite(texture);
        this.addChild(this.background);

    }
    private createText() {
        this.text = new PIXI.Text(this.label, {
            fontFamily: 'Minecraft',
            fontSize: 20,
            fill: 0xffff00
        })
        this.text.anchor.set(0.5)
        this.text.x = this.background.width / 2;
        this.text.y = this.background.height / 2
        this.addChild(this.text)
    }
    protected onPointerUp() {
        console.log(this.background.tint)
        this.background.tint = 0xff0000;
        // override this ^
        // create a class that extends button on pointer down to change color with a different color 
        // open something
    }
    protected onPointerDown() {
        this.background.tint = 0xffffff;
    }
}

