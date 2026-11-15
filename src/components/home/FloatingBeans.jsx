import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Bean({ position, scale, rotation }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.35; });
  return (
    <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale} rotation={rotation}>
        <mesh scale={[1, 0.62, 0.48]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#503629" roughness={0.45} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.47]}>
          <boxGeometry args={[1.55, 0.07, 0.06]} />
          <meshStandardMaterial color="#1a100c" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

// Lightweight decorative scene: a few floating coffee beans. Lazy-loaded, desktop only.
export default function FloatingBeans() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#ffe2b8" />
      <pointLight position={[-4, -2, 3]} intensity={1.2} color="#C5A16A" />
      <Bean position={[-1.8, 1.4, 0]} scale={0.9} rotation={[0.5, 0.3, 0.6]} />
      <Bean position={[1.6, 0.7, -0.5]} scale={0.7} rotation={[0.2, 1, -0.4]} />
      <Bean position={[-0.4, -0.6, 0.4]} scale={1.05} rotation={[0.9, 0.2, 0.2]} />
      <Bean position={[1.9, -1.7, 0]} scale={0.6} rotation={[0.3, 0.6, 1.2]} />
      <Bean position={[-2.1, -1.6, -0.6]} scale={0.55} rotation={[1.1, 0.4, 0.1]} />
    </Canvas>
  );
}
