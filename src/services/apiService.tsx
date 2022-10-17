import { QuestionType } from '../types/QuestionType';
import { UserLoginType } from '../types/UserLoginType';
import { UserRegisterType } from '../types/UserRegisterType';
import request from './apiRequest';

class ApiService {
  public async signIN(data: UserLoginType) {
    return await request('/sign_in', 'post', {
      body: data,
    });
  }

  public async signUP(data: UserRegisterType) {
    return await request('/sign_up', 'post', {
      body: data,
    });
  }

  public async registerQuestion(data: QuestionType) {
    return await request('/questions', 'post', {
      body: data,
    });
  }

  public async getAllQuestions() {
    return await request('/questions', 'get', {});
  }

  public async getAllUsers() {
    return await request('/user', 'get', {});
  }
}

export default new ApiService();
