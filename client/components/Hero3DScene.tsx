import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractShapes() {
  const group = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Add mouse listener for parallax
  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      // Gentle rotation
      group.current.rotation.y += delta * 0.1;
      
      // Parallax effect based on mouse
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mousePosition.x * 1.5, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, mousePosition.y * 1.5, 0.05);
    }
  });

  return (
    <group ref={group}>
      {/* Central glowing distorted sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 32]} />
          <MeshDistortMaterial 
            color="#082b20" 
            emissive="#115c46"
            emissiveIntensity={0.4}
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.9} 
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Orbiting torus */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-2, 1, -1]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[0.8, 0.2, 16, 64]} />
          <meshPhysicalMaterial 
            color="#2a6d59" 
            metalness={0.8} 
            roughness={0.2}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Smaller floating gems */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[2, -1.5, 1]}>
          <octahedronGeometry args={[0.6]} />
          <meshPhysicalMaterial 
            color="#1f9b78" 
            metalness={1} 
            roughness={0} 
            transmission={0.9} 
            thickness={0.5}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-1.5, -2, 1.5]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshPhysicalMaterial 
            color="#a7f3d0" 
            metalness={0.5} 
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#34d399" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />
        
        <AbstractShapes />
        
        <Environment preset="city" />
        <ContactShadows 
          position={[0, -3.5, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
          color="#064e3b"
        />
      </Canvas>
    </div>
  );
}
