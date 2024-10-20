import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const SpaceTexture = new THREE.TextureLoader().load('milky_way.jpg');
scene.background = SpaceTexture;


const kopTexture = new THREE.TextureLoader().load('kreepykop.jpg');

const kop = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: kopTexture})
);

scene.add(kop);

// earth

const earthTexture = new THREE.TextureLoader().load('earthTexture.jpg');
const normalTexture = new THREE.TextureLoader().load('earth_normal_map.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = 30;
earth.position.setX(-10);

// const MoonTexture = new THREE.TextureLoader().load('Moon.jpg');

// const Moon = new Mesh(
//   new THREE.SphereGeometry(3,32,32),
//   new THREE.MeshStandardMaterial({
//     map: MoonTexture
//   })
// );

// scene.add(Moon);


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  kop.rotation.y += 0.01;
  kop.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.x +=0.01;
  earth.rotation.y +=0.005;
  earth.rotation.z +=0.005;

  kop.rotation.x +=0.001;
  kop.rotation.x +=0.001;
  kop.rotation.x +=0.001;
  renderer.render(scene, camera);
}

animate();