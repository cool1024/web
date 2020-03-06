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
        canvas.height = 1000;
        canvas.style = 'transform: rotateX(180deg);background-color:wheat'
        const draw = () => {
            context.clearRect(0, 0, 1000, 1000);
            const rootBranch = Branch.createRootBranch(context, { x: 450, y: 0 }, 4, 150);
            rootBranch.autoFlower(10, 5);
            // requestAnimationFrame(draw);
        };
        draw();
    }
}

export class Branch {

    static createRootBranch(context, rootPoint, width, distance) {
        return new Branch({
            startPoint: rootPoint,
            endPoint: rootPoint,
            width: width * 2,
            context,
            realAngle: Math.PI / 2
        }).left(0).forward(distance);
    }

    constructor(parentBranch) {
        this.context = parentBranch.context;
        this.startPoint = Object.assign({}, parentBranch.endPoint);
        this.endPoint = Object.assign({}, this.startPoint);
        this.width = parentBranch.width * 0.8;
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

    next(num) {
        if (num > 0) {
            let randomLeft = Math.random() + 0.2;
            randomLeft = randomLeft > 1 ? randomLeft - 0.3 : randomLeft;
            let randomRight = Math.random() + 0.2;
            randomRight = randomRight > 1 ? randomRight - 0.3 : randomRight;
            console.log(randomLeft);
            new Branch(this).left(Math.PI / 20 * Math.random() + 0.2).forward(randomLeft * 50).next(num - 1);
            new Branch(this).right(Math.PI / 20 * Math.random() + 0.2).forward(randomRight * 50).next(num - 1);
        } else {
            this.flower();
        }
    }

    autoFlower(num, min) {
        if (num > 0) {
            let randomLeft = Math.random() + 0.2;
            if (randomLeft > 1 && num < min) {
                this.flower();
            } else {
                new Branch(this).left(Math.PI / 9 * Math.random() + 0.2).forward(randomLeft * 50).autoFlower(num - 1, min);
            }
            let randomRight = Math.random() + 0.2;
            if (randomRight > 1 && num < min) {
                this.flower();
            } else {
                new Branch(this).right(Math.PI / 9 * Math.random() + 0.2).forward(randomRight * 50).autoFlower(num - 1, min);
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