<template>
    <div class="basic">
        <div class="title">信用明细</div>
        <div class="main">
            <div class="credit-header">
                <span class="create-total">当前用户信用分：{{this.$store.state.userInfo.credit}}</span>

                <span class="create-status">信用状态：{{getCreditStatus()}}</span>
            </div>
            <div class="block">
                <div class="credit-list">信用明细展示</div>
                <empty  v-if="creditList.length == 0"></empty>
                <el-timeline v-if="creditList.length != 0">
                    <el-timeline-item  v-for="(item,index) in creditList" :key="index" :timestamp="item.gmtCreate" placement="top"> 
                        <el-card>
                            <span class="credit-result">结果：<el-tag :type="  item.result > 0 ? 'success' : 'danger' " effect="dark">{{ item.result > 0 ? "+"+item.result : item.result}}</el-tag></span>
                            <span class="credit-reason">原因：{{item.reason}}</span>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
import Empty from './Empty.vue'
    export default {
  components: { Empty },
        name:"Credit",
        data(){
            return {
                creditList:[],

            }
        },
        methods:{
            getCreditStatus(){
                let credit = this.$store.state.userInfo.credit
                if(credit == 10){
                    return "优秀"
                }else if(credit <10 && credit > 8){
                    return "良好"
                }else if(credit < 8 && credit > 6){
                    return "一般"
                }else if(credit < 6 && credit > 3){
                    return "低劣"
                }else{
                    return "极差"
                }
            },
            getCredit(){
                this.$axios.get('http://localhost:8087/credit/getCreditByUid',{
                    params:{
                        Uid:this.$store.state.userInfo.uId
                    }
                }).then(
                    res => {
                        this.creditList = res.data.data.map(
                            (data) => {
                                data.gmtCreate = this.dayjs(data.gmtCreate).format('YYYY-MM-DD HH:mm:ss')
                                return data
                            }
                        )
                    }
                )
            }
        },
        mounted(){
            this.getCredit()
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
    }
    .title{
        font-size: 16px;
        font-weight: 700;
        padding-right: 105rem;
        height:30px;
        color: rgb(43, 42, 42);
    }
    .main{
        /* height:90%; */
        width: 84%;
    }
    .credit-header{
        height:40px;
        /* width: 60%; */
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: large;
        font-weight: bolder;
    }
    .create-total{
        margin-right: 40px;
    }
    .el-card{
        /* width: 90%; */
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .credit-result{
        margin-right: 2rem;
    }
    .credit-list{
        font-size: x-large;
        margin-bottom: 1.5rem;
    }
</style>