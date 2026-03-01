// 类型定义

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
