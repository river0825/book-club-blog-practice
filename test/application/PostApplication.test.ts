import {PostApplication} from "../../src/application/PostApplication";

describe('...', () => {
    test('create post id', () => {
        let app = new PostApplication()
        let post = app.publishPost("subject", "body")
        expect(post.subject).toBe("subject")
        expect(post.body).toBe("body")
    })
})