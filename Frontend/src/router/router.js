import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import VueRouter from 'vue-router'
import BlogPost from '@/components/BlogPost'
import Ether from "../components/Ether"
import BlogPostID from "../components/BlogPostID"
import NewBlogpost from "../components/NewBlogpost"
import Test from "../components/test"

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/', component: Home},
    {path: '/blogpost', component: BlogPost},
    {path: '/ether', component: Ether},
    {path:'/newblogpost',component:NewBlogpost},
    {path: '/blogpost/:id',name:'BlogPostID', component: BlogPostID},
    {
        path: '/test/:id',
        name: 'test',
        component: Test
    }

]
export default new VueRouter({routes})
