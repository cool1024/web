import { View } from "../../view";
import template from './home.html';
import { WebGLView } from "../three/webgl";

export class HomeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        this.setClick('three', () => this.showView(WebGLView));
    }

}