<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">Dangtuantung</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#ether">Check List Ví</a></li>
                        <li><a href="#blogpost">Bài Viết</a></li>
                        <li class="nav-item align-middle"
                            v-if="this.isLoggedIn==true">
                            <a @click="newblogpost">Thêm Bài Viết</a>
                        </li>
                        <li class="nav-item align-middle"
                            v-if="this.isLoggedIn==true">
                            <a v-show="userName.length > 0" class="align-middle ml-2">{{userName}}</a>

                        </li>
                        <li class="nav-item align-middle"
                            v-if="this.isLoggedIn==true">
                            <a @click="clickToSignOut">
                                Sign out
                            </a>
                        </li>
                        <li class="nav-item" v-else>
                            <a @click="this.clickToLogin"
                            >Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="jumbotron text-center">
            <h1>Company</h1>
            <p>We specialize in blablabla</p>
            <form class="form-inline">
                <div class="input-group">
                    <input type="email" class="form-control" size="50" placeholder="Email Address" required>
                    <div class="input-group-btn" >
                        <button type="button" class="btn btn-danger">Subscribe</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                userName:'',
                profileUrl:'',
                isLoggedIn: false
            }
        },
        created() {
            if (this.$session.exists()) {
                let userObject = this.$session.get('loggedInUser')
                this.userName = userObject.name ? userObject.name : ''
                this.profileUrl = userObject.profileUrl ? userObject.profileUrl : ''
                this.isLoggedIn = userObject ? true : false
            } else {
                this.userName = ""
                this.profileUrl = ""
                this.isLoggedIn = false
            }
        },
        methods: {
            clickToLogin() {
                this.$emit('clickToLogin')
            },
            clickToSignOut() {
                this.userName = ''
                this.profileUrl = ''
                this.isLoggedIn = false
                this.$emit('clickToSignOut')
            },
            newblogpost(){
                this.$router.push('/newblogpost')
            }
        }
    }
</script>

<style scoped>
    .container{
        display: inline;
    }
    .navbar {
        margin-bottom: 0;
        background-color: #f4511e;
        z-index: 9999;
        border: 0;
        font-size: 12px !important;
        line-height: 1.42857143 !important;
        letter-spacing: 4px;
        border-radius: 0;
    }

    .navbar li a, .navbar .navbar-brand {
        color: #fff !important;
    }

    .navbar-nav li a:hover, .navbar-nav li.active a {
        color: #f4511e !important;
        background-color: #fff !important;
    }

    .navbar-default .navbar-toggle {
        border-color: transparent;
        color: #fff !important;
    }
    .navbar-right {
        display: inline;
    }
    .form-inline{
        flex-direction: column;
        display: flex;
    }
    .jumbotron {
        background-color: #f4511e;
        color: #fff;
        padding: 100px 25px;
    }

    @media screen and (max-width: 768px) {
        .col-sm-4 {
            text-align: center;
            margin: 25px 0;
        }
    }


    .panel-footer h3 {
        font-size: 32px;
    }

    .panel-footer h4 {
        color: #aaa;
        font-size: 14px;
    }

    .panel-footer .btn {
        margin: 15px 0;
        background-color: #f4511e;
        color: #fff;
    }
</style>