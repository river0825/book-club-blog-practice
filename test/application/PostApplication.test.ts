import {PostApplication} from "../../src/application/PostApplication"
import {InMemoryPostRepository} from "../infrastructure/repository/InMemoryPostRepository"
import {PostDTO} from "../../src/application/dto/PostDTO"

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
        
        postApp.deletePost(postDTO.id)
        expect(postRepo.count()).toBe(0)
    })
    
    it("should throw exception if the post does not exists", () => {
        const id = "1"
        
        expect(() => {
            postApp.deletePost(id)
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
        const newSubject = "new subject"
        const newBody = "new body"
        const postDTO = postApp.publishPost("subject", "body")
        
        postApp.modifyPost(postDTO.id, newSubject, newBody)
        
        const newPostDTO = postRepo.getById(postDTO.id)
        expect(newPostDTO.id.toString()).toBe(postDTO.id)
        expect(newPostDTO.body).toBe(newBody)
        expect(newPostDTO.subject).toBe(newSubject)
        expect(newPostDTO.modificationDate.valueOf()).toBe(new Date(NOW_STR).valueOf())
    })
    
    it("modificationDate should be now if post updated", () => {
        const newSubject = "new subject"
        const newBody = "new body"
        const postDTO = postApp.publishPost("subject", "body")
        
        const NOW_STR_2 = "2021-03-22T06:00:00.000Z"
        jest
            .spyOn(global.Date, "now")
            .mockImplementation(() =>
                new Date(NOW_STR_2).valueOf()
            )
        
        postApp.modifyPost(postDTO.id, newSubject, newBody)
        
        const newPostDTO = postRepo.getById(postDTO.id)
        expect(newPostDTO.modificationDate.valueOf()).toBe(new Date(NOW_STR_2).valueOf())
    })
    
    it("should fail if new subject is empty", () => {
        const newSubject = ""
        const newBody = "new body"
        const postDTO = postApp.publishPost("subject", "body")
        
        const NOW_STR_2 = "2021-03-22T06:00:00.000Z"
        jest
            .spyOn(global.Date, "now")
            .mockImplementation(() =>
                new Date(NOW_STR_2).valueOf()
            )
       
        expect(() => {
            postApp.modifyPost(postDTO.id, newSubject, newBody)
        }).toThrow("Post subject should not be empty")
    })
    
    it("should fail if new body is empty", () => {
        const newSubject = "new subject"
        const newBody = ""
        const postDTO = postApp.publishPost("subject", "body")
        
        const NOW_STR_2 = "2021-03-22T06:00:00.000Z"
        jest
            .spyOn(global.Date, "now")
            .mockImplementation(() =>
                new Date(NOW_STR_2).valueOf()
            )
        
        expect(() => {
            postApp.modifyPost(postDTO.id, newSubject, newBody)
        }).toThrow("Post body should not be empty")
    })
})

describe("Given an author, when he add tag", () => {
    let postRepo: InMemoryPostRepository
    let postApp: PostApplication
    let postDTO: PostDTO
    beforeEach(() => {
        postRepo = new InMemoryPostRepository()
        postApp = new PostApplication(postRepo)
        postDTO = postApp.publishPost("subject", "body")
    })
    
    it("should success when the tag is not empty", () => {
        postApp.addTag(postDTO.id, "a tag")
        const post = postRepo.getById(postDTO.id)
        expect(post.tags[0].toString()).toBe("a tag")
    })
    
    it("should fail when the tag is empty", () => {
        expect(() => {
            postApp.addTag(postDTO.id, "")
        }).toThrow("add tag should not empty")
    })
})