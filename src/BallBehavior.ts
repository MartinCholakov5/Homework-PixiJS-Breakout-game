import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

import { GameObject } from "./GameObject"

export class BallBehavior extends GameObjectBehavior {
    private ball: PIXI.Sprite;
    private velocity: number = 10;
    public keyPressed: boolean = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy() {
        this.ball.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.ball);
    }

    protected init(): void {
        this.createBall();
        this.setKeycallbackEvent();
    }
    private setKeycallbackEvent() {
        this.onKeyUp = this.onKeyUp.bind(this);
        window.addEventListener('keypress', this.onKeyUp);

    }
    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x221199);
        gfx.drawCircle(0, 0, 20);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.ball);
    }
    public BallRef() {
        const ballObjRef = this.gameObjRef;
        return ballObjRef;
    }


    public update(delta: number) {

        if (!this.keyPressed) {
            return;

        }
        if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {

            this.gameObjRef.x += this.velocity * delta;

        } else {
            this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width;
            this.keyPressed = false;
        }



    }
    private onKeyUp(e: any) {
        if (e.code === 'Space') {
            this.keyPressed = true;
        }
    }
    public stop(){
        this.velocity = 0;
    }


}