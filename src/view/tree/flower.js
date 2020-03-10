
export const FlowerConfig = {
    DEFAULT_COLORS: ['lightcoral', 'snow'],
    DEFAULT_SIZE: [2, 20],
    DEFAULT_WING_ANGLE: 0.6
};

export class BaseDraw {

    static getEndPoint(point, distance, angle) {
        const endPoint = {};
        const offsetX = distance * Math.cos(angle);
        const offsetY = distance * Math.sin(angle);
        endPoint.x = point.x + offsetX;
        endPoint.y = point.y + offsetY;
        return endPoint;
    }

    constructor(context, width, height, color) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    setPosition(point) {
        this.point = point;
        return this;
    }

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

}

export class Flower extends BaseDraw {

    static createExample(context) {
        return new Flower(context, FlowerConfig.DEFAULT_SIZE[0], FlowerConfig.DEFAULT_SIZE[1], FlowerConfig.DEFAULT_COLORS)
            .setWingAngle(FlowerConfig.DEFAULT_WING_ANGLE);
    }

    static createFromBranch(parentBranch, width, height) {
        return new Flower(parentBranch.context, width, height, FlowerConfig.DEFAULT_COLORS)
            .setPosition(parentBranch.endPoint)
            .setWingAngle(FlowerConfig.DEFAULT_WING_ANGLE);
    }

    constructor(context, width, height, color) {
        super(context, width, height, color);
        this.wingWidth = this.width * 2;
        this.wingHeight = this.height;
        this.strokeColor = 'transparent'
        this.gradientRandomNum = Math.random() > 0.5 ? [0, 1] : [1, 0];
    }

    setWingAngle(angle) {
        this.wingAngle = angle;
        return this;
    }

    draw() {
        const gradient = this.context.createLinearGradient(0, 0, this.wingHeight, this.wingWidth * 2);
        gradient.addColorStop(0, this.color[this.gradientRandomNum[0]]);
        gradient.addColorStop(1, this.color[this.gradientRandomNum[1]]);
        this.drawWing(gradient, this.wingWidth, this.wingHeight, -1);
        this.drawWing(gradient, this.wingWidth, this.wingHeight, 1);
    }

    drawWing(gradient, wingWidth, wingHeight, k) {
        this.context.save();
        this.context.translate(this.point.x, this.point.y);
        this.context.rotate(this.angle + this.wingAngle * k);
        this.context.beginPath();
        this.context.moveTo(wingHeight * 2, 0);
        this.context.ellipse(wingHeight, 0, wingHeight, wingWidth, 0, 0, Math.PI * 2);
        this.context.fillStyle = gradient;
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.strokeColor;
        this.context.stroke();
        this.context.fill();
        this.context.restore();
    }
}