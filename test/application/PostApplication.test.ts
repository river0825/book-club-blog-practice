import {PostApplication} from "../../src/application/PostApplication"
import {InMemoryPostRepository} from "../infrastructure/repository/InMemoryPostRepository"

const NOW_STR = "2021-03-21T06:00:00.000Z"
jest
    .spyOn(global.Date, "now")
    .mockImplementation(() =>
        new Date(NOW_STR).valueOf()
    )


describe("Given an author, when he publish post", () => {
    let app: PostApplication
    let postRepo: InMemoryPostRepository
    beforeEach(() => {
        postRepo = new InMemoryPostRepository()
        app = new PostApplication(postRepo)
    })
    
    test("should save to db if publish a post with correct params", () => {
        app.publishPost("subject", "body")
        expect(postRepo.count()).toBe(1)
    })
    
    test("should get a post with correct creationDate/modificationDate if publish a post with correct params", () => {
        const post = app.publishPost("subject", "body")
        expect(post.subject).toBe("subject")
        expect(post.body).toBe("body")
        expect(post.creationDate).toBe(new Date(NOW_STR).valueOf())
        expect(post.modificationDate).toBe(new Date(NOW_STR).valueOf())
    })
    
    test("should fail if publish a post with empty subject", () => {
        expect(() => {
            app.publishPost("", "body")
        }).toThrow("Post subject should not be empty")
    })
    
    test("should fail if publish a post with empty body", () => {
        expect(() => {
            app.publishPost("subject", "")
        }).toThrow("Post body should not be empty")
    })
    
})

describe("Given a user, when he delete a post", () => {
    let postRepo: InMemoryPostRepository
    let postApp: PostApplication
    beforeEach(() => {
        postRepo = new InMemoryPostRepository()
        postApp = new PostApplication(postRepo)
    })
    it("should success if the post exists", () => {
        const postDTO = postApp.publishPost("subject", "body")
        expect(postRepo.count()).toBe(1)
        
        postApp.deletePost(postDTO)
        expect(postRepo.count()).toBe(0)
    })
    
    it("should throw exception if the post does not exists", () => {
        const id = "1"
        
        expect(() => {
            postApp.deletePost({body: "", creationDate: 0, id: id, modificationDate: 0, subject: ""})
        }).toThrow(`Delete fail, post ${id} is not exists`)
    })
})

describe("Given a author, when he modify a post", () => {
    let postRepo: InMemoryPostRepository
    let postApp: PostApplication
    beforeEach(() => {
        postRepo = new InMemoryPostRepository()
        postApp = new PostApplication(postRepo)
    })
    
    it("should success if subject/body is not empty", () => {
        const postDTO = postApp.publishPost("subject", "body")
        
        const newPostDTO = postApp.modifyPost(postDTO.id, "new subject", "new body")
        expect(newPostDTO).toMatchObject({
            id : postDTO.id,
            subject : "new subject",
            body : "new body",
            creationDate: new Date(NOW_STR).valueOf(),
            modificationDate: new Date(NOW_STR).valueOf()
        })
    })
})