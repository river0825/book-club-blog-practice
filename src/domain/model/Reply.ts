import {v4} from "uuid"

export class Reply{
    private readonly _postId: string;
    private readonly _name: string;
    private readonly _replyBody: string;
    private readonly _id: string;
    constructor(id: string, postId: string, name: string, replyBody: string) {
        this._id = id
        this._postId = postId
        this._name = name
        this._replyBody = replyBody
    }
    
    public get postId(): string {
        return this._postId
    }
    public get name(): string {
        return this._name
    }
    public get replyBody(): string {
        return this._replyBody
    }
    public get id(): string {
        return this._id
    }
    public static reply(postId: string, name: string, replyBody: string): Reply {
        const uuid = v4()
        return new Reply(uuid, postId, name, replyBody)
    }
}