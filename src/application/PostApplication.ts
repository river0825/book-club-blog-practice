import {Post} from "../domain/model/Post"
import {PostId} from "../domain/model/PostId"
import {PostRepository} from "../domain/model/PostRepository"
import {PostDTO} from "./dto/PostDTO"
import {PublishPostCommand} from "./command/PublishPostCommand"

export class PostApplication {
    private _postRepo: PostRepository;
    
    constructor(postRepo: PostRepository) {
        this._postRepo = postRepo
        
    }

    publishPost(command: PublishPostCommand): PostDTO {
        const id  = this._postRepo.nextIdentity()
        const post = Post.publish(id, command.subject, command.body)
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
    
    public deletePost(idStr: string): void {
        const postId = new PostId(idStr)
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