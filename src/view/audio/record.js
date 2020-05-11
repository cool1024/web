import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Analyser } from './analyser';

export class Record {

    getMedia() {
        const promise = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        return from(promise);
    }

    getData(time) {
        return this.getMedia().pipe(switchMap(stream => Analyser.createFromStream(stream).getData(time)));
    }
}