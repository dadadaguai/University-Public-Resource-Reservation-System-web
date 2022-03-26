<template>
    <div class="basic">
        <el-timeline>
            <el-timeline-item  v-for="notice in notices" key="index":timestamp="dayjs(notice.date).format('YYYY-MM-DD')" placement="top" type="primary" >
                <el-card shadow="hover" >
                    <div class="omit">{{notice.title}}</div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name:'Notice',
        data(){
            return {
                dateTime:'2018-9-13',
                title:'aaa',
                notices:[]
            }
        },
        mounted() {
            this.$axios.get('/api/notice').then(val =>{
               this.notices = val.data.notices
            })
        }
    }
</script>

<style scoped>
    .basic{
        background-color: rgb(255, 255, 255);
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0.5rem;
        box-shadow: 1rem 1rem 1rem #cdcfcf;
    }
    .el-card{
        width: 20rem;
        height: 3rem;
        display: flex;
        align-items: center;
    }
    .omit{
        width: 18rem;
        display: inline-block;
        white-space: nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
    }
</style>