import { View } from "../../view";
import template from './audio.html';
import { Analyser } from "./analyser";
import { Drawable } from "./drawable";
import { TextToPicture } from "./text-picture";

export class AudioView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {

        // new Record().getFrequency(1000 / 20.0).subscribe( data => {
        //     console.log(data);
        // });

        Analyser.createFromUrl('/assets/apple.mp3').subscribe( analyser => {
            // analyser.getTimeDomainData(1000 / 20.0).subscribe( data => {
            //     new Drawable( this.getDom('soundCanvas1')).draw(data, 'black');
            // });
            // analyser.getFrequencyData(1000 / 20.0).subscribe( data => {
            //     new Drawable( this.getDom('soundCanvas2')).draw(data.slice(0, data.length / 8), 'black');
            // });
            analyser.getFrequency(1000 / 20.0).subscribe( f => {
                const musicName = analyser.getMusicName(f, 440);
                this.showMusicName(musicName)
            })
        });
    }

    showMusicName(text){
        const colors = ['#616dff', 'white'];
        TextToPicture.create()
        .size(200, 100)
        .color(colors[0])
        .padding(10)
        .text(text, colors[1])
        .toBlobUrl()
        .subscribe(url => this.getDom('musicNameImg').setAttribute('src', url));
    }

}