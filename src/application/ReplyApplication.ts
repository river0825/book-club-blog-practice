import {Reply} from "../domain/model/Reply"
import {PostRepository} from "../domain/model/PostRepository"
import {ReplyPostCommand} from "./command/ReplyPostCommand"
import {PostId} from "../domain/model/PostId"
import {Post} from "../domain/model/Post"
import {ReplyRepository} from "../domain/model/ReplyRepository"

export class ReplyApplication {

    constructor(private _postRepo: PostRepository, private  _replyRepo: ReplyRepository) {
        this._postRepo = _postRepo
        this._replyRepo = _replyRepo
    }

    replyPost(command: ReplyPostCommand): Reply{
        const post: Post = this._postRepo.getById(new PostId(command.postId))

        const reply: Reply = post.reply(command.replierName, command.replyBody)

        this._replyRepo.save(reply)

        return reply
    }
}