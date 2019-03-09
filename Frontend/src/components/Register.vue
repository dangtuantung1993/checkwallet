<template>
    <div class="jumbotron text-center">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <h1>Register</h1>
                <div class="form-group">
                    <input type="text"
                           v-model="fullName"
                           name="fullname"
                           v-validate="'required'"
                           :class="{'form-control': true,
                                            'border-danger': errors.has('fullName')}"
                           placeholder="Enter your Full Name" autofocus>
                    <span v-show="errors.has('fullName')" class="text-danger">
                                            {{ errors.first('fullName') }}
                            </span>
                </div>
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
                           ref="password"
                           placeholder="Password">
                    <span v-show="errors.has('password')" class="text-danger">
                                            {{ errors.first('password') }}
                            </span>
                </div>
                <div class="form-group">
                    <input type="password"
                           class="form-control"
                           name="rePassword"
                           v-validate="'required|confirmed:password'"
                           :class="{'form-control': true,
                                            'border-danger': errors.has('rePassword')}"
                           data-vv-as ="password"
                           placeholder="Type Password Again">
                    <span v-show="errors.has('rePassword')" class="text-danger">
                                            {{ errors.first('rePassword') }}
                    </span>
                </div>
                <button class="btn-lg btn-success btn-block text-uppercase"
                        @click="createAccount">
                    Create Account
                </button>
                <span v-if="registerResponse.result === false"
                      class="text-danger">{{registerResponse.message}}
                </span>
                <span v-else
                      class="text-success">{{registerResponse.message}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {registerUser} from "../APIs/usersAPI";
    import {APIResponse} from "../APIs/apiParameters";

    export default {
        name: "Register",
        props: {},
        data(){
            return {
                fullName :"",
                email:"",
                password:"",
                retypePassword: "",
                registerResponse: new APIResponse()
            }
        },
        methods : {
            wait: function(ms) {
                return new Promise(r => setTimeout(r, ms))
            },
            async createAccount() {
                let result = await this.$validator.validateAll()
                if (!result){
                    return
                }
                this.registerResponse = await registerUser(this.fullName, this.email, this.password)
                await this.wait(5000)
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>