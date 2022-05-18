<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="打扫卫生*：">
            <el-radio-group el-radio-group v-model="form.isClean" >
                <el-radio label="2" border>未打扫</el-radio>
                <el-radio label="1" border>已打扫</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="关闭电源*：">
            <el-radio-group el-radio-group v-model="form.isOffPower" >
                <el-radio label="2" border>未关闭</el-radio>
                <el-radio label="1" border>已关闭</el-radio>

            </el-radio-group>
        </el-form-item>

        <el-form-item label="归还钥匙*：">
            <el-radio-group el-radio-group v-model="form.isReturnKey" >
                <el-radio label="2" border>未归还</el-radio>
                <el-radio label="1" border>已归还</el-radio>

            </el-radio-group>
        </el-form-item>

        <el-form-item label="申请人数*：">
            <el-upload
                ref="upload"
                action="http://localhost:8087/recordpicture/upload"
                list-type="picture-card"
                :limit="3"
                multiple
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :auto-upload="false"
                :data="uploadData">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name:'RevertDetail',
        data() {
            return {
                fileList:[],
                dialogImageUrl: '',
                dialogVisible: false,
                uploadData:{
                    recordId:'',
                    uid:'',
                },
                form:{
                    isClean: '2',
                    isOffPower: '2',
                    isReturnKey: '2'
                },
                receiveRecord:null,
                loading:null
            }
        },
        props:['record'],
        methods:{
            handleChange(file, fileList){
                this.fileList = fileList
            },
            handleRemove(file, fileList){
                
            },
            // 上传成功后的操作,1、先传送该状态给父组件，2、父组件关闭模态框，且刷新重新获取数据。
            handleSuccess(response, file, fileList){
                console.log(response);
                setTimeout(() => {
                    this.loading.close();
                },1000);
                this.$emit("isUploadSuccess",response.data)
            },
            // 发送数据给父组件，进行点击确认时间的数据获取
            sendMessage(){
                if(this.form.isClean != '1'){
                    this.$message({
                        message: '请确定使用完资源后是否进行了打扫卫生',
                        type: 'warning'
                    });
                }else if(this.form.isOffPower != '1'){
                    this.$message({
                        message: '请确定使用完资源后是否关闭了相关电源',
                        type: 'warning'
                    });
                }else if(this.form.isReturnKey != '1'){
                    this.$message({
                        message: '请确定使用完资源后是否归还了钥匙、多媒体遥控器等物品',
                        type: 'warning'
                    });
                }else if(this.fileList.length == 0){
                    this.$message({
                        message: '请上传能证明上述操作已完成的照片',
                        type: 'warning'
                    });
                }else if(this.form.isClean == '1' && this.form.isOffPower == '1' && this.form.isReturnKey == '1' && this.fileList.length > 0){
                    this.uploadData.recordId = this.receiveRecord.id
                    this.uploadData.uid = this.$store.state.userInfo.uId
                    this.$refs.upload.submit();
                    this.loading = this.$loading({
                        lock: true,
                        text: '资源归还中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                }
            },
        },
        mounted(){
            this.receiveRecord = this.record
        }
    }
</script>

<style scoped>
</style>