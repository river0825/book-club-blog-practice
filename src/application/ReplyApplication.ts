import {Reply} from "../domain/model/Reply"

export class ReplyApplication {
    replyPost(postId: string, name: string, replyBody: string): Reply{
        return Reply.reply(postId, name, replyBody)
    }
}