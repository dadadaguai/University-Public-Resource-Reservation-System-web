<template>
    <div class="basic">
        <div class="title">即时聊天</div>
        <div class="body-main">
            <div class="msg-name">
                管理员
            </div>
            <div class="msg-show" ref="messageShow">
                <el-table
                    ref="table"
                    :show-header="false"
                    :data="tableData"
                    style="width: 100%;"
                    height="100%"
                    :border="true"
                    class="customer-table"
                    >
                        <el-table-column class="cell"
                        >
                        <template slot-scope="scope">
                            <div class="chat-message" :style="scope.row.spokesman == '管理员' ? 'float:left' : 'float:right'">
                                <div class="chat-message-date" :style="scope.row.spokesman == '管理员' ? 'align-self:flex-start' :'align-self:flex-end'">
                                    {{scope.row.gmtCreate}}
                                </div>
                                <div class="chat-message-text" :style="scope.row.spokesman == '管理员' ? 'align-self:flex-start' :'align-self:flex-end'">
                                    {{scope.row.text}}
                                </div>
                            </div>
                            
                            <!-- <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                        </template>
                        </el-table-column>
                    </el-table>
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
                <el-button type="primary" size="mini" @click="submitNewChat">发送</el-button>
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
                tableData:[],
                frequency:null,
                test:{
                    // sendMessage:'',
                    // receiveMessage:'',
                    // avatar:'',
                    // 'send-style':{
                    //     float: "right",
                    //     marginBottom: "1rem",
                    //     marginTop: "1rem",
                    //     backgroundColor: 'rgb(121, 210, 231)',
                    //     display: "flex",
                    //     alignItems: "center",
                    //     width: "40%",
                    //     justifyContent: "space-between",
                    //     borderRadius: "0.5rem",
                    // },
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
            },
            chatRequest(){
                this.$axios.get('http://localhost:8087/chat/chatCondition',{
                    params:{
                        userId:this.$store.state.userInfo.uId,
                        managerId:'1'
                    }
                }).then(
                    res => {
                        this.tableData = res.data.data.map(
                            data => {
                                if(data.spokesman == '管理员'){
                                    data.gmtCreate = data.spokesman +'\t'+this.dayjs(data.gmtCreate).format('YYYY-MM-DD HH:mm:ss')
                                }else {
                                    data.gmtCreate = this.dayjs(data.gmtCreate).format('YYYY-MM-DD HH:mm:ss')+'\t'+data.spokesman
                                } 
                                return data
                            }
                        )
                    }
                )            
            },
            submitNewChat(){
                this.$axios.post('http://localhost:8087/chat/addChat',{
                    id: new Date().getTime().toString().concat(this.$store.state.userInfo.uId.toString().substring(4,8)),
                    userId: this.$store.state.userInfo.uId,
                    managerId: "1",
                    spokesman: this.$store.state.userInfo.username,
                    text: this.inputText
                }).then(
                    res => {
                        if(res.data.code === 0){
                            this.chatRequest()
                            this.inputText = ''
                        }
                    }
                )
            }
        },
        created(){
            
        },
        mounted(){
            this.frequency = setInterval(this.chatRequest(), 1000);
            
            // 解决不能将滚动条始终置底的问题，尚未解决
            // var len
            // this.observer = new MutationObserver(() => {
            //     // let tableList = this.$refs.table.$el.children[1].children[0].children[1].children
            //     let tableList = document.getElementsByTagName('tr')
            //     // console.log(tableList.length);
            //     len = tableList.length
            //     if(len != 0){
                    
            //         console.log(tableList[len-1]);
            //     }
            // });
            
            // this.observer.observe(this.$refs.table.$el, {
            //     childList: true,
            //     subtree: true,
            //     // attributes: true
            // });
        },
        beforeDestroy(){
            clearInterval(this.frequency)
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
    .chat-message{
       /* background-color: rgb(121, 210, 231); */
       flex: right;
       width: 80%;
       display: flex;
       flex-direction: column;
       justify-content: flex-start;
    }
    .chat-message-date{
        color: rgb(51, 51, 51);
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .chat-message-text{
        font-size: large;
        background-color: rgb(215, 215, 215);
        border-radius: 1rem;
        width: auto;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.75rem;
    }
    .cell{
        background-color: bisque;
    }

    /* Element-ui table表格去掉所有单元格边框 */
    /* 在el-table 中添加class="customer-table"类名 */

/* // 去掉表格单元格边框 */
.customer-table th{
    border:none;
  }

</style>