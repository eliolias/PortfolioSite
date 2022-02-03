import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//scene, camera, renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);
//torus model
const geometry = new THREE.TorusGeometry(10, 3, 18, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 });const torus = new THREE.Mesh( geometry, material);
scene.add(torus)

//lighting
const pointLight = new THREE.PointLight(0xffffff)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
pointLight.position.set(0,0,1)
scene.add(lightHelper, gridHelper)

//OrbitControls 

const controls = new OrbitControls(camera, renderer.domElement);

//stars

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.1, 4, 2);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(500).fill().forEach(addStar)


//Animating
const animate = () => {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.003;
  torus.rotation.z += 0.003;

  controls.update();

  renderer.render(scene, camera);
}

animate()


//scene.add(torus, pointLight, ambientLight, lightHelper)