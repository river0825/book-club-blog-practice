import {PostId} from "./PostId"

export class Post {

    private readonly _id: PostId;
    private _subject: string;
    private _body: string;
    private readonly _creationDate: Date;
    private _modificationDate: Date;

    constructor(id: PostId, subject: string, body: string, creationDate: Date, modificationDate: Date) {
        this._id = id
        this._subject = subject
        this._body = body
        this._creationDate = creationDate
        this._modificationDate = modificationDate
        this.validate()
    }
    
    private validate(): void {
        if (!this.subject || this.subject === "") {
            throw new Error("Post subject should not be empty")
        }
        if (!this.body || this.body === "") {
            throw new Error("Post body should not be empty")
        }
    }
    
    static publish(id: PostId, subject: string, body: string): Post {
        return new Post(id, subject, body, new Date(Date.now()), new Date(Date.now()))
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
    
    public modify(subject: string, body: string): void {
        this._subject = subject
        this._body = body
        this._modificationDate = new Date(Date.now())
        this.validate()
    }
}