import { View } from "../../view";
import template from './player.html';

export class PlayerView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        this.setClick('btnPlay', () => {
            this.addStyleClass('musicDisk', 'active');
            this.setStyleAttr('musicNeedle', 'transform', 'rotateZ(0deg)');
        })
    }

}