import axios from 'axios';
import type { CarModel, Part, Work } from '../types/index';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // 获取所有车型
  getCars: async (): Promise<CarModel[]> => {
    const response = await apiClient.get<CarModel[]>('/cars');
    return response.data;
  },

  // 获取配件列表
  getParts: async (category?: string): Promise<Part[]> => {
    const params = category ? { category } : {};
    const response = await apiClient.get<Part[]>('/parts', { params });
    return response.data;
  },

  // 保存方案
  saveWork: async (work: Work): Promise<Work> => {
    const response = await apiClient.post<Work>('/works', work);
    return response.data;
  },

  // 获取所有方案
  getWorks: async (): Promise<Work[]> => {
    const response = await apiClient.get<Work[]>('/works');
    return response.data;
  },
};
