import { Flower, BaseDraw } from "./flower";

export class Seed extends Flower {

    constructor(context, width, height, color) {
        super(context, width, height, color);
        this.setSeedOffset(0);
        this.setAngle(0);
    }

    setSeedOffset(offset) {
        this.offset = offset;
        return this;
    }

    draw() {
        const gradient = this.context.createLinearGradient(0, 0, this.wingHeight, this.wingWidth * 2);
        gradient.addColorStop(0, this.color[this.gradientRandomNum[0]]);
        gradient.addColorStop(1, this.color[this.gradientRandomNum[1]]);    
        this.drawWing(gradient, this.wingWidth, this.wingHeight, -1);
        this.drawWing(gradient, this.wingWidth, this.wingHeight, 1);
        this.drawSeed();
    }

    drawSeed() {
        this.context.save();
        this.context.translate(this.point.x, this.point.y);
        this.context.rotate(this.angle);
        this.context.beginPath();
        this.context.ellipse(this.offset, 0, this.height, this.width, 0, 0, Math.PI * 2);
        this.context.fillStyle = this.color[2];
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.strokeColor;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
    }

    move(distance, angle, bgColor) {
        const saveColor = this.color;
        const offsetAngle = angle * 1.0 / distance;
        if (distance > 0) {
            this.color = [bgColor, bgColor, bgColor];
            this.strokeColor = bgColor;
            this.draw();
            this.color = saveColor;
            this.point = BaseDraw.getEndPoint(this.point, 1, this.angle);
            this.angle = angle + offsetAngle;
            this.draw();
            requestAnimationFrame(() => {
                this.move(distance - 1, angle - offsetAngle, bgColor);
            });
        }
    }
}