import {PostApplication} from "../../src/application/PostApplication";

const NOW_STR = '2021-03-21T06:00:00.000Z'
jest
    .spyOn(global.Date, 'now')
    .mockImplementation(() =>
        new Date(NOW_STR).valueOf()
    );


describe('Given an author', () => {
    let app: PostApplication;
    beforeEach(() => {
        app = new PostApplication()
    })
    test('should get a post with correct creationDate/modificationDate if publish a post with correct params', () => {
        let post = app.publishPost("subject", "body")
        expect(post.subject).toBe("subject")
        expect(post.body).toBe("body")
        expect(post.creationDate.toISOString()).toBe(NOW_STR);
        expect(post.modificationDate.toISOString()).toBe(NOW_STR);
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