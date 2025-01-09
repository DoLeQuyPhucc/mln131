import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  SpotLight,
} from "@react-three/drei";

// Duck Model Component (using a reliable model from drei examples)
const DuckModel = ({ isHovered }) => {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf"
  );
  const duckRef = useRef();

  useFrame((state, delta) => {
    if (duckRef.current) {
      // Idle animation
      duckRef.current.rotation.y += delta * 0.5;

      // Hover animation
      if (isHovered) {
        duckRef.current.position.y =
          Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        duckRef.current.position.y = 0;
      }
    }
  });

  return (
    <primitive object={scene} ref={duckRef} scale={2} position={[0, -0.5, 0]} />
  );
};

// Scene setup component
const SceneSetup = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    </>
  );
};

// Main Scene Component
const Scene3D = ({ isHovered }) => {
  return (
    <Canvas>
      <SceneSetup />
      <Suspense fallback={null}>
        <DuckModel isHovered={isHovered} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default Scene3D;
