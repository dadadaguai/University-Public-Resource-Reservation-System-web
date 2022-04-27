<template>
    <div class="basic">
        <div class="title-position">
            <span class="title">预约信息</span>
        </div>
        <div class="main">
            <el-dialog
                v-if="dialogShow"
                title="公共资源预约申请表"
                :modal="false"
                :visible.sync="dialogVisible"
                width="40%"
                @before-close="cancel"
                >
                <ApplyChange :apply="applyItem" ref="applyChange"></ApplyChange>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="applyChangeConfirm">确 定</el-button>
                </span>
            </el-dialog>
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
                    label="资源地点"
                    prop="resource.rArea">
                </el-table-column>
                
                <el-table-column
                    label="预约时间"
                    prop="apply.appointmentStartTime">
                    <template slot-scope="scope">
                        <el-tag
                        type="primary"
                        effect="light"
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
                        effect="plain"
                        disable-transitions>{{applyStatus[scope.row.apply.isAgree].value}}</el-tag>
                    </template>
                </el-table-column>

                 <el-table-column
                    label="使用状态"
                    prop="apply.applyNumbers">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.resourceUseStatus.type"
                        effect="dark"
                        disable-transitions>{{scope.row.resourceUseStatus.value}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">

                            <el-form-item label="资源用途：">
                                <span>{{ props.row.resource.rFunctions }}</span>
                            </el-form-item>
                            <el-form-item label="资源容量：">
                                <span>{{ props.row.resource.rCapacities }}</span>
                            </el-form-item>
                            <el-form-item label="申请人：">
                                <span>{{ $store.state.userInfo.username }}</span>
                            </el-form-item>
                            <el-form-item label="申请人数：">
                                <span>{{ props.row.apply.applyNumbers }}</span>
                            </el-form-item>
  
                            <el-form-item label="申请理由：" class="itemReason">
                                <span class="reason">{{ props.row.apply.applyReason}}</span>
                            </el-form-item>
                            <el-form-item>
                                <!-- 0 未通过可以修改申请，但无法取消预约， -->
                                <!-- 1 审核中可以修改申请，可以取消预约， -->
                                <!-- 2 已通过（未使用）无法修改申请但取消预约后，重新申请，已通过（已使用）无法修改、无法取消-->
                                <!-- 3 已取消无法取消预约，可以修改申请-->
                                <!-- 0代表未通过，1代表审核中，2代表已通过，3代表取消预约-->
                                <div class="submit">
                                    <el-button  
                                        :disabled="props.row.apply.isAgree === 0 ||  props.row.apply.isAgree  === 3 || props.row.resourceUseStatus.key === 2? true : false" 
                                        type="primary"  
                                        size="mini" 
                                        @click="cancelApply(props.row.apply)" 
                                        plain >取消预约
                                    </el-button>
                                    <el-button  
                                        :disabled="props.row.apply.isAgree === 2? true : false" 
                                        type="primary"  
                                        size="mini" 
                                        @click="applyChange(props.row,$event)" 
                                        plain>修改申请
                                    </el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </template>

                </el-table-column>

            </el-table>
            
        </div>
        <div class="menu">
            <span>总预约数:{{applyNumbers}}</span>
            <el-button-group >
                <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="frontPage" :disabled="currentPage == 1">上一页</el-button>
                <el-button type="primary" size="mini" @click="nextPage" :disabled="totalPages == currentPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
            <span>总共{{totalPages}}页，当前第{{currentPage}}页</span>
        </div>
    </div>
  
</template>

<script>
import ApplyChange from '../components/ApplyChange.vue';
    export default {
        name:'UserApply',
        components:{ApplyChange},
        data() {
            return {
                // 资源修改属性
                dialogVisible: false,
                dialogShow:true,
                applyItem:Object,
                // 判断使用状态
                resourceUseStartTime:Number,
                resourceUseEndTime:Number,
                resourceUseStatus:Object,
                // 
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
                ],
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
            applyChange(item,$event) {
                this.dialogShow = true
                this.dialogVisible = true
                this.applyItem = item
            },
            applyChangeConfirm(){
                // 检验表单是否填写完毕
                // 获取申请组件里面的信息
                let applyMessage = this.$refs.applyChange.sendMessage()
                if(applyMessage !== null){
                    // 发送post请求
                    this.$axios.post('http://localhost:8087/apply/changeApply',{
                        id : applyMessage.id,
                        resourceId : applyMessage.resourceId,
                        userId : applyMessage.userId,
                        appointmentStartTime : this.dayjs(applyMessage.appointmentStartTime).toDate(),
                        appointmentEndTime : this.dayjs(applyMessage.appointmentEndTime).toDate(),
                        applyReason : applyMessage.applyReason,
                        applyNumbers : applyMessage.applyNumbers,
                        isAgree: applyMessage.isAgree
                    }).then(
                        res => {
                            if(res.data.code === 0){
                                this.$message({
                                    showClose: true,
                                    message: '资源申请修改成功',
                                    type: 'success'
                                });

                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '资源申请失败',
                                    type: 'error'
                                });
                            }
                            // 关闭模态框
                            this.dialogShow = false
                            this.currentPage = 1
                            this.applyRequest(this.currentPage)
                        }
                    )

                }
            },
            cancel(){
                this.dialogShow = false
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
                                let resource = data.resource
                                let apply = data.apply
                                // 向data对象中添加一个使用状态字段
                                this.resourceUseStartTime = new Date(apply.appointmentStartTime).getTime()
                                this.resourceUseEndTime = new Date(apply.appointmentEndTime).getTime()
                                let currentTime = new Date().getTime()
                                //使用中
                                if( currentTime > this.resourceUseStartTime && currentTime < this.resourceUseEndTime && apply.isAgree == 2){
                                    data.resourceUseStatus = this.resourceUseStatusList[1]
                                //未使用
                                }else if(currentTime < this.resourceUseStartTime || apply.isAgree != 2){
                                    data.resourceUseStatus = this.resourceUseStatusList[0]
                                //已使用
                                }else if(apply.isAgree == 2 && currentTime > this.resourceUseEndTime){
                                    data.resourceUseStatus = this.resourceUseStatusList[2]
                                }

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
            },
            
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