

import { Button } from "./Button";

export class Button2 extends Button {
    constructor(label: string) {
        super(label);
    }
    protected init() {
        super.init();
    }

    protected onPointerUp() {
        super.onPointerUp;
        this.dispacher.emit('initBtnUp')
    }
    protected onPointerDown(){
        super.onPointerDown;
        this.dispacher.emit('initBtnDown')


    }
}
