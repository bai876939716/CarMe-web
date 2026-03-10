import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useWorkshopStore } from '../stores/workshopStore';
import { CarModel3D } from '../components/CarModel3D';
import React from 'react';

export const WorkshopScene = () => {
  const { selectedCar } = useWorkshopStore();

  return (
    <Canvas
      style={{ width: '100%', height: '100%', background: '#1e1e24' }}
      gl={{ antialias: true }}
    >
      {/* 相机 */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

      {/* 环境光 - 调亮 */}
      <ambientLight intensity={0.8} />

      {/* 半球光 - 模拟天空和地面的反射环境光，替代 Environment 贴图 */}
      <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#444444" />

      {/* 主光源 */}
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      {/* 辅助光源 - 照亮暗部 */}
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#b0c4de" />

      {/* 底部阴影 - 增加真实感 */}
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} />



      {/* 控制器 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2 + 0.1} // 限制视角不要钻到地下太多
      />

      {/* 车型模型 */}
      {selectedCar && <CarModel3D car={selectedCar} />}

      {/* 网格辅助线（可选，用于调试） */}
      <gridHelper args={[10, 10, '#444444', '#222222']} />
    </Canvas>
  );
};
