import {PostRepository} from "../../../src/domain/model/PostRepository"
import {Post} from "../../../src/domain/model/Post"

export class InMemoryPostRepository implements PostRepository {
    map: { [id: string]: Post} = {};
    
    save(post: Post): void {
        this.map[post.getId()] = post
    }
    
}