import {PostId} from "./PostId"
import {Reply} from "./Reply"

export class Post {

    private readonly _id: PostId;
    private _subject: string;
    private _body: string;
    private readonly _creationDate: Date;
    private _modificationDate: Date;
    private _tags: PostTagSet;

    constructor(id: PostId, subject: string, body: string, creationDate: Date, modificationDate: Date, _tags: PostTagSet) {
        this._id = id
        this._subject = subject
        this._body = body
        this._creationDate = creationDate
        this._modificationDate = modificationDate
        this._tags = _tags
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
        return new Post(id, subject, body, new Date(Date.now()), new Date(Date.now()), PostTagSet.initEmpty())
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

    public get tags(): Tag[] {
        return Array.from(this._tags.tags)
    }

    public modify(subject: string, body: string): void {
        this._subject = subject
        this._body = body
        this._modificationDate = new Date(Date.now())
        this.validate()
    }

    public setTags(tags: PostTagSet): void {
        this._tags = tags
    }

    reply(replierName: string, replyBody: string): Reply {
        return Reply.generate(this.id, replierName, replyBody)

    }
}

/**
 * value object
 */
export class PostTagSet {
    private readonly _tags: Set<Tag>;

    constructor(tags: Set<Tag>) {
        this._tags = tags
    }

    static generateByStringArray(tags: string[]): PostTagSet {
        const nonDuplicateTags = Array.from(new Set(tags))
        return new PostTagSet(new Set(nonDuplicateTags.map(t => new Tag(t))))
    }

    static initEmpty(): PostTagSet {
        return new PostTagSet(new Set())
    }

    get tags(): Set<Tag> {
        return this._tags
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