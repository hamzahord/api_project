import axios from "axios";
import authHeader from './auth-header';
import io from 'socket.io-client';


const API_URL = "http://localhost:8080/api/articles/";

class ArticleService {
  getAllArticles() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  createArticle(articleData) {
    return axios.post(API_URL + 'add', articleData, { headers: authHeader() });
  }

  getArticleById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  updateArticle(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }

  deleteArticle(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }

  getCommentsByArticleId(articleId) {
    return axios.get(`${API_URL}${articleId}/comments`, { headers: authHeader() });
  }

  createComment(articleId, content) {
    return axios.post("http://localhost:8080/api/comments", { article_id: articleId, content }, { headers: authHeader() });
  }

  socket = null;

  connectSocket() {
    this.socket = io("http://localhost:8080", {
      extraHeaders: authHeader()
    });
    return this.socket;
  }
}

export default new ArticleService();
