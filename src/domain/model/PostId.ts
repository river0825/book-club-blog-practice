export class PostId {
    public readonly id: string;

    constructor(id: string) {
        this.id = id
    }

    toString(): string {
        return this.id
    }
}