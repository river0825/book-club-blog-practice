import {ReplyApplication} from "../../src/application/ReplyApplication"
import {InMemoryPostRepository} from "../infrastructure/repository/InMemoryPostRepository"
import {Post} from "../../src/domain/model/Post"
import {PostId} from "../../src/domain/model/PostId"
import {ReplyPostCommand} from "../../src/application/command/ReplyPostCommand"
import {InMemoryReplyRepository} from "../infrastructure/repository/InMemoryReplyRepository"


const makeReplyCommand = (postId: string, replierName: string, replyBody: string): ReplyPostCommand => ({
    postId,
    replierName,
    replyBody,
})

describe("Given a reader, when he reply post", () => {

    let postRepo: InMemoryPostRepository
    let replyRepo: InMemoryReplyRepository
    let app: ReplyApplication
    const postIdVal = "5cd463b0-5e00-4df7-a2ec-fbe4db2485be"
    const postId = new PostId(postIdVal)
    beforeEach(() => {
        postRepo = new InMemoryPostRepository()
        replyRepo = new InMemoryReplyRepository()
        postRepo.save(Post.publish(postId, "subject", "body"))
        app = new ReplyApplication(postRepo, replyRepo)

    })


    it("it should be success, when he reply with none empty name and content", () => {
        const reply = app.replyPost(makeReplyCommand(postIdVal, "name", "replyBody"))
        expect(reply).toMatchObject({
            _postId: { id: postIdVal },
            _name: "name",
            _replyBody: "replyBody"
        })
    })

    it("it should have post id , when he reply with correct value", () => {

        const reply = app.replyPost(makeReplyCommand(postIdVal, "name", "replyBody"))
        expect(reply.id).not.toBeNull()
    })

    it("should have creationDate and modificationDate, when he reply with correct value", () => {
        const NOW_STR = "2021-03-21T06:00:00.000Z"
        jest
            .spyOn(global.Date, "now")
            .mockImplementation(() =>
                new Date(NOW_STR).valueOf()
            )

        const reply = app.replyPost(makeReplyCommand(postIdVal, "name", "replyBody"))
        expect(reply.creationDate.valueOf()).toBe(new Date(NOW_STR).valueOf())
        expect(reply.modificationDate.valueOf()).toBe(new Date(NOW_STR).valueOf())
        expect(replyRepo.count()).toBe(1)
    })
})