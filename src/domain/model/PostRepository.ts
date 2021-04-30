import {Post} from "./Post"

export interface PostRepository{
    save(post: Post):void
}