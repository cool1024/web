import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Analyser } from './analyser';

export class Record {

    getMedia() {
        const promise = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        return from(promise);
    }

    getTimeDomainData(time) {
        return this.getMedia().pipe(switchMap(stream => Analyser.createFromStream(stream).getTimeDomainData(time)));
    }

    getFrequency(time){
        return this.getMedia().pipe(switchMap(stream => Analyser.createFromStream(stream).getFrequency(time)));
    }
}