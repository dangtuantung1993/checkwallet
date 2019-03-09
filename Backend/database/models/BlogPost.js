/*
File này chứa BlogPost model
 */
const {mongoose} = require('../database')
const {Schema} = mongoose
const { verifyJWT } = require('./User')
const BlogPostSchema = new Schema({
    title: {type: String, default: 'Haha', unique: true},
    content: {type: String, default: ''},
    date: {type: Date, default: Date.now},
    //Trường tham chiếu, 1 blogpost do 1 người viết
    author:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
})
const BlogPost = mongoose.model('BlogPost',BlogPostSchema)
//User them moi bai viet
//User phai dang nhap (co tokenkey)
const insertBlogPost = async (title, content, tokenKey) =>{
    try {
        //Kiểm tra đăng nhập = có tokenKey "còn hạn" ko
        let signedInUser = await verifyJWT(tokenKey)
        let newBlogPost = await BlogPost.create({
            title, content,
            date: Date.now(),
            author: signedInUser
        })
        await newBlogPost.save()
        await signedInUser.blogPosts.push(newBlogPost)
        await signedInUser.save()
        return newBlogPost
    } catch(error) {
        throw error
    }
}
const listAll = async()=>{
    try {
        let blogPosts = await BlogPost.find({})
        return blogPosts
    }catch (error) {
        
    }
    
}
const queryBlogPosts  = async (text) =>{
    try {
        let blogPosts = await BlogPost.find({
            $or:[
                {
                    title: new RegExp(text, "i")//i khong phan biet hoa thuong
                },
                {
                    content: new RegExp(text, "i")
                }

            ]
        })
        return blogPosts

    }catch (error) {
        throw  error
    }

}
//Lấy các bài post trong khoảng ngày A => ngày B
//VD1: http://127.0.0.1:3000/blogposts/queryBlogPostsByDateRange?from=01-11-2018&to=05-11-2018
const queryBlogPostsByDateRange = async (from, to) =>{
    //format: dd-mm-yyyy
    let fromDate = new Date(parseInt(from.split('-')[2]),
        parseInt(from.split('-')[1])-1,
        parseInt(from.split('-')[0]))
    let toDate = new Date(parseInt(to.split('-')[2]),
        parseInt(to.split('-')[1])-1,
        parseInt(to.split('-')[0]))

    try {
        let blogPosts = await BlogPost.find({
            date: {$gte: fromDate, $lte: toDate},
            //$gte="greater than or equal", $lte="less than or equal"
        })
        return blogPosts
    } catch(error) {
        throw error
    }
}
//Lấy nội dung chi tiết 1 BlogPost => ko cần token
const getDetailBlogPost = async (blogPostId) =>{
    try {
        let blogPost = await BlogPost.findById(blogPostId)
        if (!blogPost) {
            throw `Không tìm thấy blogpost với Id=${blogPostId}`
        }
        return blogPost
    } catch(error) {
        throw error
    }
}
const updateBlogPost = async (blogPostId, updateBlogPost, tokenKey) =>{
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let blogPost = await BlogPost.findById(blogPostId)
        if (!blogPost) {
            throw `Không tìm thấy blogpost với Id=${blogPostId}`
        }
        if (signedInUser.id !== blogPost.author.toString()) {
            throw `Không update được vì bạn không phải là tác giả bài viết`
        }
        blogPost.title = !updateBlogPost.title?
            blogPost.title: updateBlogPost.title
        blogPost.content = !updateBlogPost.content?
            blogPost.content : updateBlogPost.content
        blogPost.date = Date.now()
        await blogPost.save()
        return blogPost


    }catch (error) {
        throw error
    }

}
//Xóa 1 Blogpost
//1 . xóa 1 bản ghi trong bảng Blogpost
//2. cập nhật trường tham chiếu blogPosts trong bảng user
//=> mảng blogPosts bớt đi 1 phần tử

const deleteBlogPost = async (blogPostId, tokenKey)=>{
    try {
        let signedInUser = await verifyJWT(tokenKey)
        let blogPost = await BlogPost.findById(blogPostId)
        if (!blogPost) {
            throw `Không tìm thấy blogpost với Id=${blogPostId}`
        }
        if (signedInUser.id !== blogPost.author.toString()) {
            throw `Không xóa được vì bạn không phải là tác giả bài viết`
        }
        await BlogPost.deleteOne({_id:blogPostId})
        signedInUser.blogPosts = await signedInUser.blogPosts
            .filter(eachBlogPost =>{
                return blogPost._id.toString() !==eachBlogPost._id.toString()
            })
        await signedInUser.save()
    }catch (error) {
        throw error
    }
}
const deleteBlogPostsByAuthor = async (authorID)=>{
    try {
        await BlogPost.deleteMany({
            author: authorID
        })
    }catch (error) {
        throw error
    }
}

module.exports = {
    BlogPost,
    insertBlogPost,
    queryBlogPosts,
    queryBlogPostsByDateRange,
    getDetailBlogPost,
    updateBlogPost,
    deleteBlogPost,
    listAll,
    deleteBlogPostsByAuthor,
}