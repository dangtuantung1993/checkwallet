<template>
    <div class="container-fluid" id="ether">
       <div class="row">
            <div class="col-lg-12" style="display: flex">
                <div class="col-lg-4" v-if="listname.length">
                    <label class="typo__label"
                    >Select with search</label>
                    <multiselect v-model="name"
                                 :options="listname"
                                 :custom-label="nameWithLang"
                                 placeholder="Select one"
                                 label="wal"
                                 track-by="wal"
                                 @select="onSelect"
                    ></multiselect>
                </div>
                <div class="col-lg-8"
                     v-if="listname.length">
                    <code >
                        <div class="table" >
                            <table class="table-hover" >
                                <thead >
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Contract</th>
                                    <th scope="col">Balance</th>
                                </tr>
                                </thead>

                                <tbody >
                                <tr v-for="(token, index) in tokens"
                                    :key="index">
                                    <th scope="col">{{index}}</th>
                                    <td >
                                        {{token.tokenInfo.name}}
                                    </td>
                                    <td> {{ token.tokenInfo.symbol}}</td>
                                    <td>{{token.tokenInfo.address}}</td>
                                    <td>{{(token.balance / (Math.pow(10, parseInt(token.tokenInfo.decimals)))).toFixed(2)}}</td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </code>
                </div>


            </div>
        </div>
        <div class="form-group" style="text-align: center">
            <p v-if="!listname.length">
                <textarea class="form-control"
                          style="margin:50px auto;width:50%;"
                          rows="5"
                          v-model="wallets_input"
                          name="your_list_wallets"
                          placeholder="Nhap dia chi vi" autofocus
                          v-validate="'required'"
                          :class="{'form-control': true,
                                     'border-danger': errors.has('your_list_wallets')}">
                </textarea>
                <span v-show="errors.has('your_list_wallets')" class="text-danger">
                                                    {{ errors.first('your_list_wallets') }}
                </span>
            </p>
        </div>
        <button v-if="!listname.length"
                type="button"
                class="btn btn-success text-uppercase"
                @click="send"
                v-on:click="isshow = false">send
        </button>



    </div>
</template>

<script>
    import {list} from '../APIs/ethplorerAPI';
    import Multiselect from 'vue-multiselect'
    import Header from "./Header";
    export default {
        name: "Ether",
        components:{
            Header,
            Multiselect
        },

        props: {},
        data: function () {
            return {
                isshow2:false,
                isshow: true,
                wallets_input: '',
                ethers: null,
                tokens: {},
                list_wallets: [],
                name:{ wal: 'Wallet'},
                listname:[],
                error:[]
            }

        },

        methods: {
            wait: function(ms) {
                return new Promise(r => setTimeout(r, ms))
            },
            async send() {
                this.checkForm()
                if (this.errors.length > 0){
                    return
                }
                let result = await this.$validator.validateAll()
                if (!result) {
                    return
                }

                let list_wallets = await this.wallets_input.split('\n')
                for(var i = 0; i < list_wallets.length;i++){
                    this.listname.push({wal: list_wallets[i]})
                    await this.getDataFromAPI(`${list_wallets[i]}`)
                    await this.wait(5000)
                }

            },
            checkForm() {
                this.error = []
                if (!this.wallets_input) {
                    this.error.push("Ban can nhap danh sach dia chi vi")
                }
            },
            getDataFromAPI: async function (your_wallet) {
                let eth = await list(your_wallet)
                this.ethers = eth
                this.tokens = eth.tokens
            },
            navigateToLogin(){
                this.$router.push("Login")
            },
            signOut(){
                this.$session.destroy()
                this.$router.push('/')
            },
            nameWithLang ({wal}) {
                return `${wal}`
            },

            onSelect (option) {
                this.getDataFromAPI(option.wal);
            },
        },
    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">


</style>

<style scoped>
    .table-hover{
        color: black;
        text-align: center;
        width: 100%;
    }
    tr {
        width: max-content;
    }
    mutiselect {
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 360px;
        display: block
    }
    .container-fluid {
        text-align: center;
    }
    .btn-success {
        width: 50%;
    }
</style>