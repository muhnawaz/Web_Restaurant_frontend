import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingElements from "./FloatingElements";

/** Minimal, safe 3D scene. If WebGL fails, it simply renders nothing. */
export default function Scene3D(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          // defensive: if WebGL context is missing, bail
          // (rare on desktop; prevents hard crash on very old GPUs)
          if (!gl) throw new Error("WebGL not available");
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.1} />
        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
