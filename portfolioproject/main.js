import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//Getting page to resize 
//This solution refreshes the whole page which I dont like.
window.onresize = function(){ location.reload(); }

//This solution stretches the canvas Which I also dont like
// const windowResize = () => {
//   const canvas = document.getElementById('bg');
//   canvas.width = window.innerWidth;
//   canvas.style.width = "inherit";
//   canvas.height = window.innerHeight;
//   canvas.style.height = "inherit";
//  renderer.setPixelRatio(window.devicePixelRatio);
//  renderer.setSize( window.innerWidth, window.innerHeight );
//  camera.position.setZ(50);
// renderer.render( scene, camera);
//}

// const windowResize = () => {
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize( window.innerWidth, window.innerHeight );
//}
//window.addEventListener('resize', windowResize)


//scene, camera, renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});






renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(50);

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

//trees
// const gLoader = new GLTFLoader();
// gLoader.load( 'models/trees_and_foliage/scene.gltf', function(gltf) {
//   scene.add(gltf.scene);
// }, undefined, function ( error) {
//   console.error(error);
// });



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
//
const spaceTexture = new THREE.TextureLoader().load('photos/space.jpg');
scene.background = spaceTexture;


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