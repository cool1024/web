import { interval, fromEvent } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class Analyser{

    static createFromUrl(url){
        const audio = new Audio(url);
        audio.controls = true;
        document.body.appendChild(audio);
        return fromEvent(audio,'canplay').pipe(take(1), map(()=>{
            audio.play();
            const obj = new Analyser();
            obj.track = obj.audioContext.createMediaElementSource(audio)
            return obj;
        }))
    }

    static createFromStream(stream){
        const obj = new Analyser();
        obj.track = obj.audioContext.createMediaStreamSource(stream);
        return obj;
    }

    constructor(){
        const AudioContext = (window.AudioContext || window.webkitAudioContext);
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
    }

    getData(time){
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        this.track.connect(this.analyser);
        return interval(time).pipe(map(_ => {
            this.analyser.getByteTimeDomainData(data);
            return data;
        }));
    }

    getFrequency(time) {
        const data = new Uint8Array(this.analyser.frequencyBinCount);
        const df = 1.0 * this.audioContext.sampleRate / this.analyser.fftSize;
        this.track.connect(this.analyser);
        return interval(time).pipe(map(_ => {
            this.analyser.getByteFrequencyData(data);
            let f =0
            const max = Math.max(...data);
            data.forEach((e, i) => {
                if(max === e){
                    f = i;
                }
            });
            return df * f || 0;
        }));
    }

    getMusicName(f, midCF){
        const musicName = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ];
        const lineal = 12 * ((Math.log(f) - Math.log(midCF)) / Math.log(2));
        const midi = Math.round(69 + lineal);
        const name = musicName[midi % 12]
        const oct = Math.floor(midi / 12) - 1
        return name + oct
    }
}