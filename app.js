// variables for setup

let container;
let camera;
let renderer;
let scene;
let figure;


function init(){
    // get the container
    container = document.querySelector(".container");

    // create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const nearLimit = 0.1;
    const farLimit = 1000;

    // camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, nearLimit, farLimit);
    camera.position.set(15, 8, 70);

    // add Ambient light
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    // set light
    const light = new THREE.DirectionalLight(0xffffff, 6);
    light.position.set(50, 50, 100);
    scene.add(light);

    // Renderer 
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // load Model
    let loader = new THREE.GLTFLoader();
    loader.load("model/scene.gltf", function(gltf){
        scene.add(gltf.scene);
        console.log(scene)
        figure = gltf.scene.children[0];
        animate();

    })
};

function animate() {
    requestAnimationFrame(animate);
    figure.rotation.z += 0.005;
    renderer.render(scene, camera);
  };

init();

// media queries

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener("resize", onWindowResize);
  