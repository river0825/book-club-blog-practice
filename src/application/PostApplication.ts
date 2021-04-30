import {Post} from "../domain/model/Post";

export class PostApplication {
    constructor() {
    }
    
    publishPost(subject: string, body: string): Post {
        let post = new Post(subject, body)
        return post
    }
}