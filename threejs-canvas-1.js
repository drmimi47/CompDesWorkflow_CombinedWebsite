// threejs-canvas-1.js - 3D Geometric Composition (without OrbitControls)

document.addEventListener('DOMContentLoaded', function() {
    // Scene setup
    const scene1 = new THREE.Scene();
    const camera1 = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer1 = new THREE.WebGLRenderer({ antialias: true });

    // Set up canvas size
    const canvas1Container = document.getElementById('threejs-canvas-1');
    const canvas1Width = 800;
    const canvas1Height = 600;

    renderer1.setSize(canvas1Width, canvas1Height);
    renderer1.setClearColor(0x1a1a2e);
    canvas1Container.appendChild(renderer1.domElement);

    // Create geometric composition
    const group1 = new THREE.Group();

    // Central cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff6b6b,
        wireframe: false 
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    group1.add(cube);

    // Orbiting spheres
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const sphereMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x4ecdc4 }),
        new THREE.MeshBasicMaterial({ color: 0x45b7d1 }),
        new THREE.MeshBasicMaterial({ color: 0xf9ca24 }),
        new THREE.MeshBasicMaterial({ color: 0xf0932b })
    ];

    const spheres = [];
    for (let i = 0; i < 4; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterials[i]);
        const angle = (i / 4) * Math.PI * 2;
        sphere.position.x = Math.cos(angle) * 4;
        sphere.position.z = Math.sin(angle) * 4;
        sphere.position.y = Math.sin(angle * 2) * 2;
        spheres.push(sphere);
        group1.add(sphere);
    }

    // Add geometric rings
    const ringGeometry = new THREE.RingGeometry(3, 3.2, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xeb4d4b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    group1.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.z = Math.PI / 2;
    group1.add(ring2);

    scene1.add(group1);

    // Position camera
    camera1.position.set(8, 6, 8);
    camera1.lookAt(0, 0, 0);

    // Simple mouse controls (alternative to OrbitControls)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    renderer1.domElement.addEventListener('mousemove', (event) => {
        const rect = renderer1.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
    });

    // Animation loop
    function animate1() {
        requestAnimationFrame(animate1);
        
        // Rotate the entire group
        group1.rotation.y += 0.01;
        
        // Add subtle camera movement based on mouse
        camera1.position.x += (targetX - camera1.position.x) * 0.05;
        camera1.position.y += (targetY - camera1.position.y) * 0.05;
        camera1.lookAt(0, 0, 0);
        
        // Rotate individual spheres
        spheres.forEach((sphere, index) => {
            sphere.rotation.x += 0.02;
            sphere.rotation.y += 0.01;
        });
        
        // Rotate rings
        ring1.rotation.z += 0.005;
        ring2.rotation.y += 0.008;
        
        renderer1.render(scene1, camera1);
    }

    // Start animation
    animate1();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera1.aspect = canvas1Width / canvas1Height;
        camera1.updateProjectionMatrix();
        renderer1.setSize(canvas1Width, canvas1Height);
    });
});