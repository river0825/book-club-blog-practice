import {PostRepository} from "../../../src/domain/model/PostRepository"
import {v4 as uuidV4} from "uuid"
import {Post} from "../../../src/domain/model/Post"
import {PostId} from "../../../src/domain/model/PostId"

export class InMemoryPostRepository implements PostRepository {
    map: { [id: string]: Post} = {};
    
    save(post: Post): void {
        this.map[post.id.toString()] = post
    }

    count(): number {
        return Object.values(this.map).length
    }

    nextIdentity(): PostId {
        return new PostId(uuidV4())
    }
    
    getById(id: PostId): Post {
        return this.map[id.toString()]
    }
    
    public delete(id: PostId): void {
        if(!this.map[id.toString()]){
            throw new Error(`Delete fail, post ${id} is not exists`)
        }
        delete this.map[id.toString()]
    }
}