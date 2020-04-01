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
        this.setClick('three', () => {
            import('../tree/tree').then(module => {
                this.showViewIn(module.TreeView, routeView);
            });
        });
    }

}