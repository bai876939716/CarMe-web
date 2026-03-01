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
  loadWorks: () => Promise<void>;
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
    set({ cars });
  },

  loadWheels: async () => {
    const wheels = await api.getParts('wheel');
    set({ wheels });
  },

  loadColors: async () => {
    const colors = await api.getParts('color');
    set({ colors });
  },

  saveWork: async () => {
    const { selectedCar, selectedWheel, selectedColor } = get();
    if (!selectedCar) return;

    const selectedParts = JSON.stringify({
      wheel: selectedWheel?.id || null,
      color: selectedColor?.id || null,
    });

    const work: Work = {
      carModelId: selectedCar.id,
      selectedParts,
    };

    await api.saveWork(work);
    await get().loadWorks();
  },

  loadWorks: async () => {
    const works = await api.getWorks();
    set({ works });
  },
}));
