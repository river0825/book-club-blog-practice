import {Post} from "../domain/model/Post"
import {v4 as uuidv4} from "uuid"
import {PostRepository} from "../domain/model/PostRepository"

export class PostApplication {
    private _repository: PostRepository
    constructor(repository: PostRepository) {
        this._repository = repository
    
    }
    
    publishPost(subject: string, body: string): Post {
        const id: string = uuidv4()
        return Post.publish(id, subject, body)
    }
    
}