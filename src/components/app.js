import * as THREE from 'three';
const Orbit = require('three-orbit-controls')(THREE);
const {Stats} = require('three-stats');

class App {
	constructor() {
		this.initScene();
		this.initCamera();
		this.initRenderer();
		if (global.debug){
			this.initControls();
			this.initStats();
		}

		this.render();

	}

	initScene() {
		console.info('initScene');

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();

		if (global.debug){
			window.scene = this.scene;
			window.THREE = THREE;
		}
	}

	initCamera() {
		const fieldOfView = 60;
		const aspectRatio = window.innerWidth / window.innerHeight;
		const nearPlane = 1;
		const farPlane = 2000;

		this.camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		this.camera.position.set(500, 500, 500);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	initRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		document.body.appendChild(this.renderer.domElement);
	}

	initControls(){
		this.controls = new Orbit(this.camera, this.renderer.domElement);
	}

	initStats(){
		this.stats = new Stats();
		this.stats.showPanel(0); // 0 : fps | 1 :  | 2 :  | 3 :
		document.body.appendChild(this.stats.dom);
	}

	render() {
		requestAnimationFrame(() => {
			this.render();
		});

		if(this.stats) {
			this.stats.begin();
		}

		this.renderer.render(this.scene, this.camera);

		if(this.stats) {
			this.stats.end();
		}
	}

	addToScene(obj) {
		//debugger;
		this.scene.add(obj);
	}

	addLight() {
		this.light = new THREE.PointLight(0xffffff, 0.6, 0, 1);
		this.light.position.set(500, 500, 500);
		this.addToScene(this.light);
	}
}

export default App
