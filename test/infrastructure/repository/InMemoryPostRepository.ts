import {PostRepository} from "../../../src/domain/model/PostRepository"
import {v4 as uuidV4} from "uuid"
import {Post} from "../../../src/domain/model/Post"

export class InMemoryPostRepository implements PostRepository {
    map: { [id: string]: Post} = {};
    
    save(post: Post): void {
        this.map[post.id.toString()] = post
    }

    count(): number {
        return Object.values(this.map).length
    }

    nextIdentity(): string {
        return uuidV4()
    }
    
    getById(id: string): Post {
        return this.map[id]
    }
    
    public delete(id: string): void {
        if(!this.map[id]){
            throw new Error(`Delete fail, post ${id} is not exists`)
        }
        delete this.map[id]
    }
}