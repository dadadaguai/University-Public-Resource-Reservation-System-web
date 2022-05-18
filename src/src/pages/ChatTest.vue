聊天界面
<template>
  <div class="app-container">
   <div id="chat">      
			<div class="chatBox">
				<div class="chatBox-top">
					<div class="chatBox-top-imgBox">
						<van-image round width="2.5rem" height="2.5rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
					</div>
					<div class="chatBox-top-text"><span>{{UserName}}</span></div>
				</div>
				<div class="chat-Left"  >
                   <el-input v-model="userQuery.userName" size="mini" style="width:80px"  placeholder="用户名"/>
                    <el-button type="primary" size=“mini” icon="el-icon-search" style="width:70px;height: 35px;text-align: center" @click="getList()">查询</el-button>
					<el-table
                     v-loading="listLoading"
                     :data="list"
                     border
                     fit
					 :cell-style="{'text-align':'center'}"
                     highlight-current-row>
                     <!-- <el-table-column  prop="username" label="消息列表" @click="gotochatInfo(scope.row.id)" /> -->
					  <el-table-column label="消息列表" prop="username" align="center">
                          <template slot-scope="scope">
                              <a class="self_peoNum" @click="gotochatInfo(scope.row.id)">{{scope.row.username}}</a>
                          </template>
                      </el-table-column>

                    </el-table>
			   </div>
				<div class="chatBox-middle">
					<div class="chatInfo" id="chatInfo">
             <!-- 具体聊天信息 -->
						<div class="chatUser-box" v-for="(item,index) in infoList"  :key="index" :class="[''==item.id?'chatUser-box1':'chatUser-box']">
							<div class="chatUser-box-img">
								<van-image round width="2.5rem" height="2.5rem"
									:src="item.images" />
							</div>
							<div class="chatUser-info">
								<div class="chatUser-info-name" :class="[''==item.id?'chatUser-info-name1':'chatUser-info-name']"><span>{{item.spokesman}}</span><span class="nowDate">{{item.gmtCreate}}</span>
								</div>
								<div class="chatUser-info-text" :class="[''==item.id?'chatUser-info-text1':'chatUser-info-text']">
									<span>{{item.text}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="chat-down">
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入内容"  v-model="chat.text"></el-input>
					<el-button style="float:right ;margin: 1.5rem" type="info"  @click="addChat">发送</el-button>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
import user from '@/api/manager-user'
import Chat from '@/api/manager-chat'
export default {
    data(){
        return{
			UserName:'聊天室',
			userId:'1509511633062277122',
            userQuery:{},
			list:null,
			managerId:'',
			chat:{},
			//  infoList:null
            infoList:[
				{
					id:'',
					spokesman:'商客',
					gmtCreate:'2021-4-23 18:00:24 星期五',
					images:'https://img01.yzcdn.cn/vant/cat.jpeg',
					text:'请问又是什么需要帮助的吗？'
				},
				{
					id:2,
					spokesman:'发哥',
					gmtCreate:'2021-4-23 18:00:05 星期五',
					images:'https://img01.yzcdn.cn/vant/leaf.jpg',
					text:'咨询信息'
				},
			 ]
      }
    },
    created(){//页面渲染之前执行，一般调用methods定义的方法
       //调用
       this.getList()
    },
    methods:{//创建具体方法，调用manager-user.js定义方法
         //用户列表方法
         getList(){
           user.getUserList(this.userQuery)
             .then(response =>{//请求成功
                 //response接口返回的数据
                this.list=response.data.list
             })
             .catch(error =>{console.log(error)})//请求失败
         },
		 getChatInfo(){
			 this.managerId=document.cookie
			 var arr=this.managerId.split(';');
             for(var i = 0 ; i < arr.length; i ++){
              var arr2=arr[i].split('=');
              if(arr2[0]=='managerId'){
                this.managerId= arr2[1]
			  }
			}
           Chat.getChatList(this.userId,this.managerId)
             .then(response =>{//请求成功
                 //response接口返回的数据
				 this.UserName='聊天室'
                 this.infoList=response.data.rows
				  for(var i = 0 ; i < this.infoList.length; i ++){
					  var arr3=this.infoList[i];
                   if(arr3.id==''){
			        }else{
						this.UserName=arr3.spokesman
					}
			}
             })
             .catch(error =>{console.log(error)})//请求失败
		 },
		 gotochatInfo(id){
			 this.userId=id
			let that=this;
          window.setInterval(() => {
            setTimeout(()=>{
            that.getChatInfo();//我们的获取接口数据函数
            },0)
          }, 1000)
		 },
		 addChat(){
          this.chat.userId=this.userId
		  this.chat.managerId=this.managerId
		  Chat.addChatInfo(this.chat)
		  .then(response=>{
			  this.chat.text=''
           this.getChatInfo(this.userId)        
       })
		 }

     }
}
</script>
<style>
   body {
    	background-color: #E8E8E8;
    }
	  #chat.chatBox {
			width: 60rem;
			height: auto;
			margin: 2.5rem auto 0;
			background-color: #fff;
			overflow: hidden;
			border-radius: 0.625rem;
		}
 
		#chat .chatBox-top {
			width: 100%;
			height: 3.75rem;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			background-color: #2B3D63;
		}
 
		#chat .chatBox-top-imgBox {
			margin-left: 1.25rem;
		}
 
		#chat .chatBox-top-text {
			width: 100%;
			font-size: 1.5rem;
			flex-wrap: nowrap;
			color: #fff;
			text-align: center;
			background-color: #2B3D63;
		}
        #chat .chat-Left {
			width: 10rem;
			height: 30rem;
			float: left;
			
		}
		#chat .chatBox-middle {
			width: 65rem;
			height: 21.25rem;
			background-color: #fff;
			border-bottom: 0.0625rem solid #2B3D63;
			float: right;
		}
		#chat .chat-down {
			width: 62rem;
			height: 10rem;
			background-color: #fff;
			margin-left: 1.25rem;
			float: left;
		}
		#chat .chatInfo {
			width: 94%;
			height: 94%;
			margin: 1.25rem auto;
			overflow: auto;
		}
 
		#chat .chatUser-box {
			width: 100%;
			margin-bottom: 6px;
			display: flex;
			flex-direction: row;
		}
		
		
		#chat .chatUser-box-img {
			display: flex;
		}
 
		#chat .chatUser-info {
			margin: 0 1.25rem;
		}
 
		#chat .chatUser-info-name {
			font-size: 0.875rem;
			color: #888;
			display: flex;
			flex-direction: row;
		}
 
		#chat .nowDate {
			margin: 0 0.625rem;
		}
 
		#chat .chatUser-info-text {
			margin-top: 0.3125rem;
			max-width: 20rem;
			padding: 0.5rem;
			background-color: #E8E8E8;
			border-radius: 0.5rem;
			float: left;
			table-layout:fixed;
			word-break: break-all;
			overflow:hidden;
		}
 
		#chat .chatUser-info-text span{
			font-size: 0.9375rem;
			line-height: 1.5625rem;
		}
		#chat .chatUser-box1 {
			flex-direction: row-reverse;
		}
		#chat .chatUser-info-name1 {
			flex-direction: row-reverse;
		}
		#chat .chatUser-info-text1 {
			float: right;
		}
</style>
