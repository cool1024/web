import { BaseDraw, Flower } from "./flower";

export const BranchConfig = {
    branchWidthK: 0.8,
    branchColor: 'sienna',
};

export class Branch extends BaseDraw {

    static createRootBranch(context, rootPoint, width, height) {
        return new Branch({
            startPoint: rootPoint,
            endPoint: rootPoint,
            width: width,
            context,
            height,
            realAngle: Math.PI / 2
        }).left(0);
    }

    constructor(parentBranch, widthK) {
        widthK = widthK || BranchConfig.branchWidthK;
        const width = parentBranch.width * widthK;
        let randomHK = Math.random();
        randomHK = randomHK < 0.7 ? 0.7 : randomHK;
        const height = parentBranch.height * randomHK;
        super(parentBranch.context, width, height, BranchConfig.branchColor);
        this.startPoint = Object.assign({}, parentBranch.endPoint);
        this.endPoint = Object.assign({}, this.startPoint);
        this.parentBranch = parentBranch;
    }

    right(angle) {
        this.realAngle = this.parentBranch.realAngle - angle;
        return this;
    }

    left(angle) {
        this.realAngle = this.parentBranch.realAngle + angle;
        return this;
    }

    draw() {
        this.endPoint = BaseDraw.getEndPoint(this.startPoint, this.height, this.realAngle);
        this.context.save();
        this.context.beginPath();
        this.context.lineCaps = "round";
        this.context.lineWidth = this.width;
        this.context.moveTo(this.startPoint.x, this.startPoint.y);
        this.context.lineTo(this.endPoint.x, this.endPoint.y);
        this.context.strokeStyle = this.color;
        this.context.stroke();
        this.context.restore();
        return this;
    }

    flower() {
        Flower.createFromBranch(this, 2, 10).setAngle(Math.PI / 10 * Math.random() + this.realAngle).draw();
        Flower.createFromBranch(this, 2, 10).setAngle(-Math.PI / 10 * Math.random() + this.realAngle).draw();
    }

    growUp(num) {
        if (num > 0) {
            new Branch(this, (num - 1) / num).left(Math.random() * 0.8).draw().growUp(num - 1);
            new Branch(this, (num - 1) / num).right(Math.random() * 0.8).draw().growUp(num - 1);
        } else {
            this.flower();
        }
    }
}