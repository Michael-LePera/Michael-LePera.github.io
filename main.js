import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import spaceimg from "/assets/space.jpg" 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const spaceTexture = new THREE.TextureLoader().load(spaceimg);

//scene.background = spaceTexture;

const geometry = new THREE.TorusGeometry(100, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//function starPlane(){
//  const geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
//  const material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, map: spaceTexture} );
//  const plane = new THREE.Mesh( geometry, material );
//  scene.add( plane );
//  plane.position.set(0, 0, -500);
//}


const plgeometry = new THREE.SphereGeometry( window.innerWidth / 12, 128);
const plmaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, map: spaceTexture} );
const sphere = new THREE.Mesh( plgeometry, plmaterial );
scene.add( sphere );
sphere.position.set(0, 0, 0);
sphere.rotateY(Math.PI / 2)
  

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)






const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  const minDist = 60
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)




function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera



function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.05;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  sphere.rotation.x += 0.000;
  sphere.rotation.y += 0.000;
  sphere.rotation.z += 0.000;

  controls.update();

  renderer.render(scene, camera);
}

animate()
console.log("yo");