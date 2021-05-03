import {Reply} from "./Reply"

export interface ReplyRepository {
    save(reply: Reply): void
}