import {EventEmitter} from "events";

class Viewport extends EventEmitter{
    constructor() {
        super();
        this.attach();
    }

    onResize(e){
        this.emit('resize', {width: this.width, height: this.height});
    }

    attach(){
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(() => {
            this.onResize();
        }, 1);
    }

    get width(){
        return window.innerWidth;
    }

    get height(){
        return window.innerHeight;
    }
}

export default new Viewport();
