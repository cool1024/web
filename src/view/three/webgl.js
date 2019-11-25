import { View } from '../../view';
import template from './webgl.html';
import { OrbitControls } from './OrbitControls';

import {
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    WebGLRenderer,
    Mesh,
    MeshBasicMaterial,
    ImageBitmapLoader,
    CanvasTexture
} from 'three';

export class WebGLView extends View {

    constructor() {
        super();
        this.setTemplate(template);
    }

    initView() {

        // 创建舞台，相机，渲染器
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.appendDom(this.renderer.domElement);

        // 创建一个立方体，并加入到舞台中
        this.material = new MeshBasicMaterial({ color: 'white' });
        this.geometry = new BoxGeometry(0.2, 0.2, 0.2);
        this.cube = new Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera.position.z = 5;

        // 加载贴图
        new ImageBitmapLoader()
            .setOptions({ imageOrientation: 'none' })
            .load('lib/textures/material.jpg', bitmap => {
                const texture = new CanvasTexture(bitmap);
                this.material.map = texture;
                this.material.needsUpdate = true;
            }, null, null);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        // 加载贴图素材
        // this.loader = new BasisTextureLoader();
        // this.loader.setTranscoderPath('lib/transcoder/');
        // this.loader.detectSupport(this.renderer);
        // this.loader.load('lib/textures/PavingStones.basis', texture => {
        //     texture.encoding = sRGBEncoding;
        //     this.material.map = texture;
        //     this.material.needsUpdate = true;
        // }, undefined, error => console.error(error));

        // 执行动画
        this.display();
    }

    display() {
        const camera = this.camera;
        const scene = this.scene;
        const cube = this.cube;
        const renderer = this.renderer;

        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            this.renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resize, false);
    }

}