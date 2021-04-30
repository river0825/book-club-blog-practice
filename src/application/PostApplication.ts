import {Post} from "../domain/model/Post"
import {PostRepository} from "../domain/model/PostRepository"
import {PostDTO} from "./dto/PostDTO"

export class PostApplication {
    private _postRepo: PostRepository;
    
    constructor(repository: PostRepository) {
        this._postRepo = repository
        
    }
    
    publishPost(subject: string, body: string): PostDTO {
        const id: string = this._postRepo.nextIdentity()
        const post = Post.publish(id, subject, body)
        this._postRepo.save(post)
        return this.transferToPostDTO(post)
    }
    
    transferToPostDTO(post: Post): PostDTO {
        return {
            id: post.id.toString(),
            subject: post.subject,
            body: post.body,
            creationDate: post.creationDate.valueOf(),
            modificationDate: post.modificationDate.valueOf()
        }
    }
    
    public deletePost(postId: string): void {
        this._postRepo.delete(postId)
    }
    
    public modifyPost(id: string, subject: string, body: string): void {
        const post = this._postRepo.getById(id)
        post.modify(subject, body)
        this._postRepo.save(post)
    }
    
    public addTag(id: string, aTag: string): void {
        const post = this._postRepo.getById(id)
        post.addTag(aTag)
        this._postRepo.save(post)
    }
}