<template>
    <div class="basic">
        <div class="title">修改密码</div>
        <el-form  :model="passwd" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" inline>
            <el-form-item label="原密码" prop="oldPwd">
                <el-input type="password" v-model="passwd.oldPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input type="password" v-model="passwd.newPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="ConfirmPwd">
                <el-input type="password" v-model="passwd.ConfirmPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script >
    export default {
        name:'ChangePasswd',

        data() {
            var checkOldPwd = (rule, value, callback ) => {
                if(value === '') {
                    return callback(new Error('原密码不能为空'))
                }else {
                    callback();
                }

            }

            var validateNewPwd = (rule, value, callback) => {
                if(value === '') {
                    return callback(new Error('请输入新密码'))
                } else {
                    if(this.ConfirmPwd !== '') {
                        this.$refs.ruleForm.validateField('ConfirmPwd');
                    }
                                    callback();
                }

            }

            var validateConfirmPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwd.newPwd) {
                    console.log(value +this.passwd.newPwd)
                    console.log(value  === this.passwd.newPwd)
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                passwd:{
                    oldPwd:'',
                    newPwd:'',
                    ConfirmPwd:'',
                },

                rules: {
                    oldPwd: [
                        { validator: checkOldPwd, trigger: 'blur' }
                    ],
                    newPwd: [
                        { validator: validateNewPwd, trigger: 'blur' }
                    ],
                    ConfirmPwd: [
                        { validator: validateConfirmPwd, trigger: 'blur' }
                    ],
                }
            }

        },

        methods: {
            submitForm(formName) {
                // 验证 ＋ 发送数据
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
        }
    }
</script>

<style scoped>
    .basic{
        background-color:rgb(255, 255, 255);
        border-style:solid;
        border-color:rgb(204, 203, 203);  
        border-width:0.1rem;
        width: 80rem;
    }
    .el-form-item{
        display: flex; 
        /* justify-content: flex-end; */
        align-items: center;
    }
    .title{
        font-size: 16px;
        font-weight: 700;
        margin-left: 1rem;
        padding-right: 72rem;
        height: 10%;
        color: rgb(43, 42, 42);
    }
</style>