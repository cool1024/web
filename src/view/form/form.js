import { View } from "../../view";
import template from './index.html';

export class FormView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        this.getDom('form');
    }
}

export class FormEdit {

    constructor(nativeDom, config) {
        this.nativeDom = nativeDom;
    }
}

export class BaseFormInput {

    constructor(label, placeholder, colNum) {
        this.label = label;
        this.placeholder = placeholder;
        this.colNum = colNum;
    }
}

export class FormInput extends BaseFormInput {

    constructor(label, placeholder, colNum) {
        super(label, placeholder, colNum);
        this.classList = ['form-input'];
        this.type = 'text';
    }

    render() {
        const input = document.createElement('input');
        const div = document.createElement('input');
        const label = document.createElement('label');
        const tips = document.createElement('small');
        div.append(label);
        input.append(input);
        input.append(tips);
        div.classList.add('form-group');
        input.classList.add('form-control');
        small.classList.add('form-text');

        input.placeholder = this.placeholder;
        input.type = this.type;
        label.innerHTML = this.label;
    }
}