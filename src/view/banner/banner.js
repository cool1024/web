import { View } from "../../view";
import template from './banner.html';
import './banner.scss';

export class BannerView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        const div = document.querySelector('.bili-banner .ctrl');
        const imgs = document.querySelectorAll('.layer img');
        const trans = [-400, -400, 800]
        imgs.forEach((img, index) => {
            const translateValue = trans[index];
            img.setAttribute('translateValue', translateValue);
            img.style.transform = `scale(1) translate(${translateValue}px, 0px) rotate(0deg)`;
        });
        div.addEventListener('mousemove', event => {
            imgs.forEach((img, index) => {
                let translateValue = parseInt(img.getAttribute('translateValue') || '0');
                const k = (imgs.length - index) * 10.0;
                translateValue -= Math.floor(event.movementX / k);
                img.setAttribute('translateValue', translateValue);
                img.style.transform = `scale(1) translate(${translateValue}px, 0px) rotate(0deg)`;
            });
        });
    }
}