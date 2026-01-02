import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// glTF loader
const loader = new GLTFLoader();

var model;

loader.load('public/models/web_logo_test.glb', function (gltf) {
  model = gltf.scene;
  scene.add(model);

}, undefined, function (error) {

  console.error(error);

});

// Set variables for the sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Setup a scene for the webpage
const scene = new THREE.Scene();
const canvas = document.getElementById("experience-canvas");
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// Change the camera position on the Z axis
camera.position.z = 1;

// Handle window resize
function handleResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
}

window.addEventListener("resize", handleResize);

// Render the scene
function animate() {
  if (model) {
    model.rotation.x += 0.001;
    model.rotation.y += 0.001;
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