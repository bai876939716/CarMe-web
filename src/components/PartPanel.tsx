import { useEffect, useState } from 'react';
import { Card, Button, Space, App as AntdApp } from 'antd';
import { useWorkshopStore } from '../stores/workshopStore';
import type { Part } from '../types';

export const PartPanel = () => {
  const { message } = AntdApp.useApp();
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true);
        await Promise.all([loadWheels(), loadColors()]);
      } catch (error) {
        console.error('加载配件失败:', error);
        message.error('加载配件失败，请检查后端服务是否启动');
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, [loadWheels, loadColors]);

  const handleSaveWork = async () => {
    try {
      await saveWork();
      message.success('方案保存成功！');
    } catch (error) {
      console.error('保存方案失败:', error);
      message.error('保存方案失败，请检查后端服务是否启动');
    }
  };

  return (
    <div style={{ padding: '20px', height: '100vh', overflowY: 'auto' }}>
      <h2>配件库</h2>

      {/* 轮毂选择 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>轮毂</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
          {wheels.map((wheel: Part) => (
            <Card
              key={wheel.id}
              size="small"
              hoverable
              onClick={() => setSelectedWheel(wheel)}
              style={{
                cursor: 'pointer',
                border:
                  selectedWheel?.id === wheel.id
                    ? '2px solid #1890ff'
                    : '1px solid #d9d9d9',
              }}
            >
              {wheel.name}
            </Card>
          ))}
        </Space>
      </div>

      {/* 改色选择 */}
      <div style={{ marginBottom: '30px' }}>
        <h3>改色</h3>
        <Space wrap>
          {colors.map((color: Part) => (
            <div
              key={color.id}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: color.partValue,
                border:
                  selectedColor?.id === color.id
                    ? '3px solid #1890ff'
                    : '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              title={color.name}
            />
          ))}
        </Space>
        {selectedColor && (
          <div style={{ marginTop: '10px' }}>
            已选择：{selectedColor.name}
          </div>
        )}
      </div>

      {/* 保存方案按钮 */}
      <Button type="primary" block onClick={handleSaveWork}>
        保存方案
      </Button>
    </div>
  );
};
