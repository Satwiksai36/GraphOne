import { NewsRepository } from '../repositories/newsRepository';

export class NewsService {
  static async getNews(limit = 150) {
    return NewsRepository.findAll(limit);
  }

  static async getTrendingNews(limit = 10) {
    return NewsRepository.findTrending(limit);
  }

  static async getNewsByCompany(slug: string, limit = 10) {
    return NewsRepository.findByCompanySlug(slug, limit);
  }
}
