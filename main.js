//import necessary libraries
import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //adds controls

//create a scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(90);
camera.position.setX(90);
camera.position.setY(0);

const geometry = new THREE.TorusGeometry(40, 3, 2, 100);
const geometry1 = new THREE.TorusGeometry(40, 3, 2, 100);
const geometry2 = new THREE.TorusGeometry(40, 0, 16, 100);


//change color of donuts
const material = new THREE.MeshStandardMaterial({ color: 0xf542f5});
const material1 = new THREE.MeshStandardMaterial({ color: 0x42f5ec});
const material2 = new THREE.MeshStandardMaterial({ color: 0x42f542});

//initialize donuts
const torus = new THREE.Mesh(geometry, material);
const torus1 = new THREE.Mesh(geometry1, material1);
const torus2 = new THREE.Mesh(geometry2, material2);


//initialize lights

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(25, 25, 25);

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);

const lightHelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//initilalize controls
const controls = new OrbitControls(camera, renderer.domElement);
/*
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 27 , 27);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(700));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(5000).fill().forEach(addStar); */


//Add Backgrounds
//const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
//scene.background = spaceTexture;

//add donut to scene
scene.add(torus, torus1, torus2);

torus.rotation.x = 180;
torus.rotation.y = 90 ;

torus1.rotation.x = 90;
torus1.rotation.y = 180 ;





function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.00;
  torus.rotation.y += 0.02; //1
  torus1.rotation.x += 0.00;
  torus1.rotation.y += 0.02;  //2 

  
  controls.update();
  renderer.render(scene, camera);
  
}

animate()