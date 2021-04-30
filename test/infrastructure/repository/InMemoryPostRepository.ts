import {PostRepository} from "../../../src/domain/model/PostRepository"
import {v4 as uuidV4} from "uuid"
import {Post} from "../../../src/domain/model/Post"

export class InMemoryPostRepository implements PostRepository {
    map: { [id: string]: Post} = {};
    
    save(post: Post): void {
        this.map[post.getId()] = post
    }

    count(): number {
        return Object.values(this.map).length
    }

    nextIdentity(): string {
        return uuidV4()
    }

}