import { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import { useWorkshopStore } from '../stores/workshopStore';
import type { CarModel } from '../types';

export const CarSelector = () => {
  const { cars, selectedCar, setSelectedCar, loadCars } = useWorkshopStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        await loadCars();
      } catch (error) {
        console.error('加载车型失败:', error);
        message.error('加载车型失败，请检查后端服务是否启动');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [loadCars]);

  const handleChange = (value: number) => {
    const car = cars.find((c) => c.id === value);
    setSelectedCar(car || null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>选择车型</h2>
      <Select
        style={{ width: '100%', maxWidth: '400px' }}
        placeholder="请选择车型"
        value={selectedCar?.id}
        onChange={handleChange}
        loading={loading}
        options={cars.map((car: CarModel) => ({
          label: car.name,
          value: car.id,
        }))}
      />
      {selectedCar && (
        <div style={{ marginTop: '10px', color: '#666' }}>
          {selectedCar.description}
        </div>
      )}
      {!loading && cars.length === 0 && (
        <div style={{ marginTop: '10px', color: '#ff4d4f' }}>
          暂无车型数据，请检查后端服务是否启动
        </div>
      )}
    </div>
  );
};
