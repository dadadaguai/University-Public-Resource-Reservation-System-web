<template>
    <div class="basic">
        <div class="title">即时聊天</div>
        <div class="body-main">
            <div class="msg-name">
                管理员
            </div>
            <div class="msg-show" ref="messageShow">
                <!-- <div class="send-style">
                    <p class="send-text">{{sendMessage}}</p>
                    <img :src="avatar" class="img-style">
                </div>
                <div class="receive-style">

                </div> -->
            </div>
            <div class="msg-operate">
                <div class="img-upload"></div>
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="6"
                    placeholder="请输入聊天内容"
                    v-model="inputText"
                    :maxlength="600"
                    style="border:none;"
                    >
                </el-input>
                <el-button type="primary" size="mini" @click="sendNewMessage">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Chat",
        data() {
            return {
                inputText:'',
                sendMessage:'',
                receiveMessage:'',
                avatar:'',
                'send-style':{
                    float: "right",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                    backgroundColor: 'rgb(121, 210, 231)',
                    display: "flex",
                    alignItems: "center",
                    width: "40%",
                    justifyContent: "space-between",
                    borderRadius: "0.5rem",
                }
            }
        },
        methods:{
            sendNewMessage(){
                // 创建div标签
                let send = document.createElement('div')
                send.className = 'send-style'
                let attr = this.$refs.messageShow.attributes[0].name
                send.setAttribute(attr,'')
                this.$refs.messageShow.appendChild(send)
                // 添加msg内容
                let pMsg = document.createElement('p')
                pMsg.className = 'send-text'
                pMsg.setAttribute(attr,'')
                pMsg.innerText = this.inputText
                this.sendMessage = this.inputText
                send.appendChild(pMsg)
                // 创建头像
                let userImg = document.createElement('img')
                userImg.src = this.avatar
                userImg.className = 'img-style'
                userImg.setAttribute(attr,'')
                send.appendChild(userImg)
                this.inputText = ''
            }
        },
        mounted(){
            this.avatar = this.$store.state.userInfo.sex === '女' ? require("../assets/girl.png") : require("../assets/boy.png")
        }
    }
</script>

<style scoped>
    .basic{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* border-radius: 0.5rem;
        box-shadow: 1rem 1rem 1rem #cdcfcf; */
    }
    .title{
        font-size: 16px;
        font-weight: 700;
        /* margin-left: 1rem; */
        padding-right: 106rem;
        /* height:8%; */
        color: rgb(43, 42, 42);
    }
    .el-divider{
        margin:0;
    }
    .body-main{
        height:90%;
        width: 50%;
        border-radius: 1rem;
        background-color: rgb(240, 240, 240);
        border:0.5px solid rgb(221, 221, 221);
    }
    .msg-name{
        font-size: 20px;
        text-align: center;
        padding: 0.5rem;
        height: 5%;
        border-bottom:0.5px solid rgba(188, 192, 193, 0.416);
    }  
    .msg-show{
        width: 100%;
        height: 55%;
        border-radius: 1rem 1rem 0rem 0rem;
    }
    .msg-operate{
        width: 100%;
        background-color: rgb(255, 255, 255);
        height: 37.85%;
        border-radius: 0rem 0rem 1rem 1rem;
        /* border-bottom:0.5px solid rgb(221, 221, 221); */
        /* border-top: 0; */

    }
    .img-upload{
        border-bottom:0.5px solid rgba(188, 192, 193, 0.416);
        height: 10%;
    }
    .el-button{
        width: 80px;
        border-radius: 0.5rem;
        float: right;
        margin-right: 0.8rem;
    }
    .el-textarea{
        margin-bottom: 1.8rem;
    }
    /* 解决输入框的边框问题 */
    .el-textarea >>> .el-textarea__inner{
        border: none;
        outline: none;
    }
    .img-style{
        height: 3rem;
        width: 3rem;
        background-color: white;
    }
    .send-style{
        float: right;
        margin-bottom: 1rem;
        margin-top: 1rem;
        background-color: rgb(121, 210, 231);
        display: flex;
        align-items: center;
        width: 40%;
        margin-left: 50%;
        justify-content: space-between;
        border-radius: 0.5rem;
    }
    .send-text{
        width: 80%;
        /* margin-right: 1rem ; */
        margin-left: 0.5rem;
        color: rgb(47, 47, 47);
    }
</style>