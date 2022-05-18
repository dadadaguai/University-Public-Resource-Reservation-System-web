<template>
    <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="类型用途：">
            <el-col :span="11">
                <el-tooltip class="item" effect="light" content="资源类型" placement="bottom">
                    <el-input v-model="resource.rType" :placeholder="form.type" disabled></el-input>
                    
                </el-tooltip>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-tooltip class="item" effect="dark" content="资源用途" placement="bottom">
                 <el-input v-model="resource.rFunctions" placeholder="用途" disabled></el-input>
                </el-tooltip>
            </el-col>
        </el-form-item>

        <el-form-item label="资源地点：">
            <el-input v-model="resource.rArea" :placeholder="form.area" disabled></el-input>
        </el-form-item>
        <el-form-item label="资源容量：">
            <el-col :span="7">
                <el-tooltip class="item" effect="light" content="资源容量" placement="bottom">
                    <el-input v-model="resource.rCapacities" placeholder="容量" disabled></el-input>
                </el-tooltip>
            </el-col>
            <!-- <el-col class="line" :span="1"> &nbsp;</el-col> -->
            <el-col class="line" :span="6">&nbsp;&nbsp;&nbsp;指定审核人*：</el-col>
            <el-col :span="11">
                <el-tooltip class="item" effect="dark" content="辅导员" placement="bottom">
                      <el-select v-model="counselorValue" placeholder="辅导员选择" clearable :disabled="!isStudent">
                        <el-option
                            v-for="item in counselorOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                </el-tooltip>
            </el-col>
        </el-form-item>

        <el-form-item label="申请时间*：">
                <el-col :span="11">
                    <el-date-picker
                        v-model="form.startDate"
                        type="date"
                        :picker-options="pickerOptions"
                        @change="selectDate"
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
                    options: JSON.parse(JSON.stringify(this.sectionTime)),
                    timeValue: '',
                    receiveResource:null,
                    
                },

                counselorValue:'',
                counselorOptions:[],
                isStudent:this.$store.state.userInfo.power == "学生" ? true : false,
                pickerOptions:{
                    disabledDate: (v) => {
                        let end = new Date(this.$store.state.term.endTime).getTime()
                        let start = new Date(this.$store.state.term.startTime).getTime()
                        // console.log(object);
                        let value = v.getTime()
                        return value < new Date().getTime() - 86400000 || value < start || value > end
                    },
                }

            }
        },
        props:['resource'],
        methods:{
            // 发送数据给父组件，进行点击确认时间的数据获取
            sendMessage(){
                if( this.form.startDate === '' || 
                    this.form.reason === '' || 
                    this.form.number === '' || 
                    this.form.timeValue === '' || 
                    (this.counselorValue == '' && this.isStudent)){
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
                }else if(this.form.number > this.form.receiveResource.rCapacities){
                    this.$message({
                        showClose: true,
                        message: '申请人数不能超过资源容量',
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
                        resourceId : this.form.receiveResource.rId,
                        userId : this.$store.state.userInfo.uId,
                        appointmentStartTime : appointmentStartTime,
                        appointmentEndTime : appointmentEndTime,
                        applyReason : this.form.reason,
                        applyNumbers : this.form.number,
                        isAgree: 1,
                        // 新添加两个字段
                        reviewer: this.isStudent ? this.counselorOptions[this.counselorValue - 1].username : this.$store.state.userInfo.username,
                        reviewerId: this.isStudent ? this.counselorOptions[this.counselorValue - 1].uId : this.$store.state.userInfo.uId,
                        isReview: this.isStudent ? 0 : 1
                    }
                    return applyMessage
                }
            },
            getCounselors(){
                this.$axios.get('http://localhost:8087/apply/getCounselorsByFaculty',{
                    params:{
                        faculty:this.$store.state.userInfo.faculty
                    }
                }).then(
                    res => {
                        var index = 1
                        res.data.data.map(
                            counselor => {
                                var option =  Object.keys(counselor)
                                option.forEach(
                                    key => {
                                        if(counselor[key] == null){
                                            delete counselor[key]
                                        }
                                    }
                                )
                                counselor.label = counselor.faculty + " - "+counselor.username
                                counselor.value = index++
                            }
                        )
                        this.counselorOptions = res.data.data
                    }
                )
                
            },
            selectDate(e){
                let day = new Date(e).getTime()
                let nextDay = this.dayjs(e).add(1,'day').toDate().getTime()
                if( day > this.dayjs().toDate().getTime()){
                    this.form.options = JSON.parse(JSON.stringify(this.sectionTime))
                }else {
                    this.form.options.map(
                        item => {
                            var tempTime = this.dayjs().format("YYYY-MM-DD ") + item.startTime;
                            if(this.dayjs().isAfter(this.dayjs(tempTime))){
                                item.disabled = true
                            }
                            return item
                        }
                    )
                }
                this.$axios.get('http://localhost:8087/record/getRecordByDay',{
                    params: {
                        resourceId:this.form.receiveResource.resource.rId,
                        today:day,
                        nextDay:nextDay
                    }
                }).then(
                    res => {
                        console.log(res);
                        let records = res.data.data
                        if(records.length > 0){
                            this.form.options.map(
                                timeOption => {
                                    records.forEach(
                                        record => {
                                            let startTime = this.dayjs(record.appointmentStartTime).format('HH:mm:ss')
                                            if(startTime == timeOption.startTime){
                                                
                                                timeOption.disabled = true
                                            }
                                        }
                                    )
                                    return timeOption
                                }
                            )
                        }
                    }
                )
            }
        },
        mounted(){
            this.form.receiveResource = this.resource
            if(this.form.receiveResource != null){
                if(this.isStudent){
                    this.getCounselors()
                }
            }
        }
    }
</script>

<style scoped>
</style>