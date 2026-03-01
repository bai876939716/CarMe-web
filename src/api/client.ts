import axios from 'axios';
import type { CarModel, Part, Work } from '../types/index';

// 后端统一返回的响应体结构
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 分页结果结构（对应后端 PageResult<T>）
interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 通用解包函数：从 ApiResponse 中提取 data，若失败则抛出错误
function unwrap<T>(response: { data: ApiResponse<T> | T }): T {
  const body = response.data as ApiResponse<T>;
  if (body !== null && typeof body === 'object' && 'code' in body && 'data' in body) {
    if (body.code !== 200) {
      throw new Error(body.message || '请求失败');
    }
    return body.data;
  }
  return body as unknown as T;
}

export const api = {
  // ───── 车型 ─────

  /** GET /api/cars — 获取所有车型 */
  getCars: async (): Promise<CarModel[]> => {
    const response = await apiClient.get<ApiResponse<CarModel[]>>('/cars');
    return unwrap(response);
  },

  // ───── 配件 ─────

  /**
   * GET /api/parts — 获取配件列表（后端返回 PageResult，取 list 字段）
   * @param category  wheel / color / bodykit / wrap / exhaust
   */
  getParts: async (category?: string): Promise<Part[]> => {
    const params: Record<string, unknown> = { size: 100 };
    if (category) params.category = category;
    const response = await apiClient.get<ApiResponse<PageResult<Part>>>('/parts', { params });
    const pageResult = unwrap(response);
    return pageResult.list ?? [];
  },

  /** GET /api/parts/hot — 首页热门配件 */
  getHotParts: async (limit = 8): Promise<Part[]> => {
    const response = await apiClient.get<ApiResponse<Part[]>>('/parts/hot', { params: { limit } });
    return unwrap(response);
  },

  // ───── 方案 ─────

  /**
   * POST /api/works — 保存改装方案
   * 后端从 X-User-Id Header 中读取 userId（默认 2）
   */
  saveWork: async (work: Omit<Work, 'id' | 'userId' | 'createdAt'>): Promise<Work> => {
    const response = await apiClient.post<ApiResponse<Work>>('/works', work);
    return unwrap(response);
  },

  /**
   * GET /api/works/my — 获取当前用户的方案列表
   * 后端从 X-User-Id Header 中读取 userId（默认 2）
   */
  getMyWorks: async (): Promise<Work[]> => {
    const response = await apiClient.get<ApiResponse<Work[]>>('/works/my');
    return unwrap(response);
  },

  /**
   * GET /api/works/community — 社区公开方案列表
   * @param sortBy  hot / latest
   */
  getCommunityWorks: async (sortBy: 'hot' | 'latest' = 'latest', page = 0, size = 12): Promise<PageResult<Work>> => {
    const response = await apiClient.get<ApiResponse<PageResult<Work>>>('/works/community', {
      params: { sortBy, page, size },
    });
    return unwrap(response);
  },

  /** POST /api/works/:id/like — 点赞/取消点赞 */
  toggleLike: async (workId: number): Promise<boolean> => {
    const response = await apiClient.post<ApiResponse<{ liked: boolean }>>(`/works/${workId}/like`);
    return unwrap(response).liked;
  },

  /** POST /api/works/:id/favorite — 收藏/取消收藏 */
  toggleFavorite: async (workId: number): Promise<boolean> => {
    const response = await apiClient.post<ApiResponse<{ favorited: boolean }>>(`/works/${workId}/favorite`);
    return unwrap(response).favorited;
  },
};
