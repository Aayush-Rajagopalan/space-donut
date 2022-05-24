import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusGeometry(5, 2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(25, 25, 25);

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);


const lightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(5000).fill().forEach(addStar);


//Add Backgrounds
//const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
//scene.background = spaceTexture;

scene.add(torus);

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  
}

animate()