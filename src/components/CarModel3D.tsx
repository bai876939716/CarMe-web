import { useWorkshopStore } from '../stores/workshopStore';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { CarModel } from '../types';

interface CarModel3DProps {
  car: CarModel;
}

export const CarModel3D = ({ car }: CarModel3DProps) => {
  const { selectedWheel, selectedColor } = useWorkshopStore();
  const groupRef = useRef<THREE.Group>(null);

  // 旋转动画（可选）
  useFrame(() => {
    if (groupRef.current) {
      // groupRef.current.rotation.y += 0.01; // 取消注释以启用自动旋转
    }
  });

  // 使用占位几何体（后续可以替换为真实模型）
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 车身占位 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial
          color={selectedColor?.partValue || '#1890ff'}
          metalness={0.5}
          roughness={0.3}
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
