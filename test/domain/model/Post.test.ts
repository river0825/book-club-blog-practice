import {Post} from "../../../src/domain/model/Post"

const NOW_STR = "2021-03-21T06:00:00.000Z"
jest
    .spyOn(global.Date, "now")
    .mockImplementation(() =>
        new Date(NOW_STR).valueOf()
    )

describe("Publish a post", () => {
    const id = "ffe1e7d2-900b-41af-bb49-ac4517e2d5a6"
    const subject = "subject"
    const body = "body"

    test("should created with correct timestamp when publishing a post", () => {
        const post = Post.publish(id,subject, body)

        expect(post).toMatchObject({
            _id: id,
            _subject: subject,
            _body: body,
        })
        expect(post.creationDate.toISOString()).toBe(NOW_STR)
        expect(post.modificationDate.toISOString()).toBe(NOW_STR)
    })


    test("should fail if publish a post with empty subject", () => {
        expect(() => {
            Post.publish(id,"", body)
        }).toThrow("Post subject should not be empty")
    })

    test("should fail if publish a post with empty body", () => {
        expect(() => {
            Post.publish(id,subject, "")
        }).toThrow("Post body should not be empty")
    })
})