<template>
<div class="basic">
    <div class="title-position">
        <span class="title">审核中心</span>
    </div>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column
                label="资源类型"
                prop="applyTuple.resource.rType">
            </el-table-column>

            <el-table-column
                label="资源地点"
                prop="applyTuple.resource.rArea">
            </el-table-column>

            <el-table-column
                label="申请人"
                prop="user.username">
            </el-table-column>

            <el-table-column
                label="申请人数"
                prop="applyTuple.apply.applyNumbers">
            </el-table-column>
            <el-table-column
                label="预约时间"
                prop="applyTuple.apply.appointmentEndTime">
                    <template slot-scope="scope">
                        <el-tag
                        type="primary"
                        effect="light"
                        disable-transitions>{{scope.row.applyTuple.apply.appointmentStartTime}}</el-tag>
                    </template>
            </el-table-column>

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">

                        <el-form-item label="院系:">
                            <span>{{ props.row.user.faculty }}</span>
                        </el-form-item>
                        <el-form-item label="专业:">
                            <span>{{ props.row.user.major }}</span>
                        </el-form-item>
                        <el-form-item label="年级:">
                            <span>{{ props.row.user.grade }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <span>{{ props.row.user.phone }}</span>
                        </el-form-item>
                        <el-form-item label="申请理由:">
                            <span>{{ props.row.applyTuple.apply.applyReason}}</span>
                        </el-form-item>

                        <el-form-item>
                            <!-- <div class="submit">
                                <el-button  
                                    :disabled="props.row.apply.isAgree === 0 ||  props.row.apply.isAgree  === 3? true : false" 
                                    type="primary"  
                                    size="mini" 
                                    @click="cancelApply(props.row.apply)" 
                                    plain >取消预约
                                </el-button>
                                <el-button  
                                    :disabled="props.row.apply.isAgree === 2 ||  props.row.apply.isAgree  === 3? true : false" 
                                    type="primary"  
                                    size="mini" 
                                    @click="applyChange(props.row,$event)" 
                                    plain>修改申请
                                </el-button>
                            </div> -->
                            <div class="submit">
                                <el-button  type="danger" size="small" @click="refuse(props.row.applyTuple.apply)" plain>拒绝预约</el-button>
                                <el-button  :disabled="props.row.status" type="success" size="small" @click="accept(props.row.applyTuple.apply)" plain>同意预约</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>

            </el-table-column>
        </el-table>
    </div>
</div>
  
</template>

<script>
    export default {
        name:'Audit',
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            refuse(apply){
                this.$confirm('此操作将拒绝该申请人的预约请求, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let updateApply = {
                        id:apply.id,
                        isAgree:0
                    }
                    this.auditUpdate(updateApply)
                    this.$message({
                        type: 'success',
                        message: '拒绝成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消拒绝'
                    });          
                });
            },
            accept(apply){
                let updateApply = {
                    id:apply.id,
                }
                this.auditUpdate(updateApply)
                this.$message({
                        message: '已同意该学生的申请。',
                        type: 'success'
                });
            },
            auditRequest(){
                this.$axios.get('http://localhost:8087/apply/audit',{
                    params:{
                       uid:this.$store.state.userInfo.uId
                    }
                }).then(
                    res => {
                        this.tableData = res.data.data.map(
                            (data) => {
                                let resource = data.applyTuple.resource
                                let apply = data.applyTuple.apply
                                data.applyTuple.resource.rType = this.rType[parseInt(resource.rType)-1].label

                                let dateTime = this.dayjs(apply.appointmentStartTime).format('YYYY-MM-DD HH:mm:ss').split(' ')
                                let realTime = this.sectionTime.filter(res =>{
                                    return res.startTime === dateTime[1]
                                })
                                data.applyTuple.apply.appointmentStartTime = dateTime[0]+" "+realTime[0].label


                                return data
                            }
                        )
                        console.log(res.data.data);
                        console.log(this.tableData);
                })
            },
            auditUpdate(apply){
                this.$axios.post('http://localhost:8087/apply/auditUpdateStatus',apply).then(
                    res => {
                        this.auditRequest()
                })
            }
        },
        mounted(){
            this.auditRequest()

        }
    }
</script>

<style scoped>
    .basic{
        width: 100%;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
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
        margin-bottom: 2rem;
    }
    .submit{
        /* background-color: aquamarine; */
        margin-left: 20rem;
    }
    .submit .el-button{
        width: 8rem;
        margin-right: 1rem;
    }
</style>