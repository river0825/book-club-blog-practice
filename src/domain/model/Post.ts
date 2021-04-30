import {PostId} from "./PostId"

export class Post {
    private _id: PostId;
    private _subject: string;
    private _body: string;
    private _creationDate: Date;
    private _modificationDate: Date;
    private _tags: Array<Tag>;
    
    constructor(id: PostId, subject: string, body: string, creationDate: Date, modificationDate: Date) {
        this._id = id
        this._subject = subject
        this._body = body
        this._creationDate = creationDate
        this._modificationDate = modificationDate
        this._tags = new Array<Tag>()
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
    
    static publish(id: string, subject: string, body: string): Post {
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
    
    public get id(): PostId {
        return this._id
    }
    
    public get tags(): Array<Tag> {
        return this._tags
    }
    
    public modify(subject: string, body: string): void {
        this._subject = subject
        this._body = body
        this._modificationDate = new Date(Date.now())
        this.validate()
    }
    
    public addTag(aTag: string): void {
        this._tags.push(new Tag(aTag))
    }
}

/**
 * value object
 */
export class Tag {
    private readonly _tag: string;
    
    constructor(aTag: string) {
        if (!aTag || aTag === "") throw new Error("add tag should not empty")
        this._tag = aTag
    }
    
    toString(): string {
        return this._tag
    }
    
    public get tag(): string {
        return this._tag
    }
}