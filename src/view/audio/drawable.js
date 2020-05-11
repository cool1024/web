export class Drawable {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw(data, color) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const ctx = this.ctx;
        const dx = width * 1.0 / data.length;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.beginPath();
        data.forEach((v, i) => {
            v = (v / 128.0) * height / 2;
            if(i === 0) {
                ctx.moveTo(i * dx, v);
            } else {
                ctx.lineTo(i * dx, v);
            }
        });
        ctx.stroke();
    }
}