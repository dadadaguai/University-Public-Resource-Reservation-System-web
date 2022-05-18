<template>
    <div class="bottomBody">
        <div class="loginCard">
                <div class="imgPos">
                    <el-image
                        style="width: 8rem; height: 8rem"
                        :src="require('../assets/logo.png')">
                    </el-image>            
                </div>   
                <el-divider content-position="center">高校公共资源预约系统</el-divider>
                <el-form ref="form" :model="form" label-width="240px">
                    <div v-if="init" class="input-style">
                        <el-select 
                            v-model="form.account" 
                            placeholder="用户名"
                            filterable 
                            @change="changeSelect"
                            allow-create
                            empty
                        >
                            <el-option
                                v-for="item in userInfoArray"
                                :key="item.account"
                                :label="item.account"
                                :value="item.account"
                                >
                            </el-option>
                        </el-select>
                        <el-input v-model="form.password"  type="password" placeholder="密码"></el-input>
                    </div>
                    <div  v-if="!init" class="input-style">
                        <el-input v-model="form.account" placeholder="用户名"></el-input>
                        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
                    </div>
                    
                    <div class="operatePasswd">
                        <div>
                            <span>记住密码 </span>
                            <el-switch v-model="form.record"></el-switch>
                        </div>
                        <!-- <el-link class="pos">忘记密码？</el-link> -->
                    </div>
                    <el-button type="primary" :plain="true" @click="onSubmit" round>登录</el-button>
                </el-form>
        </div>
    </div>
 
</template>

<script>
    export default {
        name:'Login',
        data() {
            return {
                form: {
                    account: '',
                    password: '',
                    record: false,
                },
                Storage:null,
                term:null
            }
        },
        computed:{
            userInfoArray() {
                this.Storage = JSON.parse(localStorage.getItem('userInfo'))
                return Object.values(this.Storage).filter( res =>{
                    return res.account !== '';
                })
            },
            // 初次登录网站判断
            init(){
                return JSON.parse(localStorage.getItem('userInfo')).length === 1 ? false : true 
            }
        },
        methods: {
            // 更换选项值后调用的方法
            changeSelect(element) {
                for (const it of Object.values(this.userInfoArray)) {
                    if(it.account === element){
                        this.form.password = it.password
                        break;
                    }else{
                        this.form.password = ''
                    }
                }
            },
            onSubmit(e) {
                if(this.form.account.length === 0 || this.form.password.length === 0){
                    this.$message.error('账号或密码为空，请输入账号密码。');
                }else{
                    // 先与后端进行密码验证，并返回用户信息
                    this.$axios.post('http://localhost:8087/user/loginVerification',{
                        "password":this.form.password,
                        "uId":Number(this.form.account),
                    })
                    .then(res =>{
                        //  根据返回的code来验证是否登陆成功
                        if(res.data.code === -1){
                            this.$message({
                                type:'warning',
                                message:res.data.msg
                            })
                        }else{
          
                            // 验证成功，进行记住密码功能验证
                            // 判断里面是否已有该账户
                            let userList =  JSON.parse(localStorage.getItem('userInfo')).filter(res => {
                                return res.account !== this.form.account;
                            })
                            if(this.form.record){
                                // 如果用户点击了记住密码选项，则将密码账户缓存到用户本地。
                                userList.unshift(this.form)
                            }
                            // 将账号添加到缓存中去。
                            localStorage.setItem('userInfo',JSON.stringify(userList))
                        
                            // 加载展示
                            // 验证成功，跳转页面到homepage
                            const loading = this.$loading({
                                lock: true,
                                text: '登录中',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            setTimeout(() => {
                                loading.close();
                                this.$router.push({
                                    path:'/HomePage',
                                })
                            }, 1000);
                            // 全局store赋值，userInfo在各个组件间都可使用。
                            this.$store.commit('setUserInfo',res.data.data)

                        }
                    })
                }
            },
            getTerm(){
                var thisTerm = {}
                this.$axios.get('http://localhost:8087/teachingweek/getTerm',{
                    params:{
                        currentTime:new Date().getTime()
                    }
                }).then(
                    res =>{
                        this.term = res.data.data
                        this.$store.commit('setTerm',res.data.data)
                    }
                )
            }
        },
        beforeCreate() {
             // 先判断本地缓存里是否有用户信息，若无，创建一个useInfo数组字段，
             // 若有，则读取数组里面的数据，将数组第一条数据直接绑定到用户密码上。
            if(localStorage.length === 0 || localStorage.getItem('userInfo') === null){
                //  初始化一个userInfo,并存入数组userInfoArr中
                //  默认值
                let userInfo = {
                    account: '',
                    password: '',
                    record: false, 
                }
                let userInfoArr = []
                userInfoArr.unshift(userInfo)
                // 将userInfo缓存到本地
                localStorage.setItem('userInfo',JSON.stringify(userInfoArr))
            }
        },
        mounted() {
            //  读取本地缓存，并将第一个数据存入form中。
            this.form = JSON.parse(localStorage.getItem('userInfo'))[0]
            this.getTerm()
        }

    }
</script>

<style scoped>
    .bottomBody{
        height: 824px;
        display: flex;
        flex-direction: column;
        align-items:center;  
        justify-content: center;  
        /* background-color: aquamarine;   */
        background-image: url('../assets/bg.png');  
    }
    .loginCard{
        height: 420px;
        width:360px;
        border-radius:5px;
        background-color:rgb(255, 255, 255);
        opacity: 0.72;
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items:center;
    }
    .input-style{
         display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items:center;
    }
    .el-input{
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        width: 300px;
    }
    .el-select{
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        width: 300px;
    }
    .el-form{
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items:center;
        /* background-color: aqua; */
    }
    .operatePasswd{
        width: 100%;
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
    }
    .el-button{
        margin-top: 20px;
        width: 240px;
    }
    .imgPos{
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items:center;
    }
</style>