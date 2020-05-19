import { ViewManager } from "./view";

export class ViewComponent extends HTMLElement {

    static get observedAttributes() {
        return ['view'];
    }

    constructor() {
        super()
        this.manager = ViewManager.createManager();
        this.viewModules = {};
    }

    addViewModule(name, importPromise){
        this.viewModules[name] = importPromise;
    }

    addViewModules(viewModules) {
        viewModules.forEach(viewModule => {
            this.addViewModule(viewModule.name, viewModule.import);
        });
    }

    connectedCallback() {
        console.log('Added to page.');
    }

    disconnectedCallback() {
        console.log('Removed from page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name);
        if(name === 'view') {
            this.viewModules[newValue].then(module => {
                this.manager.showView(module[newValue], this);
            });
        }
    }
}