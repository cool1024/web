import { interval, concat } from 'rxjs';
import { take, tap, takeLast } from 'rxjs/operators';
import { FlowerConfig } from './flower';

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

    setPoint(point) {
        this.point = point;
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

    static createFromParent(branch, hK) {
        return new Branch(branch.endPoint, branch.minWidth, Math.ceil(branch.height * hK))
            .bindContext(branch.ctx)
            .setColorConfig(branch.colorConfig);
    }

    getEndPoint(){
        this.endPoint = this.endPoint || BaseDraw.getEndPoint(this.point, this.height, this.angle);
        return this.endPoint;
    }

    afterCreate() {
        this.minWidth = this.width * 0.4;
    }

    drawData() {
        let growCx = 0;
        let growWidth = this.width - this.minWidth;
        const drawTaskParams = [];
        while (growCx < this.height) {
            const growK = (1.0 * growCx) / this.height;
            growCx++;
            let startPoint = BaseDraw.getEndPoint(this.point, growCx, this.angle);
            drawTaskParams.push([startPoint, this.width - (growWidth * growK)]);
        }
        return drawTaskParams;
    }

    drawObs(speed) {
        const drawData = this.drawData();
        return interval(speed).pipe(take(this.height), tap(i => this.grow(...drawData[i])));
    }

    createChildren(offsetAngle) {
        this.getEndPoint();
        return [
            Branch.createFromParent(this, 0.7).setAngle(this.angle - offsetAngle),
            Branch.createFromParent(this, 0.7).setAngle(this.angle + offsetAngle)
        ];
    }

    createFlower() {
        return [
            Flower.createFromBranch(this, 2, 10).setAngle(Math.PI / 5 * Math.random() + this.angle),
            Flower.createFromBranch(this, 2, 10).setAngle(-Math.PI / 5 * Math.random() + this.angle)
        ];
    }

    createHeart() {
        return Heart.createFromBranch(this, 1);
    }

    grow(startPoint, r) {
        this.ctx.save();
        this.ctx.fillStyle = this.colorConfig.fillStyle;
        console.log(this.colorConfig.fillStyle);
        this.ctx.shadowColor = this.colorConfig.shadowColor;
        this.ctx.shadowBlur = this.colorConfig.shadowBlur;
        this.ctx.moveTo(startPoint.x, startPoint.y);
        this.ctx.arc(startPoint.x, startPoint.y, r, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}

export class Flower extends BaseDraw {

    static createFromBranch(parentBranch, width, height) {
        return new Flower(parentBranch.point, width, height)
            .setColorConfig(FlowerConfig.DEFAULT_COLORS)
            .setWingAngle(FlowerConfig.DEFAULT_WING_ANGLE)
            .setPoint(BaseDraw.getEndPoint(parentBranch.point, parentBranch.height, parentBranch.angle))
            .bindContext(parentBranch.ctx);
    }

    afterCreate() {
        this.gradientRandomNum = Math.random() > 0.5 ? [0, 1] : [1, 0];
        this.wingWidth = this.width * 2;
        this.wingHeight = this.height;
    }

    setWingAngle(angle) {
        this.wingAngle = angle;
        return this;
    }

    draw() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.wingHeight, this.wingWidth * 2);
        gradient.addColorStop(0, this.colorConfig[this.gradientRandomNum[0]]);
        gradient.addColorStop(1, this.colorConfig[this.gradientRandomNum[1]]);
        this.drawWing(gradient, this.wingWidth, this.wingHeight, -1);
        this.drawWing(gradient, this.wingWidth, this.wingHeight, 1);
    }

    drawWing(gradient, wingWidth, wingHeight, k) {
        this.ctx.save();
        this.ctx.translate(this.point.x, this.point.y);
        this.ctx.rotate(this.angle + this.wingAngle * k);
        this.ctx.beginPath();
        this.ctx.moveTo(wingHeight * 2, 0);
        this.ctx.fillStyle = gradient;
        this.ctx.ellipse(wingHeight, 0, wingHeight, wingWidth, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

export class Heart extends BaseDraw {

    static createFromBranch(branch, size) {
        return new Heart(branch.getEndPoint(), 0, 0)
            .setR(size)
            .setRate(100)
            .setAngle(Math.random())
            .bindContext(branch.ctx)
            .setColorConfig({
                fillStyle: 'rgba(240, 128, 128, 1)',
                shadowColor: 'rgba(240, 128, 128, 1)',
                shadowBlur: 20
            });
    }

    setR(r) {
        this.r = r;
        return this;
    }

    setRate(rate) {
        this.rate = rate;
        return this;
    }

    afterCreate() {
        this.gradientRandomNum = Math.random() > 0.5 ? [0, 1] : [1, 0];
    }

    drawData() {
        const drawData = [];
        const levelNum = this.rate || 50;
        for (let i = 0; i < levelNum; i++) {
            const step = (i / levelNum) * (Math.PI * 2);
            const point = {
                x: this.r * (16 * Math.pow(Math.sin(step), 3)),
                y: this.r * (13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
            };
            drawData.push(point);
        }
        return drawData;
    }

    draw() {
        const drawData = this.drawData();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.point.x, this.point.y);
        this.ctx.rotate(this.angle);
        this.ctx.fillStyle = this.colorConfig.fillStyle;
        this.ctx.shadowColor = this.colorConfig.shadowColor;
        this.ctx.shadowBlur = this.colorConfig.shadowBlur;
        drawData.forEach(data => {
            this.ctx.lineTo(data.x, data.y);
        });
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
}

export class HeartTree extends BaseDraw {

    prepareTree(level) {
        this.branchs = [];
        this.flowers = [];
        this.rootBranch = new Branch(this.point, this.width, this.height);
        this.rootBranch.setColorConfig({
            fillStyle: 'rgb(35, 31, 32)',
            shadowColor: 'rgb(35, 31, 32)',
            shadowBlur: 2
        }).setAngle(Math.PI / 2).bindContext(this.ctx);
        this.branchs.push(this.rootBranch);
        this.addChildren(this.rootBranch, level);
        return this;
    }

    addChildren(parentBranch, level) {
        if (level > 0) {
            const children = parentBranch.createChildren(0.4);
            this.branchs.push(...children);
            this.addChildren(children[0], level - 1);
            this.addChildren(children[1], level - 1);
        } else {
            this.flowers.push(parentBranch.createHeart());
            // this.flowers.push(...parentBranch.createFlower());
        }
    }

    drawObs() {
        const drawTasks = this.branchs.map(item => item.drawObs(1));
        return concat(...drawTasks).pipe(
            takeLast(1),
            tap(_ => this.flowers.forEach(flower => flower.draw()))
        );
    }
}
