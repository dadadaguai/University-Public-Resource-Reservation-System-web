<template>
    <div class="basic">
        <div class="title">公告中心</div>
        <el-dialog
            title="公告详情"
            :visible.sync="centerDialogVisible"
            width="50%"
            center
            :modal="false">
            <notice-detail :notice="clickNotice"></notice-detail>
            </el-dialog>
        <div class="notice-body">
            <el-card shadow="hover"  v-for="notice in notices"  :key="notice.id">
                <div class="notice-header">
                    <span class="notice-title" >{{notice.title}}</span>
                    <span class="notice-time">{{notice.publisher}}&nbsp;&nbsp;&nbsp;{{dayjs(notice.gmtCreate).format('YYYY-MM-DD')}}</span>
                </div>
                <div class="notice-footer">
                    <div class="notice-content" >{{notice.text}}</div>
                    <el-link class="notice-link" @click="showDetail(notice,$event)">查看详情<i class="el-icon-view el-icon--right"></i> </el-link>
                </div>
            </el-card>
        </div>
        <div class="menu">
            <span>总记录数:{{totalNotices}}</span>
            <el-button-group >
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="frontPage">上一页</el-button>
                <el-button type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
            </el-button-group>
            <span>总共{{totalPages}}页，当前第{{currentPage}}页</span>
        </div>
    </div>
</template>

<script>
import NoticeDetail from './NoticeDetail.vue'
    export default {
  components: { NoticeDetail },
        name:'Notice',
        data(){
            return {
                totalNotices:0,
                totalPages:0,
                currentPage:1,
                notices:[],
                centerDialogVisible: false,
                clickNotice:Object
            }
        },
        methods:{
            noticeRequest(value){
                this.$axios.get('http://localhost:8087/notice/findAllNotice',{
                    params:{
                        currentPage:value,
                        limit:5
                    }
                }).then(
                    res =>{
                        this.totalNotices = res.data.data.totalNotices
                        this.totalPages = res.data.data.totalPages
                        this.notices = res.data.data.notices
                    // this.notices = res.data.data.notices.map( notice =>{
                    //     notice.gmtCreate = this.dayjs(notice.gmtCreate).format('YYYY-MM-DD')
                    //     return notice
                    // })
                })
            },
            nextPage(){
                if(this.currentPage != this.totalPages) {
                    this.noticeRequest(this.currentPage+1)
                    this.currentPage += 1
                }
            },
            frontPage(){
                if(this.currentPage > 1){
                    this.noticeRequest(this.currentPage-1)
                    this.currentPage -= 1
                }
            },
            showDetail(item,$event){
                this.clickNotice = item
                console.log(this.clickNotice)
                this.centerDialogVisible = true
            },
        },
        mounted() {
            this.noticeRequest(this.currentPage)
        }
    }
</script>

<style scoped>
    .basic{
        /* background-color: rgb(224, 191, 191); */
        width: 100%;
        height: 100%;
        /* display: flex;
        flex-direction: column;
        align-items: center; */
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
    .notice-body{
        height: 87.5%;
    }
    .el-card{
        margin: 1rem 2rem 1.5rem 2rem;
        /* margin-left: 3rem;
        margin-right: 3rem; */
        /* background-color: rgb(125, 56, 56); */
    }
    .el-card:hover{
        background-color: rgb(236, 236, 236);
    }
    .menu{
        position: relative;
        /* background-color: rgb(138, 138, 154); */
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .el-input{
        width:10%;
        height: 1%;
    }
    .notice-title{
        font-size: 1.5rem;
        font-weight: 700;
        /* background-color: rgb(162, 63, 63); */
        width: 60%;
        text-align:left;

        /* display: inline-block; */
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .notice-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .notice-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .notice-content{
        width: 85%;
        margin-top: 1rem;
        /* background-color: aquamarine; */
        text-align:left;
        /* display: inline-block; */
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .notice-time{
        color: rgb(143, 143, 143);
    }
    .notice-link{
         color: rgb(143, 143, 143);
         font-size: 1rem;
    }
    /* .el-card{
        width: 50%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    } */
    /* .omit{
        width: 100%;
        行内块标签
        display: inline-block;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
         文字靠左
        text-align: left;
    } */
</style>