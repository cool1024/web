import { from, interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export class Record {

    getMedia() {
        const promise = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        return from(promise);
    }

    getData(time) {
        return this.getMedia().pipe(switchMap(stream => {
            const AudioContext = (window.AudioContext || window.webkitAudioContext);
            const audioElement = document.getElementById('audio');
            const audioContext = new AudioContext();
            const track = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            const data = new Uint8Array(analyser.frequencyBinCount);
            track.connect(analyser);
            return interval(time).pipe(map(_ => data));
        }));
    }
}