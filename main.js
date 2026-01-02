import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// glTF loader
const loader = new GLTFLoader();

var model;

loader.load( 'public/models/web_logo_test.glb', function ( gltf ) {
  model = gltf.scene;
  scene.add( model );

}, undefined, function ( error ) {

  console.error( error );

} );

// Setup a scene for the webpage
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;


// Render the scene
function animate() {
    if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


// Directional Light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);