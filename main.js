import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css'
/*import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'*/
import { setupCounter } from './counter.js'

const scene = new THREE.Scene(); //Creates the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Creates the camera
// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
}); //Creates the renderer
const geometry = new THREE.BoxGeometry(10, 10, 10); //Establishes the geometry
//set the color of the basic material in the object parameters `{}`
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } ); //Defines the material
const cube = new THREE.Mesh( geometry, material ); //Creates the cube
const ico = new THREE.IcosahedronGeometry(10); //Creates the icosahedron
const icoMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); //Defines the material of the icosahedron
const icoMesh = new THREE.Mesh(ico, icoMaterial); //Creates the mesh of the icosahedron
// Lights
const pointLight = new THREE.PointLight(0xffffff, 20); //Creates the primary light
const ambientLight = new THREE.AmbientLight(0xffffff); //Creates the ambient light
const directionLight = new THREE.DirectionalLight(0xffffff, 2);
directionLight.position.z = -3;


// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight); //Creates the light helper
const gridHelper = new THREE.GridHelper(200,50); //Creates the grid helper
// Orbit Control
const controls = new OrbitControls(camera, renderer.domElement) //Establishes the orbit controls
// Background
const spaceTexture = new THREE.TextureLoader().load('images/night_sky.jpg') //Creates and defines a texture
// Object texture mapping
const smileTexture = new THREE.TextureLoader().load('images/smile.jpg') //Creates and defines a texture
// Object texture mapping
const sphereGeometry = new THREE.SphereGeometry( 10, 22, 10 ); //Establishes the geometry of the sphere
const smileMaterial = new THREE.MeshStandardMaterial({map: smileTexture}) //Defines the material of the sphere
const smileMesh = new THREE.Mesh(sphereGeometry, smileMaterial); //Defines the mesh of the sphere
const normalTexture = new THREE.TextureLoader().load('images/normals/textureNormal.png'); //Creates and establishes the normal texture
// Normal Texture Map
const torusGeo = new THREE.TorusKnotGeometry( 5, 1, 250, 5, 9, 15 ); //Creates the torus knot
const torusMaterial = new THREE.MeshStandardMaterial( {
    normalMap: normalTexture,
    roughness: 0,
    metalness: .8
} ); //Defines the material of the torus knot
const torusKnot = new THREE.Mesh( torusGeo, torusMaterial ); //Creates the mesh for the torus knot

//Render and camera settings
renderer.render(scene, camera);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

//Cube position
cube.position.z = -15;
cube.position.x = -15;
cube.rotation.x = 2;
cube.rotation.y = .5;

//Icosahedron mesh position
icoMesh.position.z= -15;
icoMesh.position.x= 15;

//Lights positions
pointLight.position.set(0, -10, 10);
ambientLight.position.set(25, -15, -400);

pointLight.castShadow = true; // default false
//Set up shadow properties for the light
pointLight.shadow.mapSize.width = 512; // default
pointLight.shadow.mapSize.height = 512; // default
pointLight.shadow.camera.near = 0.5; // default
pointLight.shadow.camera.far = 500; // default

//ambientLight.castShadow = true; // default false
//Set up shadow properties for the light
//ambientLight.shadow.mapSize.width = 512; // default
//ambientLight.shadow.mapSize.height = 512; // default
//ambientLight.shadow.camera.near = 0.5; // default
//ambientLight.shadow.camera.far = 500; // default

scene.background = spaceTexture; //Applies a texture to the background

//Torus knot position
torusKnot.position.y = 20

//Adding everything to the scene
scene.add( cube );
scene.add(icoMesh);
scene.add(pointLight);
scene.add(ambientLight);
scene.add(directionLight);
scene.add(lightHelper)
scene.add(gridHelper)
scene.add(smileMesh);
scene.add( torusKnot );

function animate() {
    requestAnimationFrame( animate );
    // slowly rotate the cube:
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // rotate the icosahedron a little faster in the opposite direction:
    icoMesh.rotation.z += -0.03
    icoMesh.rotation.y += -0.03
    // ALLOWS YOUR ORBIT CONTROLS TO UPDATE LIVE IN REAL-TIME:
    // rotate the smiley sphere on the Y axis:
    smileMesh.rotation.y += 0.05
    controls.update()

    renderer.render( scene, camera );
}

animate(); //Causes the shapes to start moving