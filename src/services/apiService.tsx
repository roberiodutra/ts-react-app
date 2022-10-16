import request from './apiRequest';

class ApiService {
  public async signIN(data: any) {
    return await request('/sign_in', 'post', {
      body: data,
    });
  }

  public async getAllUsers() {
    return await request('/user', 'get', {});
  }
}

export default new ApiService();
