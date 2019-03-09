<template>
        <div id="blogpost" class="container-fluid">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="post-preview"
                         v-for="blogPost in blogPosts"
                         :key="blogPost.title">
                        <a  v-on:click="seen = !seen">
                            <h2 class="post-title">
                               {{blogPost.title}}
                            </h2>

                            <h3 class="post-subtitle"
                                v-if="seen">
                                {{blogPost.content}}
                            </h3>

                        </a>

                        <p class="post-meta">Posted by <a href="#">{{blogPost.author}}</a>
                        </p>
                    </div>
                </div>
                <div>
                    <button type="button"
                            @click="clickNewBlogpost" >New Blogpost</button>
                </div>
            </div>
        </div>

</template>

<script>
    import {listBlogpost} from '../APIs/blogPostsAPI';
    export default {
        name: 'BlogPost',
        //props chứa các thuộc tính public
        components:{
        },

        props: {},
        data: function () {
            return{
                blogPosts:[
                ],
                seen :false
            }

        },
        mounted(){
            this.getDataFromAPI()

        },

        methods: {
            getDataFromAPI: async function () {
                let Blogposts = await listBlogpost()
                this.blogPosts = Blogposts

            },
            clickNewBlogpost(){
                this.$router.push('/newblogpost')
            }
        }
    }

</script>

<style scoped>


    .post-preview > a {
        color: #404040;
    }
    .post-preview > a:hover,
    .post-preview > a:focus {
        text-decoration: none;
        color: #0085a1;
    }
    .post-preview > a > .post-title {
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 10px;
    }
    .post-preview > a > .post-subtitle {
        margin: 0;
        font-weight: 300;
        margin-bottom: 10px;
    }
    .post-preview > .post-meta {
        color: #808080;
        font-size: 18px;
        font-style: italic;
        margin-top: 0;
    }
    .post-preview > .post-meta > a {
        text-decoration: none;
        color: #404040;
    }
    .post-preview > .post-meta > a:hover,
    .post-preview > .post-meta > a:focus {
        color: #0085a1;
        text-decoration: underline;
    }
    p a {
        text-decoration: underline;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 800;
    }
    a {
        color: #404040;
    }
    a:hover,
    a:focus {
        color: #0085a1;
    }
</style>
