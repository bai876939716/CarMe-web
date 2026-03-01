import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useWorkshopStore } from '../stores/workshopStore';
import { WorkshopScene } from '../scenes/WorkshopScene';
import type { CarModel, Part } from '../types';

// 默认渐变色（后端未返回 coverGradient 时使用）
const DEFAULT_GRADIENTS = [
  'linear-gradient(160deg, #0a0a14 0%, #0d1b3e 100%)',
  'linear-gradient(160deg, #1a0800 0%, #4a1200 100%)',
  'linear-gradient(160deg, #001a0a 0%, #00400a 100%)',
  'linear-gradient(160deg, #080808 0%, #1c1c1c 100%)',
];

const getCarGradient = (car: CarModel, idx: number) =>
  car.coverGradient ?? DEFAULT_GRADIENTS[idx % DEFAULT_GRADIENTS.length];

// ---- Car Selection Screen ----
const CarSelectScreen = () => {
  const { cars, selectedCar, setSelectedCar, loadCars } = useWorkshopStore();
  const [loading, setLoading] = useState(false);
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    loadCars()
      .catch(() => message.error('加载车型失败'))
      .finally(() => setLoading(false));
  }, [loadCars]);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 48px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#00d4ff',
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          STEP 01 · SELECT YOUR CAR
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', margin: '0 0 14px', letterSpacing: -1 }}>
          选择你的车型
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          选好车型后，进入 3D 工坊开始定制
        </p>
      </div>

      {/* Car Grid */}
      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>加载车型中...</div>
      ) : cars.length === 0 ? (
        <div
          style={{
            background: 'rgba(255,107,53,0.08)',
            border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: 12,
            padding: '24px 40px',
            color: '#ff6b35',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          ⚠️ 暂无车型数据，请确认后端服务已启动
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
            width: '100%',
            maxWidth: 1000,
          }}
        >
          {cars.map((car, idx) => (
            <div
              key={car.id}
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
              onClick={() => setSelectedCar(car)}
              style={{
                background: getCarGradient(car, idx),
                border: `2px solid ${
                  selectedCar?.id === car.id
                    ? '#00d4ff'
                    : hoveredCar === car.id
                    ? 'rgba(0,212,255,0.3)'
                    : 'rgba(255,255,255,0.06)'
                }`,
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.25s',
                transform: hoveredCar === car.id ? 'translateY(-4px)' : 'none',
                boxShadow:
                  selectedCar?.id === car.id ? '0 0 30px rgba(0,212,255,0.25)' : 'none',
              }}
            >
              <div
                style={{
                  height: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 64,
                  position: 'relative',
                }}
              >
                🚗
                {selectedCar?.id === car.id && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 22,
                      height: 22,
                      background: '#00d4ff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      color: '#000',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <div style={{ padding: '16px 20px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                  {car.name}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {car.description || '点击选择此车型'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA：选中车型后可点击按钮进入工坊（双击确认机制，体验更好） */}
      {selectedCar && (
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            已选择：<span style={{ color: '#00d4ff', fontWeight: 600 }}>{selectedCar.name}</span>
          </div>
          <button
            onClick={() => {
              // selectedCar 已设置，WorkshopPage 会自动切换到工坊视图
              // 此处强制触发一次重新设置，确保状态更新
              setSelectedCar({ ...selectedCar });
            }}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
              border: 'none',
              borderRadius: 14,
              padding: '14px 56px',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 32px rgba(0,212,255,0.3)',
              letterSpacing: 0.5,
            }}
          >
            进入 3D 工坊 →
          </button>
        </div>
      )}
    </div>
  );
};

// ---- Workshop Sidebar ----
const WorkshopSidebar = () => {
  const {
    wheels,
    colors,
    selectedWheel,
    selectedColor,
    setSelectedWheel,
    setSelectedColor,
    loadWheels,
    loadColors,
    saveWork,
  } = useWorkshopStore();

  const [activeTab, setActiveTab] = useState<'wheel' | 'color' | 'bodykit' | 'wrap'>('wheel');

  useEffect(() => {
    Promise.all([loadWheels(), loadColors()]).catch(() =>
      message.error('加载配件失败')
    );
  }, [loadWheels, loadColors]);

  const handleSave = async () => {
    try {
      await saveWork();
      message.success('🎉 方案已保存！');
    } catch {
      message.error('保存失败，请检查后端服务');
    }
  };

  const tabs = [
    { key: 'wheel', label: '轮毂', icon: '⚙️' },
    { key: 'color', label: '车色', icon: '🎨' },
    { key: 'bodykit', label: '包围', icon: '🚗' },
    { key: 'wrap', label: '贴纸', icon: '🏷️' },
  ] as const;

  return (
    <div
      style={{
        width: 288,
        background: '#08080f',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
      }}
    >
      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 4px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.key ? '#00d4ff' : 'transparent'}`,
              padding: '14px 4px 12px',
              cursor: 'pointer',
              color: activeTab === tab.key ? '#00d4ff' : 'rgba(255,255,255,0.4)',
              fontSize: 11,
              fontWeight: activeTab === tab.key ? 700 : 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {activeTab === 'wheel' && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              选择轮毂 · {wheels.length} 款
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {wheels.map((wheel: Part) => (
                <div
                  key={wheel.id}
                  onClick={() => setSelectedWheel(selectedWheel?.id === wheel.id ? null : wheel)}
                  style={{
                    background:
                      selectedWheel?.id === wheel.id
                        ? 'rgba(0,212,255,0.1)'
                        : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${
                      selectedWheel?.id === wheel.id
                        ? 'rgba(0,212,255,0.5)'
                        : 'rgba(255,255,255,0.07)'
                    }`,
                    borderRadius: 10,
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'all 0.2s',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    ⚙️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: selectedWheel?.id === wheel.id ? '#00d4ff' : '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {wheel.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                      {wheel.brand || '通用款'}
                    </div>
                  </div>
                  {selectedWheel?.id === wheel.id && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        background: '#00d4ff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: '#000',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'color' && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              车身颜色 · {colors.length} 款
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {colors.map((color: Part) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(selectedColor?.id === color.id ? null : color)}
                  title={color.name}
                  style={{
                    aspectRatio: '1',
                    background: color.partValue,
                    borderRadius: 10,
                    cursor: 'pointer',
                    border: `2px solid ${
                      selectedColor?.id === color.id ? '#00d4ff' : 'rgba(255,255,255,0.1)'
                    }`,
                    boxShadow:
                      selectedColor?.id === color.id ? `0 0 12px ${color.partValue}66` : 'none',
                    transition: 'all 0.2s',
                    transform: selectedColor?.id === color.id ? 'scale(1.05)' : 'none',
                    position: 'relative',
                  }}
                >
                  {selectedColor?.id === color.id && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        color: color.partValue === '#FFFFFF' ? '#000' : '#fff',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectedColor && (
              <div
                style={{
                  marginTop: 16,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: selectedColor.partValue,
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
                <span style={{ fontSize: 13, color: '#fff' }}>{selectedColor.name}</span>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'bodykit' || activeTab === 'wrap') && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 40 }}>{activeTab === 'bodykit' ? '🚗' : '🏷️'}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
              即将推出
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              {activeTab === 'bodykit' ? '包围套件' : '车身贴纸'} 功能正在开发中
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #00d4ff, #0055ff)',
            border: 'none',
            borderRadius: 10,
            padding: '12px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          💾 保存方案
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '10px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            📤 分享
          </button>
          <button
            style={{
              flex: 1,
              background: 'rgba(255,107,53,0.08)',
              border: '1px solid rgba(255,107,53,0.2)',
              borderRadius: 10,
              padding: '10px',
              color: '#ff6b35',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            🛒 加入清单
          </button>
        </div>
      </div>
    </div>
  );
};

// ---- Main Workshop Page ----
export const WorkshopPage = () => {
  const { selectedCar, setSelectedCar } = useWorkshopStore();

  if (!selectedCar) {
    return <CarSelectScreen />;
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        background: '#050508',
        overflow: 'hidden',
      }}
    >
      {/* Left Sidebar */}
      <WorkshopSidebar />

      {/* Center: 3D Canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <WorkshopScene />

        {/* Top overlay bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '14px 20px',
            background: 'linear-gradient(to bottom, rgba(5,5,8,0.85) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ pointerEvents: 'all' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{selectedCar.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              3D 改装工坊 · 拖拽旋转 / 滚轮缩放
            </div>
          </div>
          <button
            onClick={() => setSelectedCar(null)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '7px 18px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 13,
              cursor: 'pointer',
              pointerEvents: 'all',
            }}
          >
            ← 换车
          </button>
        </div>

        {/* Bottom hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '6px 18px',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          🖱️ 拖拽旋转 · 滚轮缩放 · 左侧面板选配件
        </div>
      </div>
    </div>
  );
};
