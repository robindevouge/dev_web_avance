import * as THREE from 'three';

class App {
	constructor() {
		this.initScene();
		this.initCamera();
		this.initRenderer();
	}

	initScene() {
		console.info('initScene');

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.scene = new THREE.Scene();
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
	}

	initRenderer() {
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(this.width, this.height);
		document.body.appendChild(this._renderer.domElement);
	}
	// render() {}
}

export default App
