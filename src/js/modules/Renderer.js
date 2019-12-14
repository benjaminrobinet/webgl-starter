import {EventEmitter} from "events";
import Viewport from "./Viewport";
import fragment from "../../glsl/fragment.glsl";

class Renderer extends EventEmitter{
    constructor() {
        super();

        this.el = document.createElement("canvas");
        this.ctx = this.el.getContext('webgl');

        // this.ctx.

        document.body.appendChild(this.el);

        this.attach();
    }

    onResize({width, height}){
        this.el.width = width;
        this.el.height = height;
    }

    attach(){
        Viewport.on('resize', this.onResize.bind(this));
    }
}

export default Renderer;
export { Renderer };
