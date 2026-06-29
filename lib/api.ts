import axios from 'axios';
import { Company, Investor, Product, NewsArticle, Founder, FundingRound } from '../types';

// Always use /api as the base — Next.js rewrites proxy this to the backend (no CORS issues)
const API_BASE_URL = '/api';

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to dynamically inject the JWT token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('graphone_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error mapping
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response?.data?.error || {
      code: 'NETWORK_ERROR',
      message: 'Failed to communicate with the GraphOne server.',
    };
    // Reject with a proper Error object to ensure it logs cleanly in consoles (not as empty `{}`)
    const apiError = new Error(errorData.message) as any;
    apiError.code = errorData.code;
    return Promise.reject(apiError);
  }
);

// API Service Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
}

export const api = {
  // Auth API
  auth: {
    login: (credentials: any) => apiClient.post('/auth/login', credentials),
    register: (userData: any) => apiClient.post('/auth/register', userData),
    getProfile: () => apiClient.get('/auth/me'),
  },

  // Companies API
  companies: {
    list: (params?: any) => apiClient.get<any, ApiResponse<PaginatedResponse<Company>>>('/companies', { params }),
    getBySlug: (slug: string) => apiClient.get<any, ApiResponse<Company>>(`/companies/${slug}`),
    getTrending: (limit?: number) => apiClient.get<any, ApiResponse<Company[]>>('/companies/trending', { params: { limit } }),
    getFeatured: (limit?: number) => apiClient.get<any, ApiResponse<Company[]>>('/companies/featured', { params: { limit } }),
    getByCategory: (category: string) => apiClient.get<any, ApiResponse<Company[]>>(`/companies/category/${encodeURIComponent(category)}`),
    getProducts: (slug: string) => apiClient.get<any, ApiResponse<Product[]>>(`/companies/${slug}/products`),
    getInvestors: (slug: string) => apiClient.get<any, ApiResponse<any[]>>(`/companies/${slug}/investors`),
    getFunding: (slug: string) => apiClient.get<any, ApiResponse<any[]>>(`/companies/${slug}/funding`),
    getFounders: (slug: string) => apiClient.get<any, ApiResponse<Founder[]>>(`/companies/${slug}/founders`),
    getNews: (slug: string) => apiClient.get<any, ApiResponse<NewsArticle[]>>(`/companies/${slug}/news`),
    getSimilar: (slug: string, limit?: number) => apiClient.get<any, ApiResponse<Company[]>>(`/companies/${slug}/similar`, { params: { limit } }),
    getFundingRounds: () => apiClient.get<any, ApiResponse<FundingRound[]>>('/companies/funding-rounds'),
  },

  // Investors API
  investors: {
    list: (params?: any) => apiClient.get<any, ApiResponse<PaginatedResponse<Investor>>>('/investors', { params }),
    getBySlug: (slug: string) => apiClient.get<any, ApiResponse<Investor>>(`/investors/${slug}`),
    getTrending: (limit?: number) => apiClient.get<any, ApiResponse<Investor[]>>('/investors/trending', { params: { limit } }),
    getFeatured: (limit?: number) => apiClient.get<any, ApiResponse<Investor[]>>('/investors/featured', { params: { limit } }),
    getInvestments: (slug: string) => apiClient.get<any, ApiResponse<any[]>>(`/investors/${slug}/investments`),
    getPortfolio: (slug: string) => apiClient.get<any, ApiResponse<Company[]>>(`/investors/${slug}/portfolio`),
    getRelated: (slug: string, limit?: number) => apiClient.get<any, ApiResponse<Investor[]>>(`/investors/${slug}/related`, { params: { limit } }),
  },

  // Products API
  products: {
    list: (params?: any) => apiClient.get<any, ApiResponse<PaginatedResponse<Product>>>('/products', { params }),
    getBySlug: (slug: string) => apiClient.get<any, ApiResponse<Product>>(`/products/${slug}`),
    getTrending: (limit?: number) => apiClient.get<any, ApiResponse<Product[]>>('/products/trending', { params: { limit } }),
    getPopular: (limit?: number) => apiClient.get<any, ApiResponse<Product[]>>('/products/popular', { params: { limit } }),
    getByCategory: (category: string) => apiClient.get<any, ApiResponse<Product[]>>(`/products/category/${encodeURIComponent(category)}`),
  },

  // News API
  news: {
    list: (limit?: number) => apiClient.get<any, ApiResponse<NewsArticle[]>>('/news', { params: { limit } }),
    getTrending: (limit?: number) => apiClient.get<any, ApiResponse<NewsArticle[]>>('/news/trending', { params: { limit } }),
    getByCompany: (slug: string) => apiClient.get<any, ApiResponse<NewsArticle[]>>(`/news/company/${slug}`),
  },

  // Global Search API
  search: {
    global: (q: string) => apiClient.get<any, ApiResponse<{
      companies: Company[];
      investors: Investor[];
      products: Product[];
      founders: Founder[];
    }>>('/search', { params: { q } }),
    getHistory: () => apiClient.get<any, ApiResponse<any[]>>('/search/history'),
    clearHistory: () => apiClient.delete('/search/history'),
  },

  // Dashboard Stats API
  stats: {
    get: () => apiClient.get<any, ApiResponse<{
      companiesCount: number;
      investorCount: number;
      fundingTotal: string;
      productsCount: number;
      latestNewsCount: number;
      trendingCompanies: Company[];
    }>>('/stats'),
  },

  // Bookmarks API
  bookmarks: {
    list: () => apiClient.get<any, ApiResponse<any[]>>('/auth/bookmarks'),
    add: (itemType: string, itemId: string) => apiClient.post('/auth/bookmarks', { itemType, itemId }),
    remove: (itemType: string, itemId: string) => apiClient.delete(`/auth/bookmarks/${itemType}/${itemId}`),
  },

  // Admin APIs
  admin: {
    company: {
      create: (data: any) => apiClient.post('/admin/company', data),
      update: (id: string, data: any) => apiClient.put(`/admin/company/${id}`, data),
      delete: (id: string) => apiClient.delete(`/admin/company/${id}`),
    },
    product: {
      create: (data: any) => apiClient.post('/admin/product', data),
      update: (id: string, data: any) => apiClient.put(`/admin/product/${id}`, data),
      delete: (id: string) => apiClient.delete(`/admin/product/${id}`),
    },
    investor: {
      create: (data: any) => apiClient.post('/admin/investor', data),
      update: (id: string, data: any) => apiClient.put(`/admin/investor/${id}`, data),
      delete: (id: string) => apiClient.delete(`/admin/investor/${id}`),
    },
  },
};
