// 类型定义
export type CarModel = {
  id: number;
  name: string;
  modelUrl: string;
  thumbnailUrl?: string;
  description?: string;
};

export type Part = {
  id: number;
  name: string;
  category: 'wheel' | 'color';
  partValue: string; // 对应后端字段 partValue（数据库字段 part_value）
  thumbnailUrl?: string;
};

export type Work = {
  id?: number;
  carModelId: number;
  selectedParts: string; // JSON 字符串
  createdAt?: string;
};
