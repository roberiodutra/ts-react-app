import { QuestionType } from '../types/QuestionType';
import request from './core';

class ApiService {
  public async getAll() {
    return await request('/questions', 'get');
  }
}

export default new ApiService();
