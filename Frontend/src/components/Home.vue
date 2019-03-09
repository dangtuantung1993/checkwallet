<template>
    <div>
        <Header @clickToLogin="navigateToLogin" @clickToSignOut="signOut"></Header>
        <BlogPost></BlogPost>
        <div class="container-fluid bg-info">
            <div class="row">
                <div class="col-sm-4">
                    <span class="glyphicon glyphicon-globe logo"></span>
                </div>
                <div class="col-sm-8">
                    <h2>Our Values</h2>
                    <h4><strong>MISSION:</strong> Our mission lorem ipsum..</h4>
                    <p><strong>VISION:</strong> Our vision Lorem ipsum..</p>
                </div>
            </div>
        </div>
        <Ether></Ether>
        <div class="container-fluid bg-info" >
            <div class="text-center">
                <h2>Pricing</h2>
                <h4>Choose a payment plan that works for you</h4>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="panel panel-default text-center">
                        <div class="panel-heading">
                            <h1>Basic</h1>
                        </div>
                        <div class="panel-body">
                            <p><strong>20</strong> Lorem</p>
                            <p><strong>15</strong> Ipsum</p>
                            <p><strong>5</strong> Dolor</p>
                            <p><strong>2</strong> Sit</p>
                            <p><strong>Endless</strong> Amet</p>
                        </div>
                        <div class="panel-footer">
                            <h3>$19</h3>
                            <h4>per month</h4>
                            <button class="btn btn-lg">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="panel panel-default text-center">
                        <div class="panel-heading">
                            <h1>Pro</h1>
                        </div>
                        <div class="panel-body">
                            <p><strong>50</strong> Lorem</p>
                            <p><strong>25</strong> Ipsum</p>
                            <p><strong>10</strong> Dolor</p>
                            <p><strong>5</strong> Sit</p>
                            <p><strong>Endless</strong> Amet</p>
                        </div>
                        <div class="panel-footer">
                            <h3>$29</h3>
                            <h4>per month</h4>
                            <button class="btn btn-lg">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="panel panel-default text-center">
                        <div class="panel-heading">
                            <h1>Premium</h1>
                        </div>
                        <div class="panel-body">
                            <p><strong>100</strong> Lorem</p>
                            <p><strong>50</strong> Ipsum</p>
                            <p><strong>25</strong> Dolor</p>
                            <p><strong>10</strong> Sit</p>
                            <p><strong>Endless</strong> Amet</p>
                        </div>
                        <div class="panel-footer">
                            <h3>$49</h3>
                            <h4>per month</h4>
                            <button class="btn btn-lg">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-grey">
            <h2 class="text-center">CONTACT</h2>
            <div class="row">
                <div class="col-sm-5">
                    <p>Contact us and we'll get back to you within 24 hours.</p>
                    <p><span class="glyphicon glyphicon-map-marker"></span> Hanoi - Viet Nam</p>
                    <p><span class="glyphicon glyphicon-phone"></span> +84 888666893</p>
                    <p><span class="glyphicon glyphicon-envelope"></span> dangtuantung1993@gmail.com</p>
                </div>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <input class="form-control" id="name" name="name" placeholder="Name" type="text" required>
                        </div>
                        <div class="col-sm-6 form-group">
                            <input class="form-control" id="email" name="email" placeholder="Email" type="email" required>
                        </div>
                    </div>
                    <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br>
                    <div class="row">
                        <div class="col-sm-12 form-group">
                            <button class="btn btn-default pull-right" type="submit">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from '@/components/Header'
    import BlogPost from '@/components/BlogPost'
    import Ether from "./Ether";
    export default {
        name: "Home",
        components: {
            Ether,
            Header,
            BlogPost
        },
        data() {
            return {
                email :'',
                password: ''
            }
        },
        methods: {
            navigateToLogin(){
                this.$router.push("Login")
            },
            signOut(){
                this.$session.destroy()
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .logo-small {
        color: #f4511e;
        font-size: 50px;
    }

    .logo {
        color: #f4511e;
        font-size: 200px;
    }
    @media screen and (max-width: 768px) {
        .col-sm-4 {
            text-align: center;
            margin: 25px 0;
        }
    }

    .container-fluid {
        padding: 60px 50px;
    }
    .panel {
        border: 1px solid #f4511e;
        border-radius:0;
        transition: box-shadow 0.5s;
    }

    .panel:hover {
        box-shadow: 5px 0px 40px rgba(0,0,0, .2);
    }

    .panel-footer .btn:hover {
        border: 1px solid #f4511e;
        background-color: #fff !important;
        color: #f4511e;
    }

    .panel-heading {
        color: #fff !important;
        background-color: #f4511e !important;
        padding: 25px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .panel-footer {
        background-color: #fff !important;
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