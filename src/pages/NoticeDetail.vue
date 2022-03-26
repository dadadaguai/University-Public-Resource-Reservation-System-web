<template>
    <div class="basic">
        <el-container>
            <el-header height="1.5rem">
                <el-page-header @back="goBack" content="公告详情"></el-page-header>
            </el-header>
            <el-main>
                <span class="title">{{title}}</span>
                <span class="time">{{time}}</span>
                <span class="textStyle">
                    {{textarea}}
                </span>
            </el-main>
        </el-container>
        

    </div> 
</template>

<script>
    export default {
        name:'NoticeDetail',
        data() {
            return {
                 textarea: `那年，她十六岁，第一次喜欢上一个男生。他不算很高，斯斯文文的，但很喜欢踢足球，有着一把低沉的好嗓音，成绩很好，常是班上的第一名。虽然在当时，早恋已经不是什么大问题，女生追男生也不再是新闻，她更不是那种内向的女孩。但是她从来没有想过要向他表白，只是觉得，能一直这样远远地欣赏他，就很好了.\n那时，她常常为在路上碰到他，打声招呼高兴个半天，常常放学也不回去，而是上运动场一圈又一圈地慢跑，只为了看他踢球。她还学着叠幸运星，每天在那小纸条上写一句想对他说的话，叠成小幸运星，快乐地放在大瓶子里。她常常看着他想，象他那样的男生，应该是会喜欢那种温柔体贴的女孩吧，那种有着一把乌黑的长长直直的头发，有着一双水汪汪的大眼睛，开心的时候会抿嘴一笑的女孩。<br> 她的头发很乌黑，但只短短的到耳际边，她有一双大眼睛，但常常因为大笑而眯成一条缝。她常常照着镜子想，如果有一天她成了那种女孩，他会不会喜欢上她。`,
                 title:'不老的爱情',
                 time:'2018-09-10 12:23:21'

            }
        },
        methods:{
            goBack() {
                console.log('我回去啦！')
            }
        }
    }
</script>

<style scoped>
    .basic{
        background-color: rgb(255, 255, 255);
        width: 40%;
        /* display: flex;
        flex-direction: column; */
        /* align-items: center; */
        border-radius: 0.5rem;
        box-shadow: 1rem 1rem 1rem #cdcfcf;
    }
    .el-header{
        height: 10%;
    }
    .textStyle{
        text-align: justify; 
        text-indent: 3rem; 
        line-height: 2rem;
        font-size:1rem;
        font-family:仿宋_GB2312;
        color:#201e1e;
    }
    .el-main{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .title{
        font-size:2rem;
        color:#6e6e6e;
    }
    .time{
        font-size:0.5rem;   
        color:#8b8b8b;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>