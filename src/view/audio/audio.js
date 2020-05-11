import { View } from "../../view";
import template from './audio.html';
import { Analyser } from "./analyser";
import { Drawable } from "./drawable";

export class AudioView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {
        
        // new Record().getData(1000).subscribe( data => {
        //     console.log(data);
        //     const spectrum = Transform.toSpectrum(data, { method:'fft' })
        //     console.log(spectrum.dominantFrequency());
        // });

        Analyser.createFromUrl('/assets/apple.mp3').subscribe( analyser => {
            analyser.getData(1000 / 20.0).subscribe( data => {
                new Drawable( this.getDom('soundCanvas')).draw(data, 'black');
            });
            analyser.getFrequency(1000 / 20.0).subscribe( f => {
                console.log(analyser.getMusicName(f, 440));
            })
        });
    }

}