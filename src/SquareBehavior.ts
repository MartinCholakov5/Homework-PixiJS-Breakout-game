import { GameObject } from "./GameObject"
import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'
import { emitKeypressEvents } from "readline";
import { BallBehavior } from "./BallBehavior";






export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 10;
    private ballObjRef: GameObject;
    private shouldMove: boolean = false;




    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true })
        this.gameObjRef.removeChild(this.square)
    }
    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }
    protected init(): void {
        this.createSquare()
    }
    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff99);
        gfx.drawRect(0, 0, 100, 100);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }
    private move(delta: number) {
        this.gameObjRef.x += delta * this.velocity;
        if (this.gameObjRef.x + this.gameObjRef.width > GameApplication.getApp().view.width) {
            this.gameObjRef.x = GameApplication.getApp().view.width - this.gameObjRef.width;
        }
    }
   

    public update(delta: number) {
        
        const ball = new PIXI.Rectangle(this.ballObjRef.x, this.ballObjRef.y, this.ballObjRef.width, this.ballObjRef.height)
        const square = new PIXI.Rectangle(this.gameObjRef.x, this.gameObjRef.y, this.gameObjRef.width, this.gameObjRef.height)
        if (ball.right >= square.left) {
            
            this.shouldMove = true;   
            (this.ballObjRef.getBehavior() as BallBehavior).stop()
                        
           
        }
        
        // if (this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
        //     this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
        //     this.destroy();
        //     wasHit = true;

        // }
        if (this.shouldMove) {
            this.move(delta);
            
            // this.ballObjRef.y += this.ballObjRef.y * delta;
            // this.ballObjRef.x += this.ballObjRef.x * delta;

        }           
            
    }
}