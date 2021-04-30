import {PostApplication} from "../../src/application/PostApplication";

describe('Given an author', () => {
    let app: PostApplication;
    beforeEach(() => {
        app = new PostApplication()
    })
    test('should get a post if publish a post with correct params', () => {
        let post = app.publishPost("subject", "body")
        expect(post.subject).toBe("subject")
        expect(post.body).toBe("body")
    })

    test('should fail if publish a post with empty subject', () => {
        expect(() => {
            app.publishPost("", "body")
        }).toThrow('Post subject should not be empty');
    })

    test('should fail if publish a post with empty body', () => {
        expect(() => {
            app.publishPost("subject", "")
        }).toThrow('Post body should not be empty');
    })

})