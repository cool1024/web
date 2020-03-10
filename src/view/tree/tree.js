import { View } from "../../view";
import template from './tree.html';
import { Branch } from "./branch";
import { Seed } from "./seed";

export class TreeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const canvas = this.getDom('tree');
        const context = canvas.getContext('2d');
        canvas.style = 'transform: rotateX(180deg);background-color:wheat';
        const draw = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Tree.draw(context, canvas.width, 5, 10, 100);
            new Seed(context, 4, 20, ['lightcoral', 'snow', 'sienna'])
                .setPosition({ x: 300, y: 500 })
                .setWingAngle(0.6)
                // .draw()
                .move(100, Math.PI, 'wheat');
        };
        draw();
        window.addEventListener('resize', draw);
    }
}

export class Tree {
    static draw(context, width, level, treeWidth, treeLength) {
        Branch.createRootBranch(context, { x: width / 2, y: 0 }, treeWidth, treeLength).draw().growUp(level);
    }
}