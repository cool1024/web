export class ViewManager {

    static createManager() {
        return new ViewManager();
    }

    showView(viewType, parentNode) {
        if (this.activeView) {
            this.activeView.destroy();
        }
        if (!this.historyViews) {
            this.historyViews = [];
        }
        this.activeView = View.createView(viewType, parentNode);
        this.historyViews.push(this.activeView);
        this.activeView.manager = this;
    }

    backView() {
        this.activeView.destroy();
        const view = this.historyViews.pop();
        view && view.resume();
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
        this.nativeDom = parentNode.children[0];
        this.nativeDoms = [];
        for (let i = 0; i < parentNode.children.length; i++) {
            this.nativeDoms.push(parentNode.children[i]);
        }
        this.parentNode = parentNode;
    }

    initView() { }

    destroy() {
        this.nativeDoms.forEach(e => this.parentNode.removeChild(e));
    }

    resume() {
        this.nativeDoms.forEach(e => this.parentNode.appendChild(e));
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

    addStyleClass(id, ...className) {
        this.getDom(id).classList.add(className);
    }

    removeStyleClass(id, ...className) {
        this.getDom(id).classList.remove(className);
    }

    setStyleAttr(id, attr, styleStr) {
        this.getDom(id).style[attr] = styleStr;
    }

    appendDom(dom) {
        this.parentNode.appendChild(dom);
        this.nativeDoms.push(dom);
    }

    showView(viewType) {
        this.manager.showView(viewType, this.parentNode);
    }

    showViewIn(viewType, parentNode) {
        const manager = ViewManager.createManager();
        manager.showView(viewType, parentNode);
    }
}