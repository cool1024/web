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
        canvas.height = 800;
        canvas.style = 'transform: rotateX(180deg);background-color:wheat';
        // Tree.draw(context, canvas.width, 10, 2, 10, 110);
        // Tree.draw(context, canvas.width, 10, 2, 10, 80);
        // Tree.draw(context, canvas.width, 10, 2, 10, 80);
        // Tree.draw(context, canvas.width, 5  , 2, 10, 80);
        new Seed(context, 4, 30, 2).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
        // new Seed(context, 1, 6, 1).draw({ x: 300, y: 500 }, Math.PI / 3).move(100, Math.PI, 'wheat');
    }
}

export class Tree {
    static draw(context, width, level, minLevel, treeWidth, treeLength) {
        Branch.createRootBranch(context, { x: width / 2, y: 0 }, treeWidth, treeLength).next(level, minLevel);
    }
}

Tree.widthK = 0.75;
Tree.distanceK = [9, 10];
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
        this.color = 'sienna';
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
        const offsetY = this.distance * Math.sin(this.realAngle);
        this.endPoint.x = this.endPoint.x + offsetX;
        this.endPoint.y = this.endPoint.y + offsetY;
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
        // new Seed(this.context, 2, 20, 1).draw(this.endPoint, Math.PI / 9 * Math.random() + 0.2 + + this.realAngle);
        // new Seed(this.context, 2, 20, 1).draw(this.endPoint, - Math.PI / 9 * Math.random() - 0.2 + this.realAngle);
        new Flower(this).right(Math.PI / 9 * Math.random() + 0.2).forward(15);
        new Flower(this).left(Math.PI / 9 * Math.random() + 0.2).forward(15);
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

export class Seed {

    constructor(context, width, height, offset) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.offset = offset;
        this.color = 'sienna';
    }

    move(distance, angle, bgColor) {
        if (distance > 0) {
            this.draw(this.startPoint, this.angle, bgColor);
            const endPoint = this.getEndPoint(this.startPoint, 1, this.angle);
            const offsetAngle = angle * (1.0 / distance);
            this.draw(endPoint, this.angle + offsetAngle);
            requestAnimationFrame(() => {
                this.move(distance - 1, angle - offsetAngle, bgColor);
            });
        } else {
            const randomAngle = (0.5 - Math.random()) * Math.PI;
            const randomDistance = Math.random() * 100;
            this.move(randomDistance, randomAngle, bgColor);
        }
    }

    flash() {
        this.draw(this.startPoint, this.angle);
    }

    draw(point, angle, color) {

        this.angle = angle;
        this.startPoint = point;
        this.endPoint = this.getEndPoint(point, this.width, angle);

        this.drawWing(color);
        this.drawSeed(color);

        return this;
    }

    getEndPoint(point, distance, angle) {
        const endPoint = {};
        const offsetX = distance * Math.cos(angle);
        const offsetY = distance * Math.sin(angle);
        endPoint.x = point.x + offsetX;
        endPoint.y = point.y + offsetY;
        return endPoint;
    }

    drawSeed(color) {
        this.context.save();
        this.context.translate(this.startPoint.x, this.startPoint.y);
        this.context.rotate(this.angle);
        this.context.beginPath();
        this.context.ellipse(this.offset, 0, this.height, this.width, 0, 0, Math.PI * 2);
        this.context.fillStyle = color || this.color;
        if (color) {
            this.context.lineWidth = 4;
            this.context.strokeStyle = color;
            this.context.stroke();
        }
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }

    drawWing(color) {

        const wingWidth = this.width * 2;
        const wingHeight = this.height;

        const gradient = this.context.createLinearGradient(0, 0, wingHeight, wingWidth * 2);
        gradient.addColorStop(0, 'lightcoral');
        gradient.addColorStop(1, 'snow');

        // Math.random() > 0.5 ? (gradient.addColorStop(0, 'lightcoral'), gradient.addColorStop(1, 'snow'))
        //     : (gradient.addColorStop(0, 'snow'), gradient.addColorStop(1, 'lightcoral'));

        this.context.save();
        this.context.lineWidth = 1;
        this.context.translate(this.endPoint.x, this.endPoint.y);
        this.context.rotate(this.angle + 0.6);
        this.context.beginPath();
        this.context.moveTo(wingHeight * 2, 0);
        this.context.ellipse(wingHeight, 0, wingHeight, wingWidth, 0, 0, Math.PI * 2);
        this.context.fillStyle = color || gradient;
        if (color) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = color;
            this.context.stroke();
        }
        this.context.fill();
        this.context.restore();

        this.context.save();
        this.context.lineWidth = 1;
        this.context.translate(this.endPoint.x, this.endPoint.y);
        this.context.rotate(this.angle - 0.6);
        this.context.beginPath();
        this.context.moveTo(wingHeight * 2, 0);
        this.context.ellipse(wingHeight, 0, wingHeight, wingWidth, 0, 0, Math.PI * 2);
        this.context.fillStyle = color || gradient;
        if (color) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = color;
            this.context.stroke();
        }
        this.context.fill();
        this.context.restore();
    }
}