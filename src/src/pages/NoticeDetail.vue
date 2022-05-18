<template>
    <div class="basic">
        <el-container>
            <el-header height="5rem">
                <span class="title">{{notice.title}}</span>
                <div>
                    <span class="time">{{notice.publisher}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="time">{{dayjs(notice.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>

            </el-header>
            <el-divider></el-divider>
            <el-main>
                <span class="textStyle">
                    {{notice.text}}
                </span>
            </el-main>
        </el-container>
    </div> 
</template>

<script>
    export default {
        name:'NoticeDetail',
        props:['notice'],
    }
</script>

<style scoped>
   .basic{
        background-color: rgb(255, 255, 255);
        width: 100%;
        /* display: flex;
        flex-direction: column; */
        /* align-items: center; */
        /* border-radius: 0.5rem;
        box-shadow: 1rem 1rem 1rem #cdcfcf; */
        height: 30rem;
    }
    .el-header{
        display: flex;
        flex-direction: column;
    }
    .textStyle{
        text-align: justify; 
        text-indent: 3rem; 
        line-height: 2rem;
        font-size:1.2rem;
        font-family:仿宋_GB2312;
        color:#201e1e;
    }
    .el-main{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 28rem;
    }
    .el-divider{
        padding: 0;
        margin-top: 0.5rem;
        margin-bottom: 0rem;
    }
    .title{
        font-size:2rem;
        color:#6e6e6e;
        font-weight: bolder;
        margin-bottom: 0.5rem;
    }
    .time{
        font-size:1rem;   
        color:#8b8b8b;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>