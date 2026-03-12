import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import { useWorkshopStore } from '../stores/workshopStore';
import { CarModel3D } from '../components/CarModel3D';
import React from 'react';

export const WorkshopScene = () => {
  const { selectedCar } = useWorkshopStore();

  return (
    <Canvas
      // 稍微压暗整体背景，减少“过曝”感
      style={{ width: '100%', height: '100%', background: '#c4cad8' }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // 降低曝光，让整体画面更稳重
        toneMappingExposure: 0.85,
      }}
    >
      {/* 相机：与车身中部等高，横向平视 */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={50} />

      {/* 环境贴图：提供整体环境光和高光反射 */}
      <Environment preset="studio" />

      {/* 环境光 + 主灯，整体亮度调低一点 */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[8, 10, 6]} intensity={1.0} />

      {/* 地面：单面渲染（只从上方可见），从底部仰视时自动透明不遮挡 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f3f4fb" roughness={0.8} />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={12} blur={3} far={6} color="#a1a6c0" />
      {/* 控制器 */}
      {/* target 设为车身中部高度，旋转时车辆始终在视野中心 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 1.0, 0]}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI}
      />

      {/* 车型模型 */}
      {selectedCar && <CarModel3D car={selectedCar} />}

      {/* 网格辅助线（可选，用于调试） */}
      <gridHelper args={[10, 10, '#444444', '#222222']} />
    </Canvas>
  );
};
