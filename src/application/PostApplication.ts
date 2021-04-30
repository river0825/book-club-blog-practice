import {Post} from "../domain/model/Post";

export class PostApplication {
    constructor() {
    }
    
    publishPost(subject: string, body: string): Post {
        return Post.publish(subject, body)
    }
}