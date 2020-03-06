import { View } from "../../view";
import template from './home.html';
import { TreeView } from "../tree/tree";
// import { WebGLView } from "../three/webgl";
// import { AudioView } from "../audio/audio";

export class HomeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const routeView = this.getDom('view');
        this.showViewIn(TreeView, routeView);
        // this.setClick('three', () => this.showViewIn(WebGLView, routeView));
        // this.setClick('audio', () => this.showViewIn(AudioView, routeView));
    }

}