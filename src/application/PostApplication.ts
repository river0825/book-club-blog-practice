import {Post, PostTagSet, Tag} from "../domain/model/Post"
import {PostId} from "../domain/model/PostId"
import {PostRepository} from "../domain/model/PostRepository"
import {PostDTO} from "./dto/PostDTO"
import {PublishPostCommand} from "./command/PublishPostCommand"
import {ModifyPostCommand} from "./command/ModifyPostCommand"
import {DeletePostCommand} from "./command/DeletePostCommand"
import {Error} from "ts-lint/lib/error"

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
        const post = this._postRepo.getById(new PostId(command.id))
        post.modify(command.subject, command.body)
        this._postRepo.save(post)
    }

    public setTags(id: string, tags: string[]): void {
        if (tags === undefined) {
            new Error("tags should not be empty")
        }
        
        const post = this._postRepo.getById(new PostId(id))

        post.setTags(PostTagSet.generateByStringArray(tags))
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