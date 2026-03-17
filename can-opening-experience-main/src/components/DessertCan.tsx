import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

interface DessertCanProps {
  scrollProgress: number;
}

const DessertCan = ({ scrollProgress }: DessertCanProps) => {
  const canRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  // Smoothed scroll
  const smoothRef = useRef(0);

  // Can material
  const canMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FF6B00"),
        metalness: 0.8,
        roughness: 0.15,
      }),
    []
  );

  const lidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C0C0C0"),
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  const cakeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#4A2C2A"),
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  const creamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFF5E6"),
        roughness: 0.7,
        metalness: 0.0,
      }),
    []
  );

  const toppingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8B4513"),
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  useFrame(() => {
    smoothRef.current += (scrollProgress - smoothRef.current) * 0.05;
    const p = smoothRef.current;

    if (canRef.current) {
      // Slow rotation
      canRef.current.rotation.y += 0.003;
      // Tilt based on scroll
      canRef.current.rotation.x = THREE.MathUtils.lerp(-0.1, 0.15, p);
      // Zoom effect via position
      canRef.current.position.z = THREE.MathUtils.lerp(0, 1.5, p);
      canRef.current.position.y = THREE.MathUtils.lerp(0, 0.3, p);
    }

    if (lidRef.current) {
      // Lid opens after 30% scroll
      const lidProgress = Math.max(0, (p - 0.3) / 0.7);
      const easedLid = 1 - Math.pow(1 - lidProgress, 3);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.7, easedLid);
      lidRef.current.position.y = THREE.MathUtils.lerp(0.82, 1.1, easedLid);
      lidRef.current.position.z = THREE.MathUtils.lerp(0, -0.5, easedLid);
    }
  });

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#FF6B00" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#FF8C3A" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={canRef} scale={1.8}>
          {/* Can body */}
          <mesh material={canMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 1.6, 64]} />
          </mesh>

          {/* Can rim (top) */}
          <mesh position={[0, 0.82, 0]} material={lidMaterial}>
            <cylinderGeometry args={[0.52, 0.52, 0.04, 64]} />
          </mesh>

          {/* Can bottom */}
          <mesh position={[0, -0.82, 0]} material={lidMaterial}>
            <cylinderGeometry args={[0.52, 0.52, 0.04, 64]} />
          </mesh>

          {/* Label band */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.505, 0.505, 0.8, 64]} />
            <meshStandardMaterial color="#3D1F16" metalness={0.3} roughness={0.5} />
          </mesh>

          {/* Lid group */}
          <group ref={lidRef} position={[0, 0.82, 0]}>
            <mesh material={lidMaterial} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.06, 64]} />
            </mesh>
            {/* Pull tab */}
            <mesh position={[0.15, 0.04, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.2, 0.02, 0.08]} />
              <meshStandardMaterial color="#A0A0A0" metalness={0.95} roughness={0.05} />
            </mesh>
          </group>

          {/* Dessert layers inside (visible when lid opens) */}
          {/* Cake layer */}
          <mesh position={[0, 0.2, 0]} material={cakeMaterial}>
            <cylinderGeometry args={[0.46, 0.46, 0.35, 64]} />
          </mesh>

          {/* Cream layer */}
          <mesh position={[0, 0.45, 0]} material={creamMaterial}>
            <cylinderGeometry args={[0.46, 0.44, 0.2, 64]} />
          </mesh>

          {/* Topping bumps */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 0.25,
                0.6,
                Math.sin((i / 6) * Math.PI * 2) * 0.25,
              ]}
              material={toppingMaterial}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
            </mesh>
          ))}

          {/* Cream swirl on top */}
          <mesh position={[0, 0.62, 0]} material={creamMaterial}>
            <sphereGeometry args={[0.15, 32, 32]} />
          </mesh>
        </group>
      </Float>
    </>
  );
};

export default DessertCan;
