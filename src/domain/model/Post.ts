import {PostId} from "./PostId"

export class Post {

    private _id: PostId;
    private _subject: string;
    private _body: string;
    private _creationDate: Date;
    private _modificationDate: Date;

    constructor(id: PostId, subject: string, body: string, creationDate: Date, modificationDate: Date) {
        if (!subject || subject === "") {
            throw new Error("Post subject should not be empty")
        }
        if (!body || body === "") {
            throw new Error("Post body should not be empty")
        }
        this._id = id
        this._subject = subject
        this._body = body
        this._creationDate = creationDate
        this._modificationDate = modificationDate
    }

    static publish(id: string, subject: string, body: string): Post {
        if (!subject || subject === "") {
            throw new Error("Post subject should not be empty")
        }
        if (!body || body === "") {
            throw new Error("Post body should not be empty")
        }
        return new Post(new PostId(id), subject, body, new Date(Date.now()), new Date(Date.now()))
    }

    get creationDate(): Date {
        return this._creationDate
    }

    get modificationDate(): Date {
        return this._modificationDate
    }
    public get body(): string {
        return this._body
    }
    public get subject(): string {
        return this._subject
    }
    public get id(): PostId{
        return this._id
    }
}