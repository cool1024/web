import { View } from '../../view';
import template from './home.html';
import './home.scss';

export class HomeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const routeView = this.getDom('view');
        this.setClick('tree', () => {
            import('../tree/tree').then(module => {
                this.showViewIn(module.TreeView, routeView);
            });
        });
        this.setClick('player', () => {
            import('../player/player').then(module => {
                this.showViewIn(module.PlayerView, routeView);
            });
        });
        this.setClick('cube', () => {
            import('../three/webgl').then(module => {
                this.showViewIn(module.WebGLView, routeView);
            });
        });
        this.setClick('form', () => {
            import('../form/form').then(module => {
                this.showViewIn(module.FormView, routeView);
            });
        });
    }
}