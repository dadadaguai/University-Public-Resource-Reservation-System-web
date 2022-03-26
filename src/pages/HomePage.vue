<template>
    <div :style="viewStyle">
        <el-container :height="transPxStr(windowView.height)">
            <el-header :height="transPxStr(windowView.height*0.06)">
                <span>高校公共资源预约系统</span>
                <div class="userShow">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span>
                          &nbsp;&nbsp;张豫洁
                    </span>
                </div>
                
            </el-header>
            <el-container :style="innerContainerStyle">
                <el-aside :width="transPxStr(windowView.width*0.1)">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo">
                        <el-menu-item index="1">
                                <i class="el-icon-house"></i>
                                <span slot="title">首页中心</span>
                            </el-menu-item>

                        <el-submenu index="2">
                            <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>个人中心</span>
                            </template>
                            <el-menu-item index="2-1" @click="goToUserInfo">个人信息</el-menu-item>
                            <el-menu-item index="2-2">预约信息</el-menu-item>
                            <el-menu-item index="2-3" @click="goToChangePasswd">修改密码</el-menu-item>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                            <i class="el-icon-office-building"></i>
                            <span>资源中心</span>
                            </template>
                            <el-menu-item index="3-1">资源预约</el-menu-item>
                            <el-menu-item index="3-2">资源归还</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="4" @click="goToNotice">
                            <i class="el-icon-document"></i>
                            <span slot="title">公告中心</span>
                        </el-menu-item>

                        <el-menu-item index="5">
                            <i class="el-icon-chat-dot-square"></i>
                            <span slot="title">反馈中心</span>
                        </el-menu-item>

                        <el-menu-item index="6" disabled>
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">审核中心</span>
                        </el-menu-item>

                        </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>        
    </div>

</template>

<script>
    export default {
        name:'HomePage',
        data() {
            return {
                windowView:{
                    height:window.innerHeight,
                    width:window.innerWidth,
                },
                cardStyle:{
                    'margin-bottom':' 0.2rem',
                    'margin-top': '1rem',
                    'background-color': '#4774a0'
                }
            }
        },
        computed: {
            //  该组件的总高度和宽度
            viewStyle() {
                return {
                    height:this.transPxStr(this.windowView.height),
                    width:this.transPxStr(this.windowView.width),
                    'background-color': '#ffffff'
                }
            },
            //包裹 aside 与  main  的Container标签的高度和宽度
            innerContainerStyle() {
                return {
                    height:this.transPxStr(this.windowView.height*0.94),
                }
            }
        },
        methods:{
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
            goToNotice( ) {
                this.$router.push({
                    path:'/HomePage/Notice'
                }) 
            },
        }
    }
</script>

<style scoped>
  .el-header {
    background-color: #98c8e7;
    color: #333;
    border-radius: 0.5rem;
    text-align: center;
    box-shadow: 0rem 1rem 1rem #cdcfcf;
    margin-bottom: 0.2rem;
    /* margin-top: 1rem; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    opacity: 0.7;
  }
  
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    opacity: 0.7;
  }
  
  
  .el-container .el-container{
    background-color: rgb(197, 215, 236);
    height: 600px;
  }

  .userShow{
      display: flex;
      align-items: center;
  }
</style>