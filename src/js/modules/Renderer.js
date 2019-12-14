import {EventEmitter} from "events";
import Viewport from "./Viewport";

class Renderer extends EventEmitter{
    constructor() {
        super();

        this.el = document.createElement("canvas");

        document.body.appendChild(this.el);

        this.attach();
    }

    onResize({width, height}){
        console.log(width, height);
        this.el.width = width;
        this.el.height = height;
    }

    attach(){
        Viewport.on('resize', this.onResize.bind(this));
    }
}

export default Renderer;
export { Renderer };
