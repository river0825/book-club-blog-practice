import {v4} from "uuid"
import {PostId} from "./PostId"

export class Reply{
    private readonly _postId: PostId;
    private readonly _name: string;
    private readonly _replyBody: string;
    private readonly _id: string;
    private readonly _modificationDate: Date;
    private readonly _creationDate: Date;
    
    constructor(id: string, postId: PostId, name: string, replyBody: string, creationDate: Date, modificationDate: Date) {
        this._id = id
        this._postId = postId
        this._name = name
        this._replyBody = replyBody
        this._creationDate = creationDate
        this._modificationDate = modificationDate
    }
    
    public get postId(): PostId {
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
    public get modificationDate(): Date {
        return this._modificationDate
    }
    public get creationDate(): Date {
        return this._creationDate
    }
    
    public static generate(postId: PostId, name: string, replyBody: string): Reply {
        const uuid = v4()
        const creationDate = new Date(Date.now())
        const modificationDate = new Date(Date.now())
        return new Reply(uuid, postId, name, replyBody, creationDate, modificationDate)
    }
}