import * as THREE from 'three';
const Orbit = require('three-orbit-controls')(THREE);
const {Stats} = require('three-stats');
import debounce from 'lodash/debounce';

class App {
	constructor() {

		this.lights = [];

		this.initScene();
		this.initCamera();
		this.initRenderer();
		this.initLight();
		this.initListeners();
		if (global.debug){
			this.initControls();
			this.initStats();
			this.addHelpers();
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

	initLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6, 0, 1);
		ambientLight.position.set(500, 500, 500);
		this.addToScene(ambientLight);

		const spotLight = new THREE.SpotLight(0xffffff, 0.6, 0, 1);
		spotLight.position.set(-300, 300, 300);
		spotLight.castShadow = true;
		this.lights.push(spotLight);
		this.addToScene(spotLight);
	}

	initListeners(){
		//window.addEventListener('resize', function(){}) //es5 : scope is window
		//window.addEventListener('resize', () => {}) // es6 : scope is Class (= App)

		window.addEventListener(
			'resize',
			debounce(this.onResize.bind(this), 500)
		);
	}

	onResize(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width/this.height;
		this.camera.updateProjectionMatrix();
	}

	initRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		this.renderer.shadowMap.enabled = true;
		document.body.appendChild(this.renderer.domElement);
	}

	initControls(){
		this.controls = new Orbit(this.camera, this.renderer.domElement);
	}

	initStats(){
		this.stats = new Stats();
		this.stats.showPanel(0); // 0 : fps | 1 : ms | 2 : mb | 3+ : custom
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

	addHelpers(){
		this.lights.forEach((item) => {
			this.addHelper(item.shadow.camera);
		});
	}

	addHelper(camera){
		const helper = new THREE.CameraHelper(camera);
		this.scene.add(helper);
	}


	addToScene(obj) {
		//debugger;
		this.scene.add(obj);
	}


}

export default App
