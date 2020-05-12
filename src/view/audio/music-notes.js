export class MusicNotes {
    

    static create() {  
        const audioCtx = new AudioContext
        return new MusicNotes().trackFun(audioCtx).connect(audioCtx.destination);
    }

    trackFun(audioCtx) {
        this.oscillator = audioCtx.createOscillator();
        this.oscillator.type = 'sine';
        return this;
    }

    connect(destination) {
        this.oscillator.connect(destination);
        return this;
    }

    play(frequency) {
        this.oscillator.frequency.value = frequency;
        this.oscillator.start();
        return this;
    }
}