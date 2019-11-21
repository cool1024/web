export class View {

    static createView(viewType, parentNode) {
        const view = new viewType;
        view.renderView(parentNode);
        view.initView();
        view.doHandler();
    }

    constructor() {
        this.handlers = [];
    }

    setTemplate(htmlStr) {
        this.templateStr = htmlStr;
    }

    renderView(parentNode) {
        const tempDom = document.createElement('div');
        tempDom.innerHTML = this.templateStr;
        for (let i = 0; i < tempDom.children.length; i++) {
            parentNode.appendChild(tempDom.children[i]);
        }
        this.nativeDom = parentNode;
    }

    initView() { }

    bindHandler(handler) {
        this.handlers.push(handler);
    }

    doHandler() {
        this.handlers.forEach(handler => handler());
    }

    getDom(id) {
        return document.getElementById(id);
    }

    appendDom(dom) {
        this.nativeDom.appendChild(dom);
    }
}