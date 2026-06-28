// ======================================================
// TECHVERSE 3D WEBSITE
// PART 1
// Scene • Camera • Renderer • Lights • Objects
// ======================================================

// ---------- Loader ----------

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        },1200);

    }

});

// ---------- Scene ----------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050816);

// ---------- Camera ----------

const camera = new THREE.PerspectiveCamera(

    75,

    window.innerWidth/window.innerHeight,

    0.1,

    1000

);

camera.position.set(0,0,20);

// ---------- Renderer ----------

const renderer = new THREE.WebGLRenderer({

    canvas:document.querySelector("#bg"),

    antialias:true

});

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(window.devicePixelRatio);

// ---------- Lights ----------

const ambientLight = new THREE.AmbientLight(

    0xffffff,

    0.8

);

scene.add(ambientLight);

const pointLight = new THREE.PointLight(

    0x66ccff,

    2

);

pointLight.position.set(20,20,20);

scene.add(pointLight);

// ======================================================
// STARS
// ======================================================

const stars=[];

function createStar(){

    const geometry = new THREE.SphereGeometry(

        0.12,

        10,

        10

    );

    const material = new THREE.MeshStandardMaterial({

        color:0xffffff,

        emissive:0x666666

    });

    const star = new THREE.Mesh(

        geometry,

        material

    );

    star.position.set(

        THREE.MathUtils.randFloatSpread(250),

        THREE.MathUtils.randFloatSpread(250),

        THREE.MathUtils.randFloatSpread(250)

    );

    scene.add(star);

    stars.push(star);

}

for(let i=0;i<1500;i++){

    createStar();

}

// ======================================================
// FLOATING CUBE
// ======================================================

const cubeGeometry = new THREE.BoxGeometry(

    3,

    3,

    3

);

const cubeMaterial = new THREE.MeshStandardMaterial({

    color:0x00bfff,

    metalness:0.8,

    roughness:0.2

});

const cube = new THREE.Mesh(

    cubeGeometry,

    cubeMaterial

);

cube.position.set(-6,0,0);

scene.add(cube);

// ======================================================
// FLOATING SPHERE
// ======================================================

const sphereGeometry = new THREE.SphereGeometry(

    2,

    64,

    64

);

const sphereMaterial = new THREE.MeshStandardMaterial({

    color:0xff00ff,

    metalness:0.7,

    roughness:0.2

});

const sphere = new THREE.Mesh(

    sphereGeometry,

    sphereMaterial

);

sphere.position.set(6,0,0);

scene.add(sphere);

// ======================================================
// TORUS
// ======================================================

const torusGeometry = new THREE.TorusGeometry(

    2,

    0.5,

    32,

    100

);

const torusMaterial = new THREE.MeshStandardMaterial({

    color:0x00ff99,

    metalness:0.8,

    roughness:0.2

});

const torus = new THREE.Mesh(

    torusGeometry,

    torusMaterial

);

torus.position.set(0,-5,-5);

scene.add(torus);
// ======================================================
// PART 2
// Floating Particles • Mouse Movement • Scroll Effects
// ======================================================

// ---------- Floating Particles ----------

const particles = [];

function createParticle() {

    const geometry = new THREE.SphereGeometry(0.08,8,8);

    const material = new THREE.MeshBasicMaterial({

        color:0x66ccff

    });

    const particle = new THREE.Mesh(

        geometry,

        material

    );

    particle.position.set(

        THREE.MathUtils.randFloatSpread(200),

        THREE.MathUtils.randFloatSpread(200),

        THREE.MathUtils.randFloatSpread(200)

    );

    scene.add(particle);

    particles.push(particle);

}

for(let i=0;i<400;i++){

    createParticle();

}

// ---------- Mouse Parallax ----------

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove",(event)=>{

    mouseX = (event.clientX/window.innerWidth - 0.5);

    mouseY = (event.clientY/window.innerHeight - 0.5);

});

// ---------- Hero Button ----------

const startButton = document.getElementById("startBtn");

if(startButton){

    startButton.addEventListener("click",()=>{

        window.scrollTo({

            top:window.innerHeight,

            behavior:"smooth"

        });

    });

}

// ---------- Restart Button ----------

const restartButton = document.getElementById("restart");

if(restartButton){

    restartButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

// ---------- Scroll Value ----------

let scrollValue = 0;

window.addEventListener("scroll",()=>{

    scrollValue = window.scrollY;

});

// ---------- Window Resize ----------

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});
// ======================================================
// PART 3
// Main Animation Loop
// ======================================================

function animate(){

    requestAnimationFrame(animate);

    // ---------- Cube ----------

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube.position.y = Math.sin(Date.now()*0.001)*1.5;

    // ---------- Sphere ----------

    sphere.rotation.y += 0.015;

    sphere.position.y = Math.cos(Date.now()*0.001)*1.5;

    // ---------- Torus ----------

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;

    // ---------- Camera Mouse Movement ----------

    camera.position.x += (mouseX*5-camera.position.x)*0.05;

    camera.position.y += (-mouseY*5-camera.position.y)*0.05;

    camera.lookAt(scene.position);

    // ---------- Scroll Animation ----------

    cube.rotation.z = scrollValue*0.002;

    sphere.rotation.x = scrollValue*0.002;

    torus.rotation.z = scrollValue*0.001;

    // ---------- Floating Particles ----------

    particles.forEach((particle,index)=>{

        particle.position.y += 0.02;

        particle.rotation.x += 0.02;

        particle.rotation.y += 0.02;

        if(particle.position.y>100){

            particle.position.y=-100;

        }

    });

    // ---------- Twinkling Stars ----------

    stars.forEach((star,index)=>{

        star.material.emissiveIntensity =

        0.3 + Math.sin(Date.now()*0.002+index)*0.7;

    });

    renderer.render(scene,camera);

}

animate();
// ======================================================
// PART 4
// GSAP Animations • Hero Effects • Final Polish
// ======================================================

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ---------- Hero Heading Animation ----------

gsap.from(".hero h1",{

    y:-80,

    opacity:0,

    duration:1.5,

    ease:"power3.out"

});

gsap.from(".hero p",{

    y:60,

    opacity:0,

    duration:1.5,

    delay:0.4,

    ease:"power3.out"

});

gsap.from("button",{

    scale:0,

    opacity:0,

    duration:1,

    delay:0.8,

    ease:"back.out(1.7)"

});

// ---------- Navigation ----------

gsap.from("header",{

    y:-100,

    opacity:0,

    duration:1.2

});

// ---------- Logo Floating ----------

gsap.to(".logo",{

    y:8,

    repeat:-1,

    yoyo:true,

    duration:2

});

// ---------- Hero Floating ----------

gsap.to(".hero",{

    y:15,

    repeat:-1,

    yoyo:true,

    duration:4

});

// ---------- Card Animations ----------

document.querySelectorAll(".card").forEach((card)=>{

    gsap.from(card,{

        opacity:0,

        y:100,

        duration:1,

        scrollTrigger:{

            trigger:card,

            start:"top 80%"

        }

    });

});

// ---------- Navigation Hover ----------

document.querySelectorAll("nav a").forEach((link)=>{

    link.addEventListener("mouseenter",()=>{

        gsap.to(link,{

            scale:1.15,

            duration:0.3

        });

    });

    link.addEventListener("mouseleave",()=>{

        gsap.to(link,{

            scale:1,

            duration:0.3

        });

    });

});

// ---------- Button Hover ----------

document.querySelectorAll("button").forEach((btn)=>{

    btn.addEventListener("mouseenter",()=>{

        gsap.to(btn,{

            scale:1.08,

            duration:0.3

        });

    });

    btn.addEventListener("mouseleave",()=>{

        gsap.to(btn,{

            scale:1,

            duration:0.3

        });

    });

});

// ---------- Cube Glow Animation ----------

gsap.to(cube.material.color,{

    r:0.3,

    g:0.9,

    b:1,

    repeat:-1,

    yoyo:true,

    duration:2

});

// ---------- Sphere Glow Animation ----------

gsap.to(sphere.material.color,{

    r:1,

    g:0.3,

    b:1,

    repeat:-1,

    yoyo:true,

    duration:2

});

// ---------- Torus Glow Animation ----------

gsap.to(torus.material.color,{

    r:0.2,

    g:1,

    b:0.6,

    repeat:-1,

    yoyo:true,

    duration:2

});

console.log("✅ TechVerse 3D Loaded Successfully");

