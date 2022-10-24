import { IQuestionQ } from "../types/IQuestionQ";
import { QuestionStatusType } from "../types/QuestionStatusType";
import { QuestionType } from "../types/QuestionType";
import { UserLoginType } from "../types/UserLoginType";
import { UserRegisterType } from "../types/UserRegisterType";
import request from "./apiRequest";

class ApiService {
  public async signIN(data: UserLoginType) {
    return await request("/sign_in", "post", {
      body: data,
    });
  }

  public async signUP(data: UserRegisterType) {
    return await request("/sign_up", "post", {
      body: data,
    });
  }

  public async registerQuestion(data: QuestionType) {
    return await request("/questions", "post", {
      body: data,
    });
  }

  public async getAllQuestions(PAGE: number, LIMIT: number, STATUS: string) {
    return await request(
      `/questions?page=${PAGE}&limit=${LIMIT}&status=${STATUS}`,
      "get",
      {}
    );
  }

  public async getQuestionById(id: string) {
    return await request(`/questions/${id}`, "get", {});
  }

  public async updateQuestion(
    id: string,
    data: QuestionStatusType | IQuestionQ
  ) {
    return await request(`/questions/${id}`, "put", {
      body: data,
    });
  }

  public async deleteQuestion(id: string) {
    return await request(`/questions/${id}`, "delete", {});
  }

  public async getAllUsers() {
    return await request("/user", "get", {});
  }

  public async getUserById(id: string) {
    return await request(`/user/${id}`, "get", {});
  }
}

export default new ApiService();
