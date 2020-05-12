import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TextToPicture {

     static create() {
        if (!TextToPicture.instance) {
            TextToPicture.instance = new TextToPicture();
        }
        return TextToPicture.instance;
    }

     static randomColor() {
        const v = Math.round((Math.random() * 3));
        return `${['#616dff', '#409EFF', '#dc3545', '#20c997', '#6f42c1'][v]},white`;
    }

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.imgPadding = 10;
        this.imgColor = 'transparent';
    }

    size(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    }

    padding(padding) {
        this.imgPadding = padding;
        return this;
    }

   color(color) {
        this.context.save();
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.restore();
        this.imgColor = color;
        return this;
    }

    text(text, color) {
        text = (text || '').substring(0, 4);
        let fontSize = this.canvas.height / 2;
        let drawPoint = { x: 0, y: fontSize };
        const targetWHValue = Math.min(this.canvas.width, this.canvas.height);
        this.context.textAlign = 'left';
        this.context.textBaseline = 'top';
        switch (text.length) {
            case 1: {
                fontSize = targetWHValue - this.imgPadding * 2;
                this.context.font = `${fontSize}px Arial`;
                const size = this.measureTextSize(text, this.context.font);
                drawPoint = { x: (this.canvas.width - size.width) / 2, y: (this.canvas.height - size.height) / 2 };
                this.context.fillStyle = color;
                this.context.fillText(text, drawPoint.x, drawPoint.y);
                break;
            }
            case 2: {
                fontSize = (targetWHValue - this.imgPadding * 2) / 2;
                this.context.font = `${fontSize}px Arial`;
                const size = this.measureTextSize(text, this.context.font);
                drawPoint = { x: (this.canvas.width - size.width) / 2, y: (this.canvas.height - size.height) / 2 };
                this.context.fillStyle = color;
                this.context.fillText(text, drawPoint.x, drawPoint.y, this.canvas.width);
                break;
            }
            case 3: {
                fontSize = (targetWHValue - this.imgPadding * 2) / 2;
                this.context.font = `${fontSize}px Arial`;
                const size = this.measureTextSize(text.substring(0, 2), this.context.font);
                drawPoint = { x: (this.canvas.width - size.width) / 2, y: (this.canvas.height - size.height * 2) / 2 };
                this.context.fillStyle = color;
                this.context.fillText(text.substring(0, 2), drawPoint.x, drawPoint.y, this.canvas.width);
                drawPoint = { x: (this.canvas.width - size.width / 2) / 2, y: (this.canvas.height - size.height * 2) / 2 + size.height };
                this.context.fillText(text.substring(2, 3), drawPoint.x, drawPoint.y, this.canvas.width);
                break;
            }
            case 4: {
                fontSize = (targetWHValue - this.imgPadding * 2) / 2;
                this.context.font = `${fontSize}px Arial`;
                const size = this.measureTextSize(text.substring(0, 2), this.context.font);
                drawPoint = { x: (this.canvas.width - size.width) / 2, y: (this.canvas.height - size.height * 2) / 2 };
                this.context.fillStyle = color;
                this.context.fillText(text.substring(0, 2), drawPoint.x, drawPoint.y, this.canvas.width);
                drawPoint = { x: drawPoint.x, y: (this.canvas.height - size.height * 2) / 2 + size.height };
                this.context.fillText(text.substring(2, 4), drawPoint.x, drawPoint.y, this.canvas.width);
                break;
            }
        }
        return this;
    }

    toBlobUrl(type = 'png', quality = 1) {
        return this.toBlob(type, quality).pipe(map(blob => URL.createObjectURL(blob)));
    }

    toBlob(type = 'png', quality = 1){
        return new Observable(sub => {
            this.canvas.toBlob(blob => sub.next(blob), type, quality);
        });
    }

    measureTextSize(text, font) {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = font;
        this.context.fillText(text, 0, 0);
        const size = { width: this.context.measureText(text).width, height: 0 };
        this.context.restore();
        const data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.color(this.imgColor);
        // 从下往上找第一个是文字颜色的像素
        for (let row = this.canvas.height; row > 0; row--) {
            for (let col = 0; col < this.canvas.width; col++) {
                if (data[row * this.canvas.width * 4 + col * 4 + 3]) {
                    size.height = row;
                    return size;
                }
            }
        }
        return size;
    }
}