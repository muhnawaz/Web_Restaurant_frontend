import { Float, MeshDistortMaterial } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export default function FloatingElements(props: GroupProps) {
  return (
    <group {...props}>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={1.5}>
        <mesh position={[-1.2, 0.6, 0]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <MeshDistortMaterial color="#FBBF24" roughness={0.2} metalness={0.6} envMapIntensity={0.6} distort={0.2} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
        <mesh position={[1.4, -0.2, 0]}>
          <torusKnotGeometry args={[0.5, 0.16, 128, 16]} />
          <MeshDistortMaterial color="#F59E0B" roughness={0.3} metalness={0.5} distort={0.15} />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1.1}>
        <mesh position={[0.3, 0.1, -0.8]}>
          <dodecahedronGeometry args={[0.6]} />
          <MeshDistortMaterial color="#FDE68A" roughness={0.25} metalness={0.5} distort={0.1} />
        </mesh>
      </Float>
    </group>
  );
}
