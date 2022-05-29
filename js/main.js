import '../css/main.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import spaceimg from "/assets/space.jpg" 

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.rotateY(0.4)


const t = document.body.getBoundingClientRect().top;
camera.position.setZ(116 + (12 * t)/100);
console.log(`z = ${camera.position.z}`)
console.log(`t = ${t}`)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  console.log(`t = ${t}`)
  console.log(`z = ${camera.position.z}`)
  if (t <= 0  && t >= -2500){
    camera.position.z = (116 + (12 * t)/500);
    camera.position.x = t * -0.0005;
    camera.position.y = t * -0.0002;
  }
}



const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.render( scene, camera );

const spaceTexture = new THREE.TextureLoader().load(spaceimg);

const torus_geometry = new THREE.TorusGeometry(100, 3, 16, 100)
const torus_material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(torus_geometry, torus_material);

scene.add(torus)


var sphere;
var plgeometry;

function updateSize() {
  renderer.setSize( window.innerWidth, window.innerHeight );
  //geometry = new THREE.SphereGeometry( window.innerWidth / 1, 64);
  sphere = new THREE.Mesh( plgeometry, plmaterial );
}

const plmaterial = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, map: spaceTexture} );
plgeometry = new THREE.SphereGeometry( window.innerWidth / 12, 128);
sphere = new THREE.Mesh( plgeometry, plmaterial );
scene.add( sphere );
sphere.position.set(0, 0, 0);
sphere.rotateY(Math.PI / 2);



const parallaxMod = 0.0003
function onMouseMove(event) {
  //sphere.rotation.y = (parallaxMod * (event.clientX - window.innerWidth / 2)) + (Math.PI / 2);
  //sphere.rotation.x = (parallaxMod * (event.clientY - window.innerHeight / 2));
  camera.rotation.y =  - (parallaxMod * (event.clientX - window.innerWidth / 2));
  camera.rotation.x = - (parallaxMod * (event.clientY - window.innerHeight / 2));

}

const pointLight = new THREE.PointLight(0xFFFFFF, 0);
pointLight.position.set(0, 0, 0)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);


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




document.body.onscroll = moveCamera
window.addEventListener("resize", updateSize);
window.addEventListener("mousemove", onMouseMove, false);

var intens_up_or_down = 0
function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.05;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  sphere.rotation.x += 0.000;
  sphere.rotation.y += 0.0000;
  sphere.rotation.z += 0.0000;

  if (intens_up_or_down == 0) {
    if (pointLight.intensity <= 0.2){
      pointLight.intensity += 0.0001
    } else{
      intens_up_or_down = 1
    }
  } else {
    if (pointLight.intensity >= 0){
      pointLight.intensity -= 0.0001
    } else{
      intens_up_or_down = 0
    }
  }


  //controls.update();
  //console.log(camera.position.z)
  renderer.render(scene, camera);
}



animate()
console.log("yo");

