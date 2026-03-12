import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useWorkshopStore } from '../stores/workshopStore';
import { CarModel3D } from '../components/CarModel3D';
import React from 'react';

export const WorkshopScene = () => {
  const { selectedCar } = useWorkshopStore();

  return (
    <Canvas
      // 3D 场景改成偏「摄影棚」的浅灰蓝背景，整体更亮
      style={{ width: '100%', height: '100%', background: '#dfe3f0' }}
      gl={{ antialias: true }}
    >
      {/* 相机 */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

      {/* 环境光 - 提高整体明度 */}
      <ambientLight intensity={1.1} />

      {/* 半球光 - 更亮的顶光+地面反射 */}
      <hemisphereLight intensity={1.0} color="#ffffff" groundColor="#b7bac7" />

      {/* 主光源 - 类似摄影棚主灯 */}
      <directionalLight position={[8, 10, 6]} intensity={2.0} />

      {/* 辅助光源 - 提亮车身暗部，避免一侧死黑 */}
      <directionalLight position={[-6, 4, -4]} intensity={0.9} color="#c5d4ff" />

      {/* 地面与阴影 - 明亮的浅灰地面，阴影更柔和 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f3f4fb" roughness={0.8} />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={12} blur={3} far={6} color="#a1a6c0" />
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
