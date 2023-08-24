import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';


const Three = () => {

    useEffect(() => {

        const scene = new THREE.Scene();
        const loader = new GLTFLoader();
        loader.load('car.glb', (gltf) => {
            const model = gltf.scene; // The loaded model

            // Adjust the position and scale of the model
            model.position.set(0, 0, 4);
            model.scale.set(1.2, 1.2, 1.2);
            model.rotation.set(0, Math.PI / 4, 0);

            scene.add(model);
        });


        const size = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const light = new THREE.AmbientLight(0x404040);
        scene.add(light);

        // Add a directional light (sunlight)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        directionalLight.position.set(-5, 6, 20); // Adjust the position of the sunlight
        scene.add(directionalLight);

        // Add a point light
        const pointLight = new THREE.PointLight(0xff0000, 20);
        pointLight.position.set(-4, 3, -3); // Adjust the position of the point light
        scene.add(pointLight);

        // Add a spotlight
        const spotlight = new THREE.SpotLight(0x00ff00, 20);
        spotlight.position.set(3, 5, 5); // Adjust the position of the spotlight
        spotlight.angle = Math.PI / 8; // Set the spotlight cone angle
        scene.add(spotlight);


        const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
        camera.position.z = 10;

        scene.add(camera);


        const canvas = document.querySelector('.webgl');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(size.width, size.height);
        renderer.render(scene, camera);


        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = false;
        controls.enableZoom = false;

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

    }, []);

    return (
        <canvas className='webgl'></canvas>
    );
}

export default Three;
