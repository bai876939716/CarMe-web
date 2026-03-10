import { useWorkshopStore } from '../stores/workshopStore';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { CarModel } from '../types';

interface CarModel3DProps {
  car: CarModel;
}

// 错误边界组件，用于捕获模型加载失败（如 404）
class ModelErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("模型加载失败，已切换到兜底占位模型", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 兜底的占位几何体组件
const CarPlaceholder = ({ car }: { car: CarModel }) => {
  const { selectedWheel, selectedColor } = useWorkshopStore();
  return (
    <group position={[0, 0, 0]}>
      {/* 车身占位 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial
          color={selectedColor?.partValue || '#1890ff'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* 轮毂占位 */}
      {[-1.2, 1.2].map((x) =>
        [-1.5, 1.5].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.3, z]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial
              color={selectedWheel ? '#333' : '#666'}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

// 实际加载模型的组件
const CarModelGLTF = ({ car }: { car: CarModel }) => {
  const { selectedColor } = useWorkshopStore();
  const groupRef = useRef<THREE.Group>(null);
  
  const { scene } = useGLTF(car.modelUrl || '/models/cars/placeholder.glb', true, true);

  useEffect(() => {
    if (scene) {
      // 遍历模型，动态修改车漆颜色
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 假设车漆材质名称包含 'paint' 或 'body'
          if (child.material && (child.material.name.toLowerCase().includes('paint') || child.material.name.toLowerCase().includes('body'))) {
            const mat = child.material as THREE.MeshStandardMaterial;
            mat.color.set(selectedColor?.partValue || '#1890ff');
            mat.metalness = 0.8;
            mat.roughness = 0.2;
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, selectedColor]);

  return <primitive object={scene} ref={groupRef} position={[0, 0, 0]} />;
};

export const CarModel3D = ({ car }: CarModel3DProps) => {
  if (!car.modelUrl) {
    return <CarPlaceholder car={car} />;
  }

  return (
    <ModelErrorBoundary fallback={<CarPlaceholder car={car} />}>
      <React.Suspense fallback={<CarPlaceholder car={car} />}>
        <CarModelGLTF car={car} />
      </React.Suspense>
    </ModelErrorBoundary>
  );
};
