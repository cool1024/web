import { View } from "../../view";
import template from './index.html';
import './bootstrap.scss';

export class FormView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const dom = this.getDom('edit');
        new FormEdit(dom, {}).addRows(
            new Row().addCols(
                new FormInput('邮箱', '请输入邮箱', 'example@abc.com', 6),
                new FormInput('电话', '请输入电话', '100000', 6)
            ),
            new Row().addCols(
                new FormInput('邮箱', '请输入邮箱', 'example@abc.com', 3),
                new FormInput('电话', '请输入电话', '100000', 4),
                new FormInput('电话', '请输入电话', '100000', 5)
            )
        );
    }
}

export class Row {

    constructor() {
        this.cols = [];
    }

    addCols(...col) {
        col.forEach(e => this.addCol(e));
        return this;
    }

    addCol(col) {
        this.cols.push(col);
        this.nativeDom && col.render(this.nativeDom);
        return this;
    }

    render(parentDom) {
        const div = document.createElement('div');
        div.classList.add('row');
        parentDom.append(div);
        this.nativeDom = div;
        this.cols.forEach(col => col.render(div));
        return div;
    }
}

export class FormEdit {

    constructor(nativeDom, config) {
        this.nativeDom = nativeDom;
        this.config = config;
        this.rows = [];
    }

    addRows(...row) {
        row.forEach(e => this.addRow(e));
        return this;
    }

    addRow(row) {
        row.render(this.nativeDom);
        this.rows.push(row);
        return this;
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

    constructor(label, placeholder, tips, colNum) {
        super(label, placeholder, colNum);
        this.classList = ['form-input'];
        this.type = 'text';
        this.tips = tips;
    }

    render(parentDom) {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const tips = document.createElement('small');

        div.append(label);
        div.append(input);
        div.append(tips);

        div.classList.add('form-group', `col-${this.colNum}`);
        input.classList.add('form-control');
        tips.classList.add('form-text');

        input.placeholder = this.placeholder;
        input.type = this.type;
        label.innerText = this.label;
        tips.innerText = this.tips;

        parentDom.append(div);
        return div;
    }
}