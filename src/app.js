import Renderer from "./js/modules/Renderer";


class App{
    constructor() {
        this.renderer = new Renderer();
    }

    run(){
        console.log('App is ready');
    }
}

const app = new App();

document.addEventListener('DOMContentLoaded', () => {
    app.run();
});
