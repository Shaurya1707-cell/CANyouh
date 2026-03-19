import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface DessertCanProps {
  scrollProgress: number;
}

const DessertCan = ({ scrollProgress }: DessertCanProps) => {
  const canRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const smoothRef = useRef(0);
  const timeRef = useRef(0);

  /* ── Materials ── */

  // Metallic can body — realistic aluminum with warm coral tint
  const canMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#C8604F"),
        metalness: 0.92,
        roughness: 0.12,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
      }),
    []
  );

  // Polished metallic lid
  const lidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#D0C5B8"),
        metalness: 0.95,
        roughness: 0.08,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
      }),
    []
  );

  // Dark label band — matte printed look
  const labelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1E0F0A"),
        metalness: 0.15,
        roughness: 0.65,
        clearcoat: 0.2,
        clearcoatRoughness: 0.4,
      }),
    []
  );

  // Rich chocolate cake layer
  const cakeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2C1810"),
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  // Creamy frosting
  const creamMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#FFF3E0"),
        roughness: 0.5,
        metalness: 0.0,
        clearcoat: 0.3,
        clearcoatRoughness: 0.6,
        sheen: 0.5,
        sheenColor: new THREE.Color("#FFE0B2"),
      }),
    []
  );

  // Chocolate sauce drizzle
  const drizzleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3E2215"),
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  // Berry / topping
  const berryMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#C62828"),
        roughness: 0.4,
        metalness: 0.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
      }),
    []
  );

  // Pull-tab ring
  const tabMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#B0B0B0"),
        metalness: 0.98,
        roughness: 0.05,
        clearcoat: 0.8,
        reflectivity: 1,
      }),
    []
  );

  // Rim highlight ring
  const rimMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#E0D5C8"),
        metalness: 0.95,
        roughness: 0.06,
        clearcoat: 0.7,
      }),
    []
  );

  useFrame((_, delta) => {
    smoothRef.current += (scrollProgress - smoothRef.current) * 0.06;
    const p = smoothRef.current;
    timeRef.current += delta;

    if (canRef.current) {
      /*
       * SCROLL PHASES:
       * 0.00 → 0.25 : Can drops down from above, slight rotation
       * 0.25 → 0.50 : Can settles, tilts forward toward camera
       * 0.50 → 1.00 : Lid opens, revealing dessert inside
       */

      // Phase 1: Drop down (y: 4 → 0, with gentle overshoot)
      const dropProgress = Math.min(1, p / 0.25);
      const easedDrop = 1 - Math.pow(1 - dropProgress, 3);
      const overshoot =
        dropProgress > 0.7
          ? Math.sin((dropProgress - 0.7) * 10) * 0.15 * (1 - dropProgress)
          : 0;

      // Phase 2: Tilt forward (rotation.x: 0 → 0.3)
      const tiltProgress = Math.max(0, Math.min(1, (p - 0.2) / 0.3));
      const easedTilt = 1 - Math.pow(1 - tiltProgress, 2);

      // Gentle continuous wobble for liveliness
      const wobbleX = Math.sin(timeRef.current * 0.7) * 0.015;
      const wobbleZ = Math.cos(timeRef.current * 0.5) * 0.012;

      // Slow auto-rotation
      canRef.current.rotation.y += 0.003;

      // Combine: drop position
      canRef.current.position.y =
        THREE.MathUtils.lerp(4, 0, easedDrop) + overshoot + Math.sin(timeRef.current * 1.0) * 0.02;

      // Combine: tilt + wobble
      canRef.current.rotation.x = easedTilt * 0.25 + wobbleX;
      canRef.current.rotation.z = wobbleZ;

      // Zoom in slightly as can settles
      canRef.current.position.z = THREE.MathUtils.lerp(-0.5, 1.2, Math.min(1, p / 0.5));
    }

    if (lidRef.current) {
      // Lid opens after 50% scroll with realistic hinge physics
      const lidProgress = Math.max(0, (p - 0.5) / 0.5);
      // Eased with slight overshoot for realism
      const easedLid = lidProgress < 0.8
        ? 1 - Math.pow(1 - (lidProgress / 0.8), 3)
        : 1 + Math.sin((lidProgress - 0.8) * 15) * 0.03 * (1 - lidProgress) * 5;
      const clampedLid = Math.min(1, Math.max(0, easedLid));

      // Hinge rotation (opens backward like a real can lid)
      lidRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.75, clampedLid);
      // Lid lifts up and back
      lidRef.current.position.y = THREE.MathUtils.lerp(0.82, 1.15, clampedLid);
      lidRef.current.position.z = THREE.MathUtils.lerp(0, -0.55, clampedLid);
    }
  });

  return (
    <>
      {/* Realistic studio lighting */}
      <Environment preset="studio" />
      <ambientLight intensity={0.3} />

      {/* Key light — main illumination */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Fill light — soft warm */}
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#E8C8A0" />
      {/* Rim light — edge highlight for depth */}
      <directionalLight position={[0, 3, -5]} intensity={0.5} color="#FFD4C0" />
      {/* Under light — subtle warm bounce */}
      <pointLight position={[0, -3, 2]} intensity={0.2} color="#D4A090" />
      {/* Specular highlight point */}
      <pointLight position={[2, 4, 3]} intensity={0.6} color="#FFFFFF" />

      {/* Contact shadow on ground for realism */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.35}
        scale={6}
        blur={2.5}
        far={4}
        color="#3D2010"
      />

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
        <group ref={canRef} scale={1.8} position={[0, 4, -0.5]}>

          {/* ═══ CAN BODY ═══ */}
          <mesh material={canMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 1.6, 64]} />
          </mesh>

          {/* ═══ TOP RIM — realistic rolled edge ═══ */}
          <mesh position={[0, 0.82, 0]} material={rimMaterial}>
            <torusGeometry args={[0.5, 0.025, 16, 64]} />
          </mesh>

          {/* ═══ BOTTOM RIM ═══ */}
          <mesh position={[0, -0.82, 0]} material={rimMaterial}>
            <torusGeometry args={[0.5, 0.025, 16, 64]} />
          </mesh>

          {/* ═══ BOTTOM CAP ═══ */}
          <mesh position={[0, -0.83, 0]} material={lidMaterial}>
            <cylinderGeometry args={[0.48, 0.48, 0.03, 64]} />
          </mesh>

          {/* ═══ LABEL BAND ═══ */}
          <mesh position={[0, 0.05, 0]} material={labelMaterial}>
            <cylinderGeometry args={[0.508, 0.508, 0.9, 64]} />
          </mesh>

          {/* Label accent stripe (coral brand line) */}
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.512, 0.512, 0.06, 64]} />
            <meshStandardMaterial color="#D47060" metalness={0.4} roughness={0.3} />
          </mesh>

          {/* ═══ LID GROUP — hinged opening ═══ */}
          <group ref={lidRef} position={[0, 0.82, 0]}>
            {/* Lid disc */}
            <mesh material={lidMaterial} castShadow>
              <cylinderGeometry args={[0.49, 0.49, 0.04, 64]} />
            </mesh>

            {/* Score line ring on lid */}
            <mesh position={[0, 0.025, 0]}>
              <torusGeometry args={[0.38, 0.005, 8, 64]} />
              <meshStandardMaterial color="#A09080" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Pull-tab ring */}
            <group position={[0.18, 0.04, 0]} rotation={[0, 0, 0.1]}>
              <mesh material={tabMaterial}>
                <torusGeometry args={[0.06, 0.012, 8, 24]} />
              </mesh>
              {/* Tab connector */}
              <mesh position={[-0.06, 0, 0]} material={tabMaterial}>
                <boxGeometry args={[0.06, 0.01, 0.025]} />
              </mesh>
            </group>
          </group>

          {/* ═══ DESSERT LAYERS INSIDE ═══ */}

          {/* Bottom cake layer */}
          <mesh position={[0, 0.05, 0]} material={cakeMaterial}>
            <cylinderGeometry args={[0.45, 0.46, 0.45, 64]} />
          </mesh>

          {/* Middle cream layer */}
          <mesh position={[0, 0.35, 0]} material={creamMaterial}>
            <cylinderGeometry args={[0.44, 0.45, 0.2, 64]} />
          </mesh>

          {/* Top cream swirl (dome shape) */}
          <mesh position={[0, 0.52, 0]} material={creamMaterial}>
            <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>

          {/* Cream dollop peak */}
          <mesh position={[0, 0.65, 0]} material={creamMaterial}>
            <sphereGeometry args={[0.1, 24, 24]} />
          </mesh>

          {/* ── Chocolate drizzle lines ── */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 0.2;
            return (
              <mesh
                key={`drizzle-${i}`}
                position={[
                  Math.cos(angle) * r,
                  0.55,
                  Math.sin(angle) * r,
                ]}
                rotation={[0, -angle, Math.PI / 6]}
                material={drizzleMaterial}
              >
                <capsuleGeometry args={[0.012, 0.12, 4, 8]} />
              </mesh>
            );
          })}

          {/* ── Berry toppings ── */}
          {[
            { x: 0.12, z: 0.1, s: 0.055 },
            { x: -0.1, z: 0.13, s: 0.05 },
            { x: 0.05, z: -0.12, s: 0.06 },
            { x: -0.08, z: -0.08, s: 0.045 },
          ].map((b, i) => (
            <mesh
              key={`berry-${i}`}
              position={[b.x, 0.62 + b.s, b.z]}
              material={berryMaterial}
            >
              <sphereGeometry args={[b.s, 16, 16]} />
            </mesh>
          ))}

          {/* ── Cookie crumble bits ── */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const angle = (i / 10) * Math.PI * 2 + i * 0.3;
            const r = 0.15 + Math.random() * 0.18;
            return (
              <mesh
                key={`crumb-${i}`}
                position={[
                  Math.cos(angle) * r,
                  0.57 + Math.random() * 0.05,
                  Math.sin(angle) * r,
                ]}
                rotation={[Math.random(), Math.random(), Math.random()]}
              >
                <boxGeometry args={[0.025, 0.015, 0.02]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? "#5C3A20" : "#8B6040"}
                  roughness={0.9}
                />
              </mesh>
            );
          })}
        </group>
      </Float>
    </>
  );
};

export default DessertCan;
