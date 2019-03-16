<template>
    <div>
        <Header @clickToLogin="navigateToLogin" @clickToSignOut="signOut"></Header>
        <div class="container">
            <form class="col-lg-6">
                <div class="form-group">
                    <label>Tiêu đề Blog</label>
                    <input v-model="title" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Nội dung Blog:</label>
                    <textarea rows="5" class="form-control"
                              v-model="content"></textarea>
                </div>
                <div v-if="errors.length" class="alert alert-danger">
                    <b>Lỗi không thêm được BlogPost</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{error}}</li>
                    </ul>
                </div>
                <div v-if="isshow == true">
                    <h1>Thêm mới bài viết thành công</h1>
                </div>

                <button type="button"
                        class="btn btn-success"
                        @click="insertblogposts">Thêm Bài Viết
                </button>
            </form>
            <p>{{this.currentDateTime}}</p>
        </div>
    </div>

</template>

<script>
    import {insertblogpost} from "../APIs/blogPostsAPI";
    import {APIResponse} from "../APIs/apiParameters";
    import Header from "./Header";
    export default {
        name: "NewBlogpost",
        components: {Header},
        props: {
            message:"Hello"
        },
        beforeCreate() {
            if (!this.$session || !this.$session.get('loggedInUser')) {
                this.$router.push('/')
            }
        },
        //hàm data chứa các thuộc tính private
        data(){
            return {
                //các thuộc tính private
                currentDateTime : `Thời gian hiện tại : ${new Date().toLocaleTimeString()}`,
                blogPosts:[],
                title:'',
                content:'',
                insertblogpostResponse: new APIResponse(),
                errors: [],
                isshow:false
            }
        },
        //Các phương thức "private"
        methods: {
            async insertblogposts() {
                this.checkForm()
                if (this.errors.length > 0) {
                    return
                }
                let result = await this.$validator.validateAll()
                if (!result) {
                    return
                }
                const token = this.$session.get('loggedInUser').tokenKey;
                this.insertblogpostResponse = await insertblogpost(this.title, this.content, token)
                this.isshow = true
            },
            checkForm() {
                this.errors = []
                if (!this.title){
                    this.errors.push("Thiếu tiêu đề Blog")
                }
                if (!this.content){
                    this.errors.push("Thiếu nội dung Blog")
                }
            },
            navigateToLogin(){
                this.$router.push("Login")
            },
            signOut(){
                this.$session.destroy()
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
.btn-success{
    margin-bottom: 50px;
}
</style>