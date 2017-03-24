/**
 * Main JS entry file
 */
import * as THREE from 'three';
import App from 'app';
import Cube from 'cube';

console.info('Ready! 🚀');

global.debug = true;


const app = new App();
const cubeOne = new Cube('cubeOne', 100, 100, 100, 0x00ff00);

app.addToScene(cubeOne.mesh);

app.addLight();
