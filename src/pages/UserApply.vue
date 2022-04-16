<template>
    <div class="basic">
        <div class="title-position">
            <span class="title">预约信息</span>
        </div>
        <div class="main">
            <el-table
                :data="tableData"
                style="width: 100%"
                height="100%"
                :stripe="true"
                ref="expandTable"
                @row-click="handleRowClick">
                <el-table-column
                    label="预约提交时间"
                    prop="apply.gmtModified"
                    >
                </el-table-column>

                <el-table-column
                    label="资源类型"
                    prop="resource.rType">
                </el-table-column>

                <el-table-column
                    label="申请人数"
                    prop="apply.applyNumbers">
                </el-table-column>
                
                <el-table-column
                    label="预约时间"
                    prop="apply.appointmentStartTime">
                    <template slot-scope="scope">
                        <el-tag
                        type="primary"
                        effect="plain"
                        disable-transitions>{{scope.row.apply.appointmentStartTime}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    label="审核状态"
                    prop="apply.isAgree"
                    >
                    <template slot-scope="scope">
                        <el-tag
                        :type="applyStatus[scope.row.apply.isAgree].type"
                        effect="dark"
                        disable-transitions>{{applyStatus[scope.row.apply.isAgree].value}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="资源地点：">
                                <span>{{ props.row.resource.rArea }}</span>
                            </el-form-item>
                            <el-form-item label="资源用途：">
                                <span>{{ props.row.resource.rFunctions }}</span>
                            </el-form-item>
                            <el-form-item label="资源容量：">
                                <span>{{ props.row.resource.rCapacities }}</span>
                            </el-form-item>
                            <el-form-item label="申请人：">
                                <span>{{ $store.state.userInfo.username }}</span>
                            </el-form-item>
                            <el-form-item label="申请理由：" class="itemReason">
                                <span class="reason">{{ props.row.apply.applyReason}}</span>
                            </el-form-item>
                            <el-form-item>
                                <!-- 未通过可以修改申请，但无法取消预约， -->
                                <!-- 审核中可以修改申请，可以取消预约， -->
                                <!-- 已通过无法修改申请，但取消预约后，重新申请-->
                                <!-- 未通过可以修改申请，但无法取消预约， -->
                                <div class="submit">
                                    <el-button  :disabled="props.row.apply.isAgree === 0 ||  props.row.apply.isAgree  === 3? true : false" type="primary"  size="mini" @click="cancelApply(props.row.apply)" plain >取消预约</el-button>
                                    <el-button  :disabled="props.row.apply.isAgree === 2 ||  props.row.apply.isAgree  === 3? true : false" type="primary"  size="mini" @click="changeApply" plain>修改申请</el-button>
                                </div>
                            </el-form-item>
                            <div class="submit">
                                <el-button  type="primary"  size="mini" @click="cancelApply" plain>取消预约</el-button>
                                <el-button  type="primary"  size="mini" @click="changeApply" plain>修改申请</el-button>
                            </div> -->
                        </el-form>
                    </template>

                </el-table-column>

            </el-table>
            
        </div>
        <div class="menu">
            <span>总预约数:{{applyNumbers}}</span>
            <el-button-group >
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="frontPage">上一页</el-button>
                <el-button type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
            </el-button-group>
            <span>总共{{totalPages}}页，当前第{{currentPage}}页</span>
        </div>
    </div>
  
</template>

<script>
    export default {
        name:'UserApply',
        data() {
            return {
                tableData: [],
                applyNumbers:0,
                totalPages:0,
                currentPage:1,
                expandRow:Number,
                applyStatus:[
                    {
                        key:0,
                        value:'未通过',
                        type:'danger'

                    },
                    {
                        key:1,
                        value:'审核中',
                        type:'primary'
                    },
                    {
                        key:2,
                        value:'已通过',
                        type:'success'
                    },
                    {
                        key:3,
                        value:'已取消',
                        type:'warning'
                    }
                ]
            }
        },
        methods: {
            handleRowClick(row){
                if(row.expanded){
                    row.expanded = !row.expanded;
                    this.$refs.expandTable.toggleRowExpansion(row, row.expanded);
                }else{
                    this.tableData.forEach(
                        val => {
                            this.$set(val, "expanded", val === row);
                            this.$refs.expandTable.toggleRowExpansion(val, val.expanded);
                        }
                    )
                }
            },
            cancelApply(apply){
                console.log(apply);
                this.$confirm('此操作将取消这次的预约请求, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((e) => {
                    this.$axios.post('http://localhost:8087/apply/cancelApply',{
                        id:apply.id
                    }).then(
                        res => {
                            if(res.data.code === 0){
                                this.$message({
                                    type: 'success',
                                    message: '取消申请成功!'
                                });
                                this.currentPage = 1
                                this.applyRequest(this.currentPage)
                            }else {
                                this.$message({
                                    type: 'danger',
                                    message: '取消申请失败!'
                                });
                            }
                        }
                    )
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    });          
                });
            },
            changeApply(){
                this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                });
            },

            nextPage(){
                if(this.currentPage != this.totalPages) {
                    this.currentPage += 1
                    this.applyRequest(this.currentPage)
                    
                }
            },
            frontPage(){
                if(this.currentPage > 1){
                    this.currentPage -= 1
                    this.applyRequest(this.currentPage)
                }
            },

            applyRequest(page){
                this.$axios.get('http://localhost:8087/apply/userAllApply',{
                    params:{
                        userId:this.$store.state.userInfo.uId,
                        currentPage:page,
                        limit:6,
                    }
                }).then(
                    res => {
                        this.tableData = res.data.data.applyTuple.map(
                            // 后端数据的处理
                            (data) => {
                                let apply = data.apply
                                let resource = data.resource
                                // 预约最后更新的时间
                                data.apply.gmtModified = this.dayjs(apply.gmtModified).format('YYYY-MM-DD HH:mm:ss')
                                // 预约时间
                                let dateTime = this.dayjs(apply.appointmentStartTime).format('YYYY-MM-DD HH:mm:ss').split(' ')
                                let realTime = this.sectionTime.filter(res =>{
                                    return res.startTime === dateTime[1]
                                })
                                data.apply.appointmentStartTime = dateTime[0]+" "+realTime[0].label
                                // 资源类型
                                data.resource.rType = this.rType[parseInt(resource.rType)-1].label
                                // 资源用途
                                data.resource.rFunctions = this.rFunctions[parseInt(resource.rFunctions)-1].label

                                return data
                            }
                        )
                        this.applyNumbers = res.data.data.totalApplies
                        this.totalPages = res.data.data.totalPages
                        this.tableData.forEach(val =>{
                            this.$set(val, "expanded", false);
                        })
                    }
                )
            }
        },
        mounted(){
            this.applyRequest(this.currentPage)
        }
    }
</script>

<style scoped>
    .basic{
        width: 100%;
        height: 100%;
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
        margin-left: 36rem;
        
    }
    .submit .el-button{
        margin-right: 0.5rem;
    }
    .main{
        background-color: rgb(68, 183, 181);
        height: 88%;
    }
    .menu{
        position: relative;
        /* background-color: rgb(138, 138, 154); */
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .reason{
        font-size: 10px;
        color: rgb(58, 58, 58);
    }
</style>