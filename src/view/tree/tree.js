import { View } from "../../view";
import template from './tree.html';

export class TreeView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const canvas = this.getDom('tree');
        const context = canvas.getContext('2d');
        canvas.width = 1000;
        canvas.height = 500;
        canvas.style = 'transform: rotateX(180deg);background-color:wheat'
        Tree.draw(context, canvas.width, 14, 2, 20, 100)
    }
}

export class Tree {
    static draw(context, width, level, minLevel, treeWidth, treeLength) {
        Branch.createRootBranch(context, { x: width / 2, y: 0 }, treeWidth, treeLength).next(level, minLevel);
    }
}

Tree.widthK = 0.7;
Tree.distanceK = [5, 9];
Tree.angleK = 0.3;

export class Branch {

    static createRootBranch(context, rootPoint, width, distance) {
        return new Branch({
            startPoint: rootPoint,
            endPoint: rootPoint,
            width: width / Tree.widthK,
            context,
            realAngle: Math.PI / 2
        }).left(0).forward(distance);
    }

    constructor(parentBranch) {
        this.context = parentBranch.context;
        this.startPoint = Object.assign({}, parentBranch.endPoint);
        this.endPoint = Object.assign({}, this.startPoint);
        this.width = parentBranch.width * Tree.widthK;
        this.parentBranch = parentBranch;
        this.color = 'sienna'
    }

    right(angle) {
        this.realAngle = this.parentBranch.realAngle - angle;
        return this;
    }

    left(angle) {
        this.realAngle = this.parentBranch.realAngle + angle;
        return this;
    }

    forward(distance) {
        this.distance = distance;
        const offsetX = this.distance * Math.cos(this.realAngle);
        this.offsetY = this.distance * Math.sin(this.realAngle);
        this.endPoint.x = this.endPoint.x + offsetX;
        this.endPoint.y = this.endPoint.y + this.offsetY;
        this.context.save();
        this.context.beginPath();
        this.context.lineCaps = "round";
        this.context.lineJoin = "round";
        this.context.lineWidth = this.width;
        this.context.moveTo(this.startPoint.x, this.startPoint.y);
        this.context.lineTo(this.endPoint.x, this.endPoint.y);
        this.context.strokeStyle = this.color;
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
        return this;
    }

    flower() {
        new Flower(this).right(Math.PI / 9 * Math.random() + 0.2).forward(10);
        new Flower(this).left(Math.PI / 9 * Math.random() + 0.2).forward(10);
    }

    next(num, min) {
        if (num > 0) {
            if (Math.random() < 0.5 && num < min) {
                this.flower();
            } else {
                const offset = Tree.distanceK[1] - Tree.distanceK[0];
                const randomLeft = (Tree.distanceK[0] + Math.random() * offset).toFixed(0) / 10.0;
                const randomRight = (Tree.distanceK[0] + Math.random() * offset).toFixed(0) / 10.0;
                new Branch(this).left(Math.PI / 9 * Math.random() + Tree.angleK).forward(randomLeft * this.distance).next(num - 1, min);
                new Branch(this).right(Math.PI / 9 * Math.random() + Tree.angleK).forward(randomRight * this.distance).next(num - 1, min);
            }
        } else {
            this.flower();
        }
    }
}

export class Flower extends Branch {
    constructor(parentBranch) {
        super(parentBranch);
        this.color = Math.random() > 0.5 ? 'lightcoral' : 'snow';
        this.width = 5;
    }
}