customElements.define('view', WordCount, { extends: 'div' });
export class View extends HTMLDivElement {

    constructor() {
        super()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'view') {
            
        }
    }
}