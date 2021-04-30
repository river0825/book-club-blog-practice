export class Post {
    public get body(): string {
        return this._body;
    }
    public get subject(): string {
        return this._subject;
    }
    
    private _subject: string;
    private _body: string;
    
    constructor(subject: string, body: string) {
        if (!subject || subject === '') {
            throw new Error('Post subject should not be empty');
        }
        if (!body || body === '') {
            throw new Error('Post body should not be empty');
        }
        this._subject = subject;
        this._body = body;
    }
    
    
    
}