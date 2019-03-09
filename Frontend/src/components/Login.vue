<template>
    <div class="container">
        <div class="jumbotron text-center">
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <h1>Login</h1>
                            <div class="form-group">
                                <input type="text" id="inputEmail"
                                       class="form-control"
                                       v-model="email"
                                       name="email"
                                       v-validate="'required|email'"
                                       :class="{'form-control': true,
                                            'border-danger': errors.has('email')}"
                                       placeholder="Email Address" autofocus>
                                <span v-show="errors.has('email')" class="text-danger">
                                            {{ errors.first('email') }}
                            </span>
                            </div>
                            <div class="form-group">
                                <input type="password"
                                       class="form-control"
                                       v-model="password"
                                       name="password"
                                       v-validate="'required'"
                                       :class="{'form-control': true,
                                            'border-danger': errors.has('password')}"
                                       placeholder="Password">
                                <span v-show="errors.has('password')" class="text-danger">
                                            {{ errors.first('password') }}
                            </span>
                            </div>
                    <ul class="agileinfotickwthree">
                        <li>
                            <input type="checkbox" id="brand1" value="">
                            <label for="brand1"><span></span>Remember me</label>
                            <a href="#">Forgot password?</a>
                        </li>
                    </ul>
                            <p> To register new account <span>→</span> <a class="w3_play_icon1" href="#/register"> Click Here</a></p>
                            <div class="clear"></div>
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-success text-uppercase" style="width: 75%;height: 50px" @click="login">Login</button>
                        <button class="btn-lg btn-facebook btn-block text-uppercase"
                                @click="loginFacebook">
                            <i class="fab fa-facebook-f mr-2"></i>
                            Facebook
                        </button>
                        <button class="btn-lg btn-google btn-block text-uppercase"
                                    @click="loginGoogle">
                                <i class="fab fa-google mr-2"></i>
                                Google
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {loginUser} from "../APIs/usersAPI";
    export default {
        name: "Login",
        components: {

        },
        props:{

        },
        data(){
            return {
                email: '' ,
                password: ''
            }
        },
        methods :{
            async login() {
                let result = await this.$validator.validateAll()
                if (!result){
                    return
                }
                let loggedInUser = await loginUser(this.email, this.password)
                if (Object.keys(loggedInUser).length > 0) {
                    this.$session.start()
                    this.$session.set('loggedInUser',loggedInUser)
                    this.$router.push('/')
                } else {
                    alert(`dang nhap khong thanh cong`)
                }

            },
            async loginFacebook () {
                alert('ban bam dang nhap')
            },
            async loginGoogle () {
                alert('ban bam dang nhap')
            }
        }
    }

</script>

<style scoped>
    .container {
        background: url("../assets/b2.jpg")  no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        max-width: 100%;
        height: max-content;
    }
    .form-group {
        position: relative;
        margin:0 auto;
        margin-bottom: 20px;
        width: 75%;
    }

    .jumbotron {
        background:none;
        color: #fff;

    }
    ul.agileinfotickwthree {
        list-style: none;
        display: inline-block;
        width: 100%;
        margin-left: 50px;
        margin-bottom: 20px;
        text-align: left;
        padding-left: 10px;
    }
    ul.agileinfotickwthree li input[type="checkbox"]+label {
        position: relative;
        padding-left: 20px;
        border: #F0F8FF;
        display: inline-block;
        font-size: 20px;

    }
    ul.agileinfotickwthree a {
        float: right;
        margin-right: 100px;
        color: #fff;
        font-size: 20px;
    }
     .btn-facebook {
        background-color: blue;
         border: none;
         width: 75%;
         margin-top: 5px;
         position: relative;
         margin:20px auto;
         color: white;
    }
    .btn-google {
        background-color: red;
        border: none;
        width: 75%;
        position: relative;
        margin:20px auto;
        color: white;
    }

</style>