import { create } from 'zustand';
import type { CarModel, Part, Work } from '../types/index';
import { api } from '../api/client';

interface WorkshopStore {
  // 状态
  selectedCar: CarModel | null;
  selectedWheel: Part | null;
  selectedColor: Part | null;
  works: Work[];
  cars: CarModel[];
  wheels: Part[];
  colors: Part[];

  // Actions
  setSelectedCar: (car: CarModel | null) => void;
  setSelectedWheel: (wheel: Part | null) => void;
  setSelectedColor: (color: Part | null) => void;
  loadCars: () => Promise<void>;
  loadWheels: () => Promise<void>;
  loadColors: () => Promise<void>;
  saveWork: () => Promise<void>;
  loadMyWorks: () => Promise<void>;
}

export const useWorkshopStore = create<WorkshopStore>((set, get) => ({
  // 初始状态
  selectedCar: null,
  selectedWheel: null,
  selectedColor: null,
  works: [],
  cars: [],
  wheels: [],
  colors: [],

  // Actions
  setSelectedCar: (car) => set({ selectedCar: car }),
  setSelectedWheel: (wheel) => set({ selectedWheel: wheel }),
  setSelectedColor: (color) => set({ selectedColor: color }),

  loadCars: async () => {
    const cars = await api.getCars();
    // 保证是数组，防止后端返回异常数据导致 .map 崩溃
    set({ cars: Array.isArray(cars) ? cars : [] });
  },

  loadWheels: async () => {
    const wheels = await api.getParts('wheel');
    set({ wheels: Array.isArray(wheels) ? wheels : [] });
  },

  loadColors: async () => {
    const colors = await api.getParts('color');
    set({ colors: Array.isArray(colors) ? colors : [] });
  },

  saveWork: async () => {
    const { selectedCar, selectedWheel, selectedColor } = get();
    if (!selectedCar) throw new Error('请先选择车型');

    const selectedParts = JSON.stringify({
      wheel: selectedWheel?.id ?? null,
      color: selectedColor?.id ?? null,
    });

    // 生成默认标题
    const parts: string[] = [];
    if (selectedWheel) parts.push(selectedWheel.name);
    if (selectedColor) parts.push(selectedColor.name);
    const title = parts.length > 0
      ? `${selectedCar.name} · ${parts.join(' + ')}`
      : `${selectedCar.name} 改装方案`;

    const work: Omit<Work, 'id' | 'userId' | 'createdAt'> = {
      carModelId: selectedCar.id,
      selectedParts,
      title,
      isPublic: false,
      coverGradient: selectedCar.coverGradient ?? 'linear-gradient(160deg, #0a0a14 0%, #0d1b3e 100%)',
    };

    await api.saveWork(work);

    // 刷新我的方案列表；单独 try-catch，不影响保存成功提示
    try {
      await get().loadMyWorks();
    } catch {
      // 静默失败，列表刷新失败不影响主流程
    }
  },

  loadMyWorks: async () => {
    const works = await api.getMyWorks();
    set({ works: Array.isArray(works) ? works : [] });
  },
}));
