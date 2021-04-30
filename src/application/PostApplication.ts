import {Post} from "../domain/model/Post"
import {PostRepository} from "../domain/model/PostRepository"

export class PostApplication {
    private _postRepo: PostRepository;

    constructor(repository: PostRepository) {
        this._postRepo = repository

    }

    publishPost(subject: string, body: string): Post {
        const id: string = this._postRepo.nextIdentity()
        const post = Post.publish(id, subject, body)
        this._postRepo.save(post)
        return post
    }

}