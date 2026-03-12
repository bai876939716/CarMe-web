import { useWorkshopStore } from '../stores/workshopStore';
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { CarModel, ModelConfig, Part } from '../types';

interface CarModel3DProps {
  car: CarModel;
}

// 解析 modelConfig JSON 字符串，解析失败时返回空对象
const parseModelConfig = (raw?: string): ModelConfig => {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ModelConfig;
  } catch {
    return {};
  }
};

// 错误边界组件，用于捕获模型加载失败（如 404）
class ModelErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('模型加载失败，已切换到兜底占位模型', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * 默认四轮挂点（基于占位盒车辆比例），当 modelConfig 未提供 wheels 时使用
 */
const DEFAULT_WHEEL_SOCKETS: Array<{
  id: string;
  position: [number, number, number];
  isLeft: boolean;
}> = [
  { id: 'FL', position: [-0.95, 0.28,  1.4], isLeft: true  },
  { id: 'FR', position: [ 0.95, 0.28,  1.4], isLeft: false },
  { id: 'RL', position: [-0.95, 0.28, -1.4], isLeft: true  },
  { id: 'RR', position: [ 0.95, 0.28, -1.4], isLeft: false },
];

/** 将 ModelConfig.wheels 合并成统一格式供 WheelSet 使用 */
const buildWheelSockets = (
  wheels?: ModelConfig['wheels']
): typeof DEFAULT_WHEEL_SOCKETS => {
  if (!wheels) return DEFAULT_WHEEL_SOCKETS;
  return [
    { id: 'FL', position: wheels.FL ?? [-0.95, 0.28,  1.4], isLeft: true  },
    { id: 'FR', position: wheels.FR ?? [ 0.95, 0.28,  1.4], isLeft: false },
    { id: 'RL', position: wheels.RL ?? [-0.95, 0.28, -1.4], isLeft: true  },
    { id: 'RR', position: wheels.RR ?? [ 0.95, 0.28, -1.4], isLeft: false },
  ];
};

// 单个轮子的几何体占位（当无配件 GLB 时）
const WheelGeo = ({
  position,
  color = '#222222',
}: {
  position: [number, number, number];
  color?: string;
}) => (
  <mesh position={position} rotation={[0, 0, Math.PI / 2]}>
    <cylinderGeometry args={[0.3, 0.3, 0.22, 32]} />
    <meshStandardMaterial color={color} metalness={0.85} roughness={0.2} />
  </mesh>
);

// 单个 GLB 轮毂 —— 每个实例 clone，避免四轮共享同一对象
const WheelGLTF = ({
  modelUrl,
  position,
  isLeft,
}: {
  modelUrl: string;
  position: [number, number, number];
  isLeft: boolean;
}) => {
  const { scene } = useGLTF(modelUrl);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive
      object={cloned}
      position={position}
      rotation={[0, isLeft ? Math.PI : 0, 0]}
    />
  );
};

/**
 * 四轮套件
 * - customWheels: 来自 modelConfig 的轮子挂点，若无则用默认值
 * - wheel: 当前选中的配件 Part
 */
const WheelSet = ({
  wheel,
  customWheels,
}: {
  wheel: Part | null;
  customWheels?: ModelConfig['wheels'];
}) => {
  const sockets = buildWheelSockets(customWheels);
  const isGlb =
    !!wheel?.partValue && wheel.partValue.toLowerCase().endsWith('.glb');

  return (
    <>
      {sockets.map(({ id, position, isLeft }) =>
        isGlb ? (
          <ModelErrorBoundary
            key={`${id}-${wheel!.partValue}`}
            fallback={<WheelGeo position={position} color="#333333" />}
          >
            <React.Suspense
              fallback={<WheelGeo position={position} color="#333333" />}
            >
              <WheelGLTF
                modelUrl={wheel!.partValue!}
                position={position}
                isLeft={isLeft}
              />
            </React.Suspense>
          </ModelErrorBoundary>
        ) : (
          <WheelGeo
            key={id}
            position={position}
            color={wheel ? '#333333' : '#666666'}
          />
        )
      )}
    </>
  );
};

// 兜底的占位几何体（车辆 GLB 不存在时）
const CarPlaceholder = ({ car: _car }: { car: CarModel }) => {
  const { selectedWheel, selectedColor } = useWorkshopStore();
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial
          color={selectedColor?.partValue || '#1890ff'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <WheelSet wheel={selectedWheel} />
    </group>
  );
};

// 实际加载 GLB 车辆模型的组件
const CarModelGLTF = ({ car }: { car: CarModel }) => {
  const { selectedColor, selectedWheel } = useWorkshopStore();
  const groupRef = useRef<THREE.Group>(null);

  const config = parseModelConfig(car.modelConfig);
  const scale  = config.scale    ?? 1;
  const rotY   = config.rotationY ?? 0;
  const posY   = config.positionY ?? 0;

  const { scene } = useGLTF(car.modelUrl || '/models/cars/placeholder.glb', true, true);

  // 响应车漆颜色变化
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (
          mat?.name &&
          (mat.name.toLowerCase().includes('paint') ||
            mat.name.toLowerCase().includes('body'))
        ) {
          mat.color.set(selectedColor?.partValue || '#1890ff');
          mat.metalness = 0.8;
          mat.roughness = 0.2;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene, selectedColor]);

  return (
    <group ref={groupRef}>
      {/* 车身 GLB：应用 scale / rotationY / positionY */}
      <primitive
        object={scene}
        scale={scale}
        rotation={[0, rotY, 0]}
        position={[0, posY, 0]}
      />
      {/* 拼接四个轮毂，使用 modelConfig 中的挂点坐标 */}
      <WheelSet wheel={selectedWheel} customWheels={config.wheels} />
    </group>
  );
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
