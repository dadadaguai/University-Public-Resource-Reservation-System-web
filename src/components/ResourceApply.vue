<template>
    <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="资源类型：">
            <el-input v-model="resource.rType" :placeholder="form.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="用途容量：">
            <el-col :span="11">
                <el-tooltip class="item" effect="light" content="资源用途" placement="bottom">
                    <el-input v-model="resource.rFunctions" placeholder="用途" disabled></el-input>
                </el-tooltip>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-tooltip class="item" effect="dark" content="资源容量" placement="bottom">
                    <el-input v-model="resource.rCapacities" placeholder="容量" disabled></el-input>
                </el-tooltip>
            </el-col>
        </el-form-item>
        <el-form-item label="资源地点：">
            <el-input v-model="resource.rArea" :placeholder="form.area" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请时间*：">
                <el-col :span="11">
                    <el-date-picker
                        v-model="form.startDate"
                        type="date"
                        placeholder="选择日期*">
                    </el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-select v-model="form.timeValue" placeholder="选择节次*">
                        <el-option
                            v-for="item in form.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-col>
        </el-form-item>
        <el-form-item label="申请人数*：">
            <el-input v-model="form.number" placeholder="请按照实际人数填写申请人数" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="申请理由*：">
            <el-input 
                type="textarea" 
                v-model="form.reason" 
                show-word-limit
                resize="none" 
                :rows="3" 
                :maxlength="45">
            </el-input>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        name:'ResourceApply',
        data() {
            return {
                form:{
                    r_id:'',
                    u_id:'',
                    startDate: '',          //开始日期
                    reason:'',
                    number:'',
                    options: this.sectionTime,
                    timeValue: '',
                    receiveResource:''
                }
            }
        },
        props:['resource'],
        methods:{
            // 发送数据给父组件，进行点击确认时间的数据获取
            sendMessage(){
                if(this.form.startDate === '' || this.form.reason === '' || this.form.number === '' || this.form.timeValue === ''){
                    this.$message({
                        showClose: true,
                        message: '请完整的填写申请信息。',
                        type: 'warning'
                    });
                    return null
                }else if(this.form.number == 0){
                    this.$message({
                        showClose: true,
                        message: '申请人数不可为0',
                        type: 'warning'
                    });
                    return null
                }else {
                    // 需要的信息，id、uId、rId,预约时间（开始、结束）申请人数
                    let date = this.dayjs(this.form.startDate).format("YYYY-MM-DD ")
                    let optionTime =  this.form.options[parseInt(this.form.timeValue)-1]
                    let appointmentStartTime = date + optionTime.startTime
                    let appointmentEndTime = date + optionTime.endTime

                    let applyMessage = {
                        id : new Date().getTime().toString().concat(this.$store.state.userInfo.uId.toString().substring(4,8)),
                        resourceId : this.receiveResource.rId,
                        userId : this.$store.state.userInfo.uId,
                        appointmentStartTime : appointmentStartTime,
                        appointmentEndTime : appointmentEndTime,
                        applyReason : this.form.reason,
                        applyNumbers : this.form.number,
                        isAgree: 1
                    }

                    return applyMessage
                }
            }
        },
        mounted(){
            this.receiveResource = this.resource
        }
    }
</script>

<style scoped>

</style>