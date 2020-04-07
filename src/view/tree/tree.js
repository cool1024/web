import { View } from "../../view";
import template from './tree.html';
import { Branch } from "./branch";
import { Seed } from "./seed";
import { HeartTree, Heart, Bloom } from "./heartTree";
import { FlowerConfig } from "./flower";

export class TreeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const canvas = this.getDom('canvas');
        const context = canvas.getContext('2d');
        canvas.style = 'transform: rotateX(180deg);background-color:wheat';
        const draw = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            new HeartTree({ x: canvas.width / 2, y: 0 }, 50, 300)
                .bindContext(context)
                .prepareFlower(2, 15, FlowerConfig.DEFAULT_WING_ANGLE, FlowerConfig.DEFAULT_COLORS)
                .prepareTree(0, {
                    fillStyle: 'rgb(35, 31, 32)',
                    shadowColor: 'rgb(35, 31, 32)',
                    shadowBlur: 2
                })
                .drawObs()
                .subscribe();
            // new Bloom({ x: canvas.width / 2, y: 0 }, 10, 100).drawObs();

            // new Heart({ x: canvas.width / 2, y: canvas.height / 2 }, 0, 0)
            // .setR(1)
            // .setRate(100)
            // .bindContext(context)
            // .setColorConfig({
            //     fillStyle: 'rgba(240, 128, 128, 1)',
            //     shadowColor: 'rgba(240, 128, 128, 1)',
            //     shadowBlur: 20
            // })
            // .draw();

            // Tree.draw(context, canvas.width, 10, 15, 120);
            // new Seed(context, 4, 20, ['lightcoral', 'snow', 'sienna'])
            //     .setPosition({ x: 300, y: 500 })
            //     .setWingAngle(0.6)
            //     // .draw()
            //     .move(100, Math.PI, 'wheat');
        };
        draw();
        // window.addEventListener('resize', draw);
    }
}

export class Tree {
    static draw(context, width, level, treeWidth, treeLength) {
        Branch.createRootBranch(context, { x: width / 3, y: 0 }, treeWidth, treeLength).draw().growUp(level);
    }
}