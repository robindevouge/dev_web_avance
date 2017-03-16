import * as THREE from 'three';

class Cube {
	constructor(name, w, h, d, col) {
		this.width = w;
		this.height = h;
		this.depth = d;
		this.color = col;
		this.create(name);
	}

	create(name) {
		// directly create the cube when calling a new instance of Cube then returning it in the const
		const geometry = new THREE.BoxBufferGeometry(this.width, this.height, this.depth);
		const material = new THREE.MeshBasicMaterial({
			color: this.color,
			wireframe: false
		});
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = name;
	}

}

export default Cube;
