import {ReplyApplication} from "../../src/application/ReplyApplication"

describe("Given a reader, when he reply post", () => {
    it("it should be success, when he reply with none empty name and content", () => {
        const app = new ReplyApplication()
        const reply = app.replyPost("postId", "name", "replyBody")
        expect(reply).toMatchObject({
            _postId: "postId",
            _name: "name",
            _replyBody: "replyBody"
        })
    })
    
    it("it should have post id , when he reply with correct value", () => {
        
        const app = new ReplyApplication()
        const reply = app.replyPost("postId", "name", "replyBody")
        expect(reply.id).not.toBeNull()
    })
    
    it("should have creationDate and modificationDate, when he reply with correct value", () => {
        const app = new ReplyApplication()
        const NOW_STR = "2021-03-21T06:00:00.000Z"
        jest
            .spyOn(global.Date, "now")
            .mockImplementation(() =>
                new Date(NOW_STR).valueOf()
            )
        
        const reply = app.replyPost("postId", "name", "replyBody")
        expect(reply.creationDate.valueOf()).toBe(new Date(NOW_STR).valueOf())
        expect(reply.modificationDate.valueOf()).toBe(new Date(NOW_STR).valueOf())
    })
})