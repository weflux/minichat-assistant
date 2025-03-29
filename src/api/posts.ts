import {CreatePostRequest, CreatePostResult, HomeListRequest, HomeListResult} from "src/api/types/posts"
import request from "src/utils/request"

namespace PostsAPI {
  export function create(data: CreatePostRequest): Promise<CreatePostResult> {
    return request.post("/api/v1/posts/create", data)
  }

  export function homeList(data: HomeListRequest): Promise<HomeListResult> {
    return request.post("/api/v1/posts/homeList", data)
  }
}

export default PostsAPI;
