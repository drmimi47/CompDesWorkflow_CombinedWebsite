document.addEventListener('DOMContentLoaded', function () {
    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f0f23, 10, 50);

    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.setClearColor(0x0f0f23);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.getElementById('threejs-canvas-2').appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(10, 10, 10);
    directional.castShadow = true;
    scene.add(directional);

    // Ground
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshStandardMaterial({ color: 0x2c2c54 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Objects
    const objects = [];

    // Metallic sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8, roughness: 0.2 })
    );
    sphere.position.set(-4, 0, 0);
    sphere.castShadow = true;
    objects.push(sphere);

    // Glass-like cube
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshPhysicalMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.5, transmission: 1 })
    );
    cube.position.set(0, 0, 0);
    cube.castShadow = true;
    objects.push(cube);

    // Plastic cone
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(1, 3, 16),
        new THREE.MeshStandardMaterial({ color: 0xf9ca24, roughness: 0.9 })
    );
    cone.position.set(4, 0, 0);
    cone.castShadow = true;
    objects.push(cone);

    objects.forEach(obj => scene.add(obj));

    // Animate
    function animate() {
        requestAnimationFrame(animate);

        objects[0].rotation.y += 0.01;
        objects[1].rotation.x += 0.005;
        objects[1].rotation.y += 0.008;
        objects[2].rotation.z += 0.01;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        const width = 800;
        const height = 600;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
