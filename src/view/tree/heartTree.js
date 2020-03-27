import { of, interval } from 'rxjs';
import { delay, take } from 'rxjs/operators';

export class BaseDraw {

    constructor(point, width, height) {
        this.width = width;
        this.height = height;
        this.point = point;
        this.afterCreate();
    }

    bindContext(ctx) {
        this.ctx = ctx;
        this.afterBindContext(ctx);
        return this;
    }

    afterCreate() { }

    afterBindContext(ctx) { }

    setColorConfig(colorConfig) {
        this.colorConfig = colorConfig;
        return this;
    }

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

    static getEndPoint(point, distance, angle) {
        const endPoint = {};
        const offsetX = distance * Math.cos(angle);
        const offsetY = distance * Math.sin(angle);
        endPoint.x = point.x + offsetX;
        endPoint.y = point.y + offsetY;
        return endPoint;
    }
}

export class Branch extends BaseDraw {

    static createFromParent(branch) {
        return new Branch(branch.endPoint, branch.minWidth, branch.height)
            .bindContext(branch.ctx)
            .setColorConfig(Object.assign({}, this.colorConfig));
    }

    afterCreate() {
        this.minWidth = this.width * 0.4;
    }

    draw() {
        let growCx = 0;
        let growWidth = this.width - this.minWidth;
        const drawTaskParams = [];
        while (growCx < this.height) {
            const growK = (1.0 * growCx) / this.height;
            growCx++;
            let startPoint = BaseDraw.getEndPoint(this.point, growCx, this.angle);
            drawTaskParams.push([startPoint, this.width - (growWidth * growK)]);
        }
        interval(10).pipe(take(this.height)).subscribe(i => this.grow(...drawTaskParams[i]))
        return this;
    }

    addChild() {
        this.endPoint = BaseDraw.getEndPoint(this.point, this.height, this.angle);
        Branch.createFromParent(this).setAngle(this.angle - 0.4).draw();
        Branch.createFromParent(this).setAngle(this.angle + 0.1).draw();
    }

    grow(startPoint, r) {
        this.ctx.save();
        this.ctx.fillStyle = this.colorConfig.fillStyle;
        this.ctx.shadowColor = this.colorConfig.shadowColor;
        this.ctx.shadowBlur = this.colorConfig.shadowBlur;
        this.ctx.moveTo(startPoint.x, startPoint.y);
        this.ctx.arc(startPoint.x, startPoint.y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}

export class HeartTree extends BaseDraw {


    constructor(point, width, height) {
        super(point, width, height);
        this.initTree();
    }

    initTree() {
        this.rootBranch = new Branch(this.point, this.width, this.height);
        this.rootBranch.setColorConfig({
            fillStyle: 'rgb(35, 31, 32)',
            shadowColor: 'rgb(35, 31, 32)',
            shadowBlur: 2
        }).setAngle(1);
    }

    afterBindContext(ctx) {
        this.rootBranch.bindContext(ctx);
    }

    draw() {
        this.rootBranch.draw().addChild();
    }
}
