import {Post} from "./Post"
import {PostId} from "./PostId"

export interface PostRepository{
    save(post: Post):void
    nextIdentity(): PostId
    delete(id: PostId): void;
    getById(id: PostId): Post;
}