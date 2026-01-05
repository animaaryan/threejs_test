import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// glTF loader
const loader = new GLTFLoader();
var model;

// Setup a scene for the webpage
const scene = new THREE.Scene();
const canvas = document.getElementById("experience-canvas");

// Set variables for the sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Create the renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

// Load the GLB model
loader.load('public/models/web_logo_test.glb', function (gltf) {
  model = gltf.scene;
  model.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Change material properties`
      child.material.metalness = 0.6;
      child.material.roughness = 0.5;
      // child.material.wireframe = true;
    }
  })
  scene.add(model);

}, undefined, function (error) {

  console.error(error);

});

// Directional Light
const sun = new THREE.DirectionalLight(0xFFFFFF, 3);

// Add shadows
sun.castShadow = true;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;
sun.shadow.normalBias = 0.1;

// Set the sun's position
sun.position.set(70, 80, 0);
sun.target.position.set(35, 0, 0);
scene.add(sun);

// Add a shadow guide
const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
scene.add(shadowHelper);

// Add a directional light guide
const helper = new THREE.DirectionalLightHelper(sun, 0.1);
scene.add(helper);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  sizes.width / sizes.height, // Camera size
  0.1, // Near clip
  1000 // Far clip
);

// Add camera controls
const controls = new OrbitControls(camera, canvas);
controls.update();

// Change the camera position on the Z axis
camera.position.x = 0;
camera.position.y = 0.4;
camera.position.z = 0.6;

// Set camera rotation
camera.rotation.x = -0.5;

// Handle window resize
function handleResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height; 
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
