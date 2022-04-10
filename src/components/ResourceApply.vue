<template>
    <el-form ref="form" :model="form" label-width="90px">
    <el-form-item label="资源类型：">
        <el-input v-model="form.type" :placeholder="form.type" disabled></el-input>
    </el-form-item>
    <el-form-item label="地点：">
        <el-input v-model="form.area" :placeholder="form.area" disabled></el-input>
    </el-form-item>
    <el-form-item label="申请日期：">
            <el-col :span="11">
                <el-date-picker
                    v-model="form.startDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker
                    v-model="form.endDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
    </el-form-item>
    <el-form-item label="申请时间：">
            <el-col :span="11">
                <el-time-select
                    placeholder="起始时间"
                    v-model="form.startTime"
                    :picker-options="{
                    start: '06:00',
                    step: '00:60',
                    end: '22:00'
                    }">
                </el-time-select>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-select
                    placeholder="结束时间"
                    v-model="form.endTime"
                    :picker-options="{
                    start: '06:00',
                    step: '00:60',
                    end: '22:00',
                    minTime: form.startTime
                    }">
                </el-time-select>
            </el-col>
    </el-form-item>
    <el-form-item label="申请人数：">
        <el-input v-model="form.number" placeholder="请填写阿拉伯数字" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="申请理由：">
        <el-input type="textarea" v-model="form.reason"></el-input>
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
                    type:'智慧教室-0001',
                    area:'中原校区亚太楼四楼417',
                    startDate: '',          //开始日期
                    endDate: '',          //结束日期
                    startTime:'',          //开始时间
                    endTime:'',            // 结束时间
                    reason:'',
                    number:1,
                }

            };
        }
    }
</script>

<style scoped>
</style>