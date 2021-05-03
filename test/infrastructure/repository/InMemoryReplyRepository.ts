import {ReplyRepository} from "../../../src/domain/model/ReplyRepository"
import {Post} from "../../../src/domain/model/Post"
import {Reply} from "../../../src/domain/model/Reply"

export class InMemoryReplyRepository implements ReplyRepository {
    private map: { [id: string]: Reply} = {};

    save(reply: Reply): void {
        if(this.map[reply.id]) {
            throw new Error("Already Exists")
        }
        this.map[reply.id] = reply
    }

    count(): number {
        return Object.values(this.map).length
    }
}