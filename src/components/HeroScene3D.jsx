import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroScene3D
 * Monochromatic kinetic polyhedron with subtle orbital lattice.
 * Adheres to DESIGN.md Section 9:
 * - Controlled slow motion
 * - Monochrome metallic/matte materials with soft directional lighting
 * - Damped mouse parallax
 * - IntersectionObserver to freeze loop when out of viewport
 * - Fallback and respect for prefers-reduced-motion
 */
export default function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL support check
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Graceful fallback if WebGL not supported
      return;
    }

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    // Lighting: Monochromatic, soft rim highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Group for all rotating elements
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 1. Core Solid Faceted Geometry (Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.9,
      roughness: 0.22,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(coreMesh);

    // 2. Outer Wireframe Cage (Dodecahedron)
    const cageGeometry = new THREE.DodecahedronGeometry(1.68, 0);
    const cageEdges = new THREE.EdgesGeometry(cageGeometry);
    const cageMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });
    const cageWireframe = new THREE.LineSegments(cageEdges, cageMaterial);
    sculptureGroup.add(cageWireframe);

    // 3. Precision Vertex Pins (small subtle dots on cage vertices)
    const positions = cageGeometry.attributes.position.array;
    const vertexGroup = new THREE.Group();
    const pinGeometry = new THREE.SphereGeometry(0.024, 8, 8);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < positions.length; i += 3) {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      pin.position.set(positions[i], positions[i + 1], positions[i + 2]);
      vertexGroup.add(pin);
    }
    sculptureGroup.add(vertexGroup);

    // 4. Subtle Orbital Axis Ring
    const ringGeometry = new THREE.RingGeometry(2.1, 2.115, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
    });
    const orbitalRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitalRing.rotation.x = Math.PI / 2.3;
    sculptureGroup.add(orbitalRing);

    // Mouse Tracking state with smoothing (LERP)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      mouse.targetX = (clientX / width - 0.5) * 0.7;
      mouse.targetY = (clientY / height - 0.5) * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll interaction: slight rotation boost
    let scrollRotationOffset = 0;
    const handleScroll = () => {
      scrollRotationOffset = window.scrollY * 0.0012;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop management
    let animationFrameId;
    let isVisible = true;

    // IntersectionObserver to pause when hero is scrolled past
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            renderLoop();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const renderLoop = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        // Smooth mouse damping
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;

        // Controlled slow rotation
        sculptureGroup.rotation.y += delta * 0.22;
        sculptureGroup.rotation.x = mouse.y + scrollRotationOffset * 0.5;
        sculptureGroup.rotation.z = mouse.x * 0.5;

        // Counter-rotation of outer cage for dimension
        cageWireframe.rotation.y -= delta * 0.1;
        cageWireframe.rotation.x -= delta * 0.05;
        vertexGroup.rotation.copy(cageWireframe.rotation);
        orbitalRing.rotation.z += delta * 0.06;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Teardown
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Clean geometry/materials to prevent memory leaks
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageEdges.dispose();
      cageMaterial.dispose();
      pinGeometry.dispose();
      pinMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-canvas-container"
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '200px',
        maxHeight: '440px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    />
  );
}
