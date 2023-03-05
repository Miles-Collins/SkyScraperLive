import { AppState } from "../AppState";
import { api } from "./AxiosService";

class CommentsService {
  async createComment(commentBody) {
    const res = await api.post("api/comments", commentBody);
    console.log("[COMMENT BODY]", res.data);
    AppState.eventComments.push(res.data);
  }
}

export const commentsService = new CommentsService();
