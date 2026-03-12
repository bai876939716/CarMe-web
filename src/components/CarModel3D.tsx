import { useWorkshopStore } from '../stores/workshopStore';
import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { CarModel, ModelConfig, Part } from '../types';

interface CarModel3DProps {
  car: CarModel;
}

const parseModelConfig = (raw?: string): ModelConfig => {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ModelConfig;
  } catch {
    return {};
  }
};

type WheelStyle = { color: string; metalness: number; roughness: number };

const WHEEL_PALETTE: WheelStyle[] = [
  { color: '#E0E0E6', metalness: 0.95, roughness: 0.04 }, // 铬银
  { color: '#FF2222', metalness: 0.25, roughness: 0.35 }, // 鲜红
  { color: '#FFD700', metalness: 0.80, roughness: 0.08 }, // 亮金
  { color: '#00AAFF', metalness: 0.30, roughness: 0.30 }, // 天蓝
  { color: '#FF7700', metalness: 0.40, roughness: 0.25 }, // 橙铜
  { color: '#22DD44', metalness: 0.30, roughness: 0.30 }, // 荧光绿
  { color: '#CC44FF', metalness: 0.35, roughness: 0.30 }, // 紫色
];

const getWheelStyle = (wheel: Part | null): WheelStyle => {
  if (!wheel) return { color: '#666666', metalness: 0.6, roughness: 0.4 };
  return WHEEL_PALETTE[(wheel.id - 1) % WHEEL_PALETTE.length];
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
 * y 调整为 0.40，使默认占位轮毂半径加大后仍然落在地面上
 */
const DEFAULT_WHEEL_SOCKETS: Array<{
  id: string;
  position: [number, number, number];
  isLeft: boolean;
}> = [
  { id: 'FL', position: [-0.95, 0.4, 1.4], isLeft: true },
  { id: 'FR', position: [0.95, 0.4, 1.4], isLeft: false },
  { id: 'RL', position: [-0.95, 0.4, -1.4], isLeft: true },
  { id: 'RR', position: [0.95, 0.4, -1.4], isLeft: false },
];

/** 将 ModelConfig.wheels 合并成统一格式供 WheelSet 使用 */
const buildWheelSockets = (
  wheels?: ModelConfig['wheels']
): typeof DEFAULT_WHEEL_SOCKETS => {
  if (!wheels) return DEFAULT_WHEEL_SOCKETS;
  return [
    { id: 'FL', position: wheels.FL ?? [-0.95, 0.4, 1.4], isLeft: true },
    { id: 'FR', position: wheels.FR ?? [0.95, 0.4, 1.4], isLeft: false },
    { id: 'RL', position: wheels.RL ?? [-0.95, 0.4, -1.4], isLeft: true },
    { id: 'RR', position: wheels.RR ?? [0.95, 0.4, -1.4], isLeft: false },
  ];
};

const WheelGeo = ({
  position,
  style,
}: {
  position: [number, number, number];
  style: WheelStyle;
}) => (
  <group position={position} rotation={[0, 0, Math.PI / 2]}>
    {/* 外圈轮胎：更粗、更接近真实比例 */}
    <mesh>
      <cylinderGeometry args={[0.4, 0.4, 0.28, 64]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
    </mesh>
    {/* 内圈轮毂盘：根据不同 Part 给不同的金属色 */}
    <mesh>
      <cylinderGeometry args={[0.28, 0.28, 0.3, 32]} />
      <meshStandardMaterial
        color={style.color}
        metalness={style.metalness}
        roughness={style.roughness}
      />
    </mesh>
  </group>
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
  const style = getWheelStyle(wheel);

  return (
    <>
      {sockets.map(({ id, position, isLeft }) =>
        isGlb ? (
          <ModelErrorBoundary
            key={`${id}-${wheel!.partValue}`}
            fallback={<WheelGeo position={position} style={style} />}
          >
            <React.Suspense
              fallback={<WheelGeo position={position} style={style} />}
            >
              <WheelGLTF
                modelUrl={wheel!.partValue!}
                position={position}
                isLeft={isLeft}
              />
            </React.Suspense>
          </ModelErrorBoundary>
        ) : (
          <WheelGeo key={id} position={position} style={style} />
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

  // 按名称精确控制原 GLB 轮毂的可见性：
  // 选中轮毂时隐藏原轮毂；未选中时恢复显示
  useEffect(() => {
    if (!scene) return;
    const hideNodes = config.hideNodes ?? [];
    if (hideNodes.length === 0) return;
    const shouldHide = !!selectedWheel;
    scene.traverse((child) => {
      if (hideNodes.includes(child.name)) {
        child.visible = !shouldHide;
      }
    });
  }, [scene, selectedWheel]);

  // 车漆换色：优先匹配 paint/body 命名材质，若无则对所有不透明网格生效（兼容 Tripo）
  useEffect(() => {
    if (!scene || !selectedColor?.partValue) return;
    const targetColor = selectedColor.partValue;
    let paintFound = false;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mat = child.material as THREE.MeshStandardMaterial;
      if (!mat?.name) return;
      const n = mat.name.toLowerCase();
      if (n.includes('paint') || n.includes('body')) {
        mat.color.set(targetColor);
        mat.metalness = 0.8;
        mat.roughness = 0.2;
        mat.needsUpdate = true;
        paintFound = true;
      }
    });

    if (!paintFound) {
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mat = child.material as THREE.MeshStandardMaterial;
        if (!mat) return;
        if (mat.transparent && mat.opacity < 0.5) return;
        mat.color.set(targetColor);
        mat.needsUpdate = true;
      });
    }
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
      {/* 选中轮毂配件时才渲染外挂轮毂，否则保留原 GLB 轮毂 */}
      {selectedWheel && <WheelSet wheel={selectedWheel} customWheels={config.wheels} />}
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
