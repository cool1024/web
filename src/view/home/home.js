import { View } from '../../view';
import template from './home.html';
import './home.scss';

export class HomeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const routeView = this.getDom('homeRouteView');
        routeView.addViewModules([
            {name: 'TreeView', import: import('../tree/tree')},
            {name: 'PlayerView', import: import('../player/player')},
            {name: 'WebGLView', import: import('../three/webgl')},
            {name: 'FormView', import: import('../form/form')},
            {name: 'AudioView', import: import('../audio/audio')},
            {name: 'BannerView', import: import('../banner/banner')},
        ])

        this.setClick('tree', () => {
            routeView.setAttribute('view', 'TreeView');
        });
        this.setClick('player', () => {
            routeView.setAttribute('view', 'PlayerView');
        });
        this.setClick('cube', () => {
            routeView.setAttribute('view', 'WebGLView');
        });
        this.setClick('form', () => {
            routeView.setAttribute('view', 'FormView');
        });
        this.setClick('sound',() => {
            routeView.setAttribute('view', 'AudioView');
        });
        this.setClick('banner',() => {
            routeView.setAttribute('view', 'BannerView');
        });
        routeView.setAttribute('view', 'BannerView');
    }
}