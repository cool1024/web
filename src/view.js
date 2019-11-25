export class ViewManager {

    static createManager() {
        return new ViewManager();
    }

    showView(viewType, parentNode) {
        if (this.activeView) {
            this.activeView.destroy();
        }
        this.activeView = View.createView(viewType, parentNode);
        this.activeView.manager = this;
    }
}

export class View {

    static createView(viewType, parentNode) {
        const view = new viewType;
        view.renderView(parentNode);
        view.initView();
        view.doHandler();
        return view;
    }

    constructor() {
        this.handlers = [];
    }

    setTemplate(htmlStr) {
        this.templateStr = htmlStr;
    }

    renderView(parentNode) {
        parentNode.innerHTML = this.templateStr;
        // const tempDom = document.createElement('div');
        // tempDom.innerHTML = this.templateStr;
        // console.log(tempDom.children);
        // for (let i = 0; i < tempDom.children.length; i++) {
        //     parentNode.appendChild(tempDom.children[i]);
        //     console.log(111);
        // }
        this.nativeDom = parentNode;
    }

    initView() { }

    destroy() {
        this.nativeDom.innerHTML = '';
    }

    bindHandler(handler) {
        this.handlers.push(handler);
    }

    doHandler() {
        this.handlers.forEach(handler => handler());
    }

    getDom(id) {
        return document.getElementById(id);
    }

    setClick(id, func) {
        this.getDom(id).addEventListener('click', func, false);
    }

    appendDom(dom) {
        this.nativeDom.appendChild(dom);
    }

    showView(viewType) {
        this.manager.showView(viewType, this.nativeDom);
    }
}