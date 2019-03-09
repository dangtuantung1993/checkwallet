<template>
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
            <button type="button"
                    class="btn btn-success"
                    @click="insertblogposts">Thêm BlogPost
            </button>
        </form>
        <p>{{this.currentDateTime}}</p>
    </div>

</template>

<script>
    import {insertblogpost} from "../APIs/blogPostsAPI";
    import {APIResponse} from "../APIs/apiParameters";
    export default {
        name: "NewBlogpost",
        props: {
            message: String
        },
        //hàm data chứa các thuộc tính private
        data(){
            return {
                //các thuộc tính private
                currentDateTime : `Thời gian hiện tại : ${new Date().toLocaleTimeString()}`,
                title:'',
                content:'',
                insertblogpostResponse: new APIResponse(),
                errors: [],
            }
        },
        //Các phương thức "private"
        methods: {
            async insertblogposts() {
                this.checkForm()
                if (this.errors.length > 0){
                    return
                }
                let result = await this.$validator.validateAll()
                if (!result) {
                    return
                }


                this.insertblogpostResponse = await insertblogpost(this.title, this.content)
                 console.log(this.title, this.content)
            },
            checkForm() {
                this.errors = []
                if (!this.newBlogPost.title){
                    this.errors.push("Thiếu tiêu đề Blog")
                }
                if (!this.newBlogPost.content){
                    this.errors.push("Thiếu nội dung Blog")
                }
            }
        },
    }
</script>

<style scoped>

</style>