import {EventEmitter} from "events";
import Viewport from "./Viewport";
import * as THREE from "three";

class Renderer extends EventEmitter{
    constructor() {
        super();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, Viewport.width / Viewport.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(Viewport.width, Viewport.height);

        document.body.appendChild(this.renderer.domElement);

        this.attach();

        this.build();

        this.render();
    }

    build(){
        this.geometry = new THREE.SphereGeometry(5, 64, 64);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xFF0000
        });
        this.circle = new THREE.Mesh(this.geometry, this.material);

        this.light = new THREE.PointLight( 0xFFFFFF, 0, 100 );

        this.scene.add(this.light);
        this.scene.add(this.circle);

        this.camera.position.z = 30;
    }

    render(){
        window.requestAnimationFrame(this.render.bind(this));
        this.camera.lookAt(this.circle.position);
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        // this.circle.rotation.z += 1;
        // this.circle.rotation.x += 1;
        // this.circle.rotation.y += 1;
        this.renderer.render(this.scene, this.camera);
    }

    onResize({width, height}){
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove({clientX, clientY}){
        let xDelta = ((clientX - (Viewport.width * 0.5)) / Viewport.width);
        let yDelta = ((clientY - Viewport.height * 0.5) / Viewport.height) * -1;
        let xRatio = (clientX + (Viewport.width * 0.5)) / Viewport.width;
        let yRatio = (clientY + (Viewport.height * 0.5)) / Viewport.height;
        this.camera.position.x = xDelta * 2;
        this.camera.position.y = yDelta * 2;
    }

    attach(){
        Viewport.on('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
}

export default Renderer;
export { Renderer };
