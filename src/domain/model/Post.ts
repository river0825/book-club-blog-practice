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
        this._subject = subject;
        this._body = body;
    }
    
    
    
}