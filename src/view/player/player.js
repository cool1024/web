import { View } from "../../view";
import template from './player.html';
import { interval } from "rxjs";

export class PlayerView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        this.setClick('btnPlay', () => {
            this.addStyleClass('musicDisk', 'active');
            this.setStyleAttr('musicNeedle', 'transform', 'rotateZ(0deg)');
        });
        interval(1000).subscribe(i => {
            console.log(i);
            this.setStyleAttr('musicBar', 'width', `${i++}%`);
        });
    }

}