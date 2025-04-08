import { CreatePostRequest, CreatePostResult, HomeListRequest, HomeListResult, PostDetail } from "src/api/types/posts"
import request from "src/utils/request"

namespace PostsAPI {
	export function create(data: CreatePostRequest): Promise<CreatePostResult> {
		return request.post("/api/v1/posts/create", data)
	}

	export function getTimeline(data: HomeListRequest): Promise<HomeListResult> {
		return request.post("/api/v1/feeds/timeline", data)
	}

	export function get(postId: string): Promise<PostDetail> {
		return request.post("/api/v1/posts/get", {
			"post_id": postId
		})
	}
}

export default PostsAPI;
