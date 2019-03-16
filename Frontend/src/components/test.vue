<template>
    <div>
        <p>title: {{ blogPosts.title }}</p>
        <p>content: {{ blogPosts.content }}</p>

    </div>
</template>

<script>
    import {listBlogpost} from "../APIs/blogPostsAPI";

    export default {
        name: "test",
        data() {
            return {
                blogPosts: {}
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },

        methods: {
            fetchData: async function () {
                let blogposts = await listBlogpost()
                this.blogPosts = blogposts[this.$route.params.id]
            }
        }

    }
</script>

<style scoped>

</style>