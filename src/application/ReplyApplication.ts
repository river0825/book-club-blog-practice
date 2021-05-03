import {Reply} from "../domain/model/Reply"
import {PostRepository} from "../domain/model/PostRepository"
import {ReplyPostCommand} from "./command/ReplyPostCommand"

export class ReplyApplication {

    constructor(private _postRepo: PostRepository) {
        this._postRepo = _postRepo
    }

    replyPost(command: ReplyPostCommand): Reply{
        // const post: Post = this._postRepo.getById(command.postId);
        return Reply.reply(command.postId, command.name, command.replyBody)
    }
}