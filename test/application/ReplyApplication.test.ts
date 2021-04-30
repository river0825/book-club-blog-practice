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
})