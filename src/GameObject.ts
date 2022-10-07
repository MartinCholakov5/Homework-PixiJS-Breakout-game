import * as PIXI from 'pixi.js';
import { GameObjectBehavior } from "./GameObjectBehavior"

export class GameObject extends PIXI.Container {
    private id: string;
    private behavior: GameObjectBehavior;
    constructor(id: string) {
        super();
        this.id = id;
        this.init();
    }
    private init() {
        this.behavior = null;
    }
    public getId(): string {
        return this.id;
    }
    public update(delta: number) {
        if(this.behavior != null){
    
        this.behavior.update(delta);
        }
    }
    public setBehavior (behavior: GameObjectBehavior) {

        this.behavior = behavior;
    }
    // public removeBehavior(id: string) {
    //     if (!this.behaviors.has(id)) {            
    //         return;
    //     }
    //     this.behaviors.get(id).destroy();
    //     this.behaviors.delete(id);

    // }
    public getBehavior(){
        return this.behavior
    }
}