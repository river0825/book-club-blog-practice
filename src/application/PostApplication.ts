import {Post} from "../domain/model/Post"
import {PostId} from "../domain/model/PostId"
import {PostRepository} from "../domain/model/PostRepository"
import {PostDTO} from "./dto/PostDTO"
import {PublishPostCommand} from "./command/PublishPostCommand"
import {ModifyPostCommand} from "./command/ModifyPostCommand"
import {DeletePostCommand} from "./command/DeletePostCommand"

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
    

    public deletePost(command: DeletePostCommand): void {
        const postId = new PostId(command.postId)
        this._postRepo.delete(postId)
    }
    
    public modifyPost(command: ModifyPostCommand): void {
        const post = this._postRepo.getById(command.id)
        post.modify(command.subject, command.body)
        this._postRepo.save(post)
    }
    
    public addTag(id: string, aTag: string): void {
        const post = this._postRepo.getById(id)
        post.addTag(aTag)
        this._postRepo.save(post)
    }

    private transferToPostDTO(post: Post): PostDTO {
        return {
            id: post.id.toString(),
            subject: post.subject,
            body: post.body,
            creationDate: post.creationDate.valueOf(),
            modificationDate: post.modificationDate.valueOf()
        }
    }
}