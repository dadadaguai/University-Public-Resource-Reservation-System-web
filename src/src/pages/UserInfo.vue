<template>
    <div class="basic">
        <el-descriptions class="margin-top"  title="个人信息" :column="2"  border >
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                </template>
                {{info.username}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-male"></i>
                    性别
                </template>
                {{info.sex}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-phone-outline"></i>
                    联系电话
                </template>
                {{info.phone}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    学号
                </template>
            {{info.uId}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-platform"></i>
                    专业
                </template>
                {{info.major}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-school"></i>
                    年级
                </template>
                {{info.grade}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    学院
                </template>
                {{info.faculty}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-medal-1"></i>
                    信用度
                </template>
                {{info.credit}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-notebook-1"></i>
                    资源预约次数
                </template>
                {{info.count}}
            </el-descriptions-item>
        </el-descriptions>  
    </div>

</template>

<script>
    export default {
        name:'UserInfo',
        data() {
            return {
                info:Object
            }
        },
        methods:{
            updateUserInfo(){
                this.$axios.get('http://localhost:8087/user/getUser',{
                    params:{
                        Uid:this.$store.state.userInfo.uId
                    }
                }).then(
                    res => {
                        this.$store.commit('setUserInfo',res.data.data)
                        this.info = res.data.data
                    }
                )
            }
        },
        mounted() {
            this.updateUserInfo()
            // this.info = this.$store.state.userInfo
            // this.$axios.get('/api/userInfo').then(res => {
            //     console.log(res.data.data)
            //     this.info = res.data.data
            // })
            
        }
    }
</script>

<style scoped>
    .basic{
        background-color: rgb(255, 255, 255);
        width: 100%;
        /* display: flex;
        flex-direction: column; */
        /* align-items: center; */
        /* border-style:solid;
        border-width:0.1rem;
        border-color: #cdcfcf;
        border-radius: 0.5rem;
        box-shadow: 1rem 1rem 1rem #cdcfcf; */
    }
</style>