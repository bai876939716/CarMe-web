import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { useWorkshopStore } from '../stores/workshopStore';
import { CarModel3D } from '../components/CarModel3D';

export const WorkshopScene = () => {
  const { selectedCar } = useWorkshopStore();

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      {/* 相机 */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

      {/* 环境光 */}
      <ambientLight intensity={0.5} />

      {/* 方向光 */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 环境 */}
      <Environment preset="sunset" />

      {/* 控制器 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
      />

      {/* 车型模型 */}
      {selectedCar && <CarModel3D car={selectedCar} />}

      {/* 网格辅助线（可选，用于调试） */}
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
};
