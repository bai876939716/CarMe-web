// 类型定义

/** 每个车型的 3D 模型调整配置（存于 model_config 字段，JSON 字符串） */
export type ModelConfig = {
  /** 整体缩放比，默认 1 */
  scale?: number;
  /** 绕 Y 轴旋转弧度，用于修正模型朝向，默认 0 */
  rotationY?: number;
  /** Y 轴位移，用于将车辆底部对齐地面，默认 0 */
  positionY?: number;
  /** 四轮挂点坐标 [x, y, z]（世界坐标） */
  wheels?: {
    FL?: [number, number, number];
    FR?: [number, number, number];
    RL?: [number, number, number];
    RR?: [number, number, number];
  };
};

/** 对应后端 CarModel 实体 */
export type CarModel = {
  id: number;
  name: string;
  brand?: string;
  series?: string;
  year?: number;
  modelUrl?: string;
  thumbnailUrl?: string;
  coverGradient?: string;
  description?: string;
  isActive?: boolean;
  /** 模型调整配置，JSON 字符串，解析为 ModelConfig */
  modelConfig?: string;
};

/** 对应后端 Part 实体 */
export type Part = {
  id: number;
  name: string;
  category: string;
  /** 颜色 Hex 或模型路径 */
  partValue?: string;
  brand?: string;
  price?: number;
  originalPrice?: number;
  thumbnailUrl?: string;
  coverGradient?: string;
  description?: string;
  rating?: number;
  salesCount?: number;
  isNew?: boolean;
  isHot?: boolean;
  isActive?: boolean;
};

/** 对应后端 Work 实体 */
export type Work = {
  id?: number;
  userId?: number;
  carModelId: number;
  title?: string;
  description?: string;
  selectedParts: string;
  coverGradient?: string;
  isPublic?: boolean;
  likesCount?: number;
  commentsCount?: number;
  favoritesCount?: number;
  createdAt?: string;
};

export type CommunityPost = {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  carName: string;
  title: string;
  description: string;
  coverGradient: string;
  likes: number;
  comments: number;
  favorites: number;
  tags: string[];
  createdAt: string;
  isLiked?: boolean;
  isFavorited?: boolean;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  coverGradient: string;
  rating: number;
  sales: number;
  compatibleCars: string[];
  description: string;
  isNew?: boolean;
  isHot?: boolean;
};

export type UserProfile = {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  worksCount: number;
  level: string;
};
