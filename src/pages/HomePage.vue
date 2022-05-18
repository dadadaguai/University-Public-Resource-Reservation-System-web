<template>
    <div :style="viewStyle" >
        <el-container :height="transPxStr(windowView.height)">
            <el-header :height="transPxStr(windowView.height*0.06)">
                <span class="title">高校公共资源预约系统</span>
                <div class="userShow">
                    <el-tooltip class="item" effect="dark" content="更换主题颜色" placement="bottom">
                        <el-button icon="el-icon-brush" size="small" circle @click="dialogVisible = true"></el-button>
                    </el-tooltip>
                    <el-avatar :src="avatar" class="img-style"></el-avatar>
                    <span class="title">
                       {{user.username}}
                    </span>
                    <el-popconfirm
                            confirm-button-text='确认'
                            cancel-button-text='取消'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定要退出登录吗？"
                            @confirm="leaveSystem"
                            >
                            <el-button slot="reference"  circle size="small">
                                <el-image
                                    style="width: 12px; height: 12px"
                                    :src="require('../assets/leave.png')"
                                    fit="scale-down">
                                </el-image>
                            </el-button>
                    </el-popconfirm>
                </div>                
            </el-header>
            <el-container :style="innerContainerStyle">
                <el-aside :width="transPxStr(windowView.width*0.1)">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :unique-opened="true">
                        <el-menu-item index="1" @click="goToIndexPage" >
                                <i class="el-icon-house"></i>
                                <span slot="title">首页中心</span>
                            </el-menu-item>
 

                        <el-submenu index="2">
                            <template slot="title">
                            <i class="el-icon-office-building"></i>
                            <span>资源中心</span>
                            </template>
                            <el-menu-item index="2-1" @click="goToResource">资源预约</el-menu-item>
                            <el-menu-item index="2-2" @click="goToRevert">
                                <span v-if="notReturnResource == 0">资源归还</span>
                                <el-badge v-if="notReturnResource != 0" :value="notReturnResource" class="item"> 资源归还</el-badge>
                            </el-menu-item>
                        </el-submenu>


                       <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>个人中心</span>
                            </template>
                            <el-menu-item index="3-1" @click="goToUserInfo">个人信息</el-menu-item>
                            <el-menu-item index="3-2" @click="goToUserApply">预约信息</el-menu-item>
                             <el-menu-item index="3-2" @click="goToCredit">信用明细</el-menu-item>
                            <el-menu-item index="3-3" @click="goToChangePasswd">修改密码</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="4" @click="goToNotice">
                            <i class="el-icon-document"></i>
                            <span slot="title">公告中心</span>
                        </el-menu-item>

                        <el-menu-item index="4"  @click="goToChat">
                            <i class="el-icon-chat-dot-round"></i>
                            <span slot="title">即时聊天</span>
                        </el-menu-item>

                        <el-menu-item index="5" @click="goToFeedback">
                            <i class="el-icon-info" ></i>
                            <span slot="title">反馈中心</span>
                        </el-menu-item>

                        <el-menu-item index="6" @click="goToAudit" :disabled="isDisabled">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">审核中心</span>
                        </el-menu-item>

                        </el-menu>
                </el-aside>
                <el-main>
                    <el-dialog
                            title="主题"
                            :visible.sync="dialogVisible"
                            width="28%"
                            :modal="false"
                            class="theme">
                            <Theme @getThemeColor="getColor"></Theme>
                        </el-dialog>
                    <router-view :userName='user.username'>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>        
    </div>

</template>

<script>
import Theme from '../components/Theme.vue'
    export default {
        name:'HomePage',
        components:{Theme},
        data() {
            return {
                user:this.$store.state.userInfo,
                isDisabled:true,
                windowView:{
                    height:window.innerHeight,
                    width:window.innerWidth,
                },
                cardStyle:{
                    'margin-bottom':' 0.2rem',
                    'margin-top': '1rem',
                    'background-color': '#4774a0'
                },
                themeColor:[
                    {
                        title:'桔梗',
                        value:'#585eaa'
                    },
                    {
                        title:'若柳',
                        value:'#bed742'
                    },
                    {
                        title:'秋香',
                        value:'#d9b612'
                    },
                    {
                        title:'竹青',
                        value:'#789262'
                    },
                    {
                        title:'真赪',
                        value:'#c76968'
                    },
                    {
                        title:'褐返',
                        value:'#02435f'
                    }
                ],
                dialogVisible: false,
                viewStyle: {
                    height:'',
                    width:'',
                    'background-color': ''
                },
                avatar:'',
                // 未归还资源数
                notReturnResource:0,

            }
        },
        computed: {
            
            //  该组件的总高度和宽度
            // viewStyle() {
            //     return {
            //         height:this.transPxStr(this.windowView.height),
            //         width:this.transPxStr(this.windowView.width),
            //         'background-color': '#bed742'
            //     }
            // },
            //包裹 aside 与  main  的Container标签的高度和宽度
            innerContainerStyle() {
                return {
                    height:this.transPxStr(this.windowView.height*0.94),
                }
            }
        },
        methods:{
            goToIndexPage(){
                this.$router.push({
                    path:'/HomePage'
                })
            },
            goToUserInfo() {
                this.$router.push({
                    path:'/HomePage/User'
                })
            },
            goToChangePasswd() {
                this.$router.push({
                    path:'/HomePage/ChangePasswd'
                })
            },
            goToNotice() {
                this.$router.push({
                    path:'/HomePage/Notice'
                }) 
            },
            getColor(value){
                this.viewStyle['background-color'] = value
            },
            goToResource() {
                this.$router.push({
                    path:'/HomePage/Resource'
                })
            },
            goToFeedback() {
                this.$router.push({
                    path:'/HomePage/Feedback'
                })
            },
            goToAudit() {
                this.$router.push({
                    path:'/HomePage/Audit'
                })
            },
            leaveSystem() {
                this.$router.replace({
                    path:'/'
                })
            },
            goToChat(){
                this.$router.push({
                    path:'/HomePage/Chat'
                })
            },
            goToUserApply(){
                this.$router.push({
                    path:'/HomePage/UserApply'
                })
            },
            goToCredit(){
                this.$router.push({
                    path:'/HomePage/Credit'
                })
            },
            goToRevert(){
                this.$router.push({
                    path:'/HomePage/Revert'
                })
            },
            getNotReturnResourceNumber(){
                this.$axios.get('http://localhost:8087/record/getNotNumber',{
                    params:{
                        uid:this.$store.state.userInfo.uId,
                    }
                }).then(res => {
                    this.notReturnResource = res.data.data
                })
            },
        },
        mounted() {
            // 样式挂载
            if(localStorage.getItem('bgColor') != null){
                this.viewStyle['background-color'] = localStorage.getItem('bgColor')
            }else {
                this.viewStyle['background-color'] = '#02435f'
            }
            
            this.viewStyle.height = this.transPxStr(this.windowView.height)
            this.viewStyle.width= this.transPxStr(this.windowView.width)
            // 头像判断
            console.log(this.user)
            this.avatar = this.user.sex === '女' ? require("../assets/girl.png") : require("../assets/boy.png")
            // 用户权限判断
            this.isDisabled = this.user.power != '辅导员'
            this.getNotReturnResourceNumber()
        }

    }
</script>

<style scoped>
    .test{
        background-color: #02435f;
    }
    .el-header {
        /* background-color: #ca4040; */
        color: rgb(36, 35, 35);
        border-radius: 0.5rem;
        text-align: center;
        box-shadow: 0rem 1rem 1rem #cdcfcf;
        margin-bottom: 0.2rem;
        opacity: 0.84;
        /* margin-top: 1rem; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0;
    }
    
    .el-aside {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        opacity: 0.9;
    }
  
    .el-main {
        background-color: #ffffff;
        color: #333;
        text-align: center;
        opacity: 0.9;
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items: center;
    }
  
  
    .el-container .el-container{
        background-color: #ffffff;
        height: 600px;
        opacity: 0.94;
    }

    .userShow{
        display: flex;
        align-items: center;
        margin-right: 5px;
    }
    .img-style{
        margin-left: 1rem;
        margin-right: 0.5rem;
        background-color: rgb(255, 255, 255);
    }
    .title{
        margin-right: 1rem;
        font-size: x-large;
        color: #ffffff;
    }
</style>