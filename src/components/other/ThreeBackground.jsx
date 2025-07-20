import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Icosahedron, Sphere, Box, ContactShadows } from '@react-three/drei';

const ThreeBackground = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={0.7} />
        <Environment preset="city" />
        {/* Floating geometric shapes */}
        <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
          <Icosahedron args={[1.8, 0]} position={[-4, 2, 0]}>
            <meshStandardMaterial color="#4f8cff" roughness={0.2} metalness={0.7} transparent opacity={0.7} />
          </Icosahedron>
        </Float>
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
          <Sphere args={[1.2, 32, 32]} position={[4, -1, -2]}>
            <meshStandardMaterial color="#fac921" roughness={0.3} metalness={0.6} transparent opacity={0.6} />
          </Sphere>
        </Float>
        <Float speed={1.8} rotationIntensity={1.1} floatIntensity={1.8}>
          <Box args={[1.5, 1.5, 1.5]} position={[0, -3, 1]}>
            <meshStandardMaterial color="#00e6a0" roughness={0.25} metalness={0.8} transparent opacity={0.5} />
          </Box>
        </Float>
        {/* Soft contact shadow for realism */}
        <ContactShadows position={[0, -4, 0]} opacity={0.25} scale={20} blur={2.5} far={10} />
        {/* No controls for user interaction, just animation */}
      </Canvas>
    </div>
  );
};

export default ThreeBackground; 