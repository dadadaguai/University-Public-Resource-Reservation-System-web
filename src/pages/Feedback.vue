<template>
    <div class="basic">
        <div class="title-position">
            <span class="title">反馈中心</span>
        </div>
        <div style="margin-left: 1rem;">
            <el-card class="box-card ">
                <span class="subtitle">反馈类型</span>
                <el-divider></el-divider>
                <div >
                    <el-radio v-model="radio" label="1" border>功能故障</el-radio>
                    <el-radio v-model="radio" label="2" border>使用建议</el-radio>
                    <el-radio v-model="radio" label="3" border>其它问题</el-radio>
                </div> 
            </el-card>
            <!-- <div style="margin: 5px 0;"></div> -->
            <el-card class="box-card ">
                <span class="subtitle">问题描述</span>
                <el-divider></el-divider>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 12}"
                    placeholder="请输入问题内容"
                    v-model="textarea"
                    maxlength="300"
                    show-word-limit
                    clearable
                    >
                </el-input>
            </el-card >
            <!-- <div style="margin: 10px 0;"></div> -->
            <el-card class="box-card ">
                <span class="subtitle">联系方式</span>
                <el-divider></el-divider>
                <el-input
                    clearable
                    placeholder="请输入手机号"
                    v-model="tel"
                    maxlength="11"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    >
                </el-input>
                <el-button class="submit" :plain="true" @click="submit">提交</el-button>
            </el-card>

        </div>

    </div>
</template>

<script>
    export default {
        name:'Feedback',
        data() {
            return{
                radio: '1',
                textarea: '',
                tel: '',
                type:['功能故障','使用建议','其它问题']
            }
        },
        methods:{
            submit() {
                if(this.textarea === '' || this.tel.length < 11){
                    this.$message({
                        message:'提交失败，联系方式不符合规范，或反馈内容不能为空',
                        type: 'warning'
                    });
                }else {
                    this.$axios.post("http://localhost:8087/feedback/addFeedback",{
                        id:new Date().getTime().toString().concat(this.$store.state.userInfo.uId.toString().substring(4,9)),
                        type:this.type[parseInt(this.radio)-1],
                        problem:this.textarea,
                        phone:this.tel === '' ? this.$store.state.userInfo.phone : this.tel,
                        uId:this.$store.state.userInfo.uId

                    }).then(res =>{        
                        if(res.data.code === -1 ){
                            this.$message({
                                message:'提交失败。',
                                type: 'warning'
                            });
                        }else {
                            console.log(res.data.data);
                            this.$message({
                                message:'提交成功，感谢您的反馈',
                                type: 'success'
                            });
                            this.radio = '1'
                            this.textarea = '',
                            this.tel = ''
                        }
                    })
                }
                
            }
        }
    }
</script>

<style scoped>
    .basic{
        /* background-color:aquamarine; */
        width: 100%;
    }
    .title{
        
        /* background-color:aquamarine; */
        font-size: 16px;
        font-weight: 700;
        align-items:inherit;
        color: rgb(43, 42, 42);
        /* float: left; */
    }
    .title-position{
        display: flex;
        justify-content: flex-start;
    }
    .subtitle{
        font-size: 14px;
        font-weight: 700;
        /* margin-left: 1rem; */
        /* padding-right: 106rem;
        height: 10%; */
        color: rgb(43, 42, 42);
    }
    .el-card span{
        float: left;
    }
    .box-card {
        width: 500px;
        border:0.1px solid rgb(255, 255, 255);
        border-radius: 0;
        box-shadow:0 0 0 rgb(255, 255, 255);
    }
    .submit{
        margin-top: 2rem;
        width: 60%;
    }
</style>