<template>
    <el-container>
        <el-header>
            <el-select v-model="typeValue" filterable  clearable placeholder="请选择资源类型">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="funValue" filterable  clearable placeholder="请选择资源用途">
                <el-option
                    v-for="item in funOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="选择要预约的日期（只能预约三天内的日期）" placement="top">
                <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                    >
                </el-date-picker>
            </el-tooltip>
            
            <el-button type="primary" icon="el-icon-search" @click="search($event,currentPage)">搜索</el-button>
        </el-header>
        <el-main>
            <el-dialog
                v-if="dialogShow"
                title="公共资源预约申请表"
                :modal="false"
                :visible.sync="dialogVisible"
                width="40%">
                <ResourceApply :resource="resourceItem" ref="resourceApply"></ResourceApply>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="applyConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog
                v-if="isApplyDialogShow"
                title="资源预约详情"
                :modal="false"
                :visible.sync="isApplyDialogVisible"
                width="75%"
                :destroy-on-close="true"
                @close="closeApplySchedule">
                <ApplySchedule :resource="resourceItem"></ApplySchedule>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="isApplyDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="isApplyDialogShow = !isApplyDialogShow">确 定</el-button>
                </span> -->
            </el-dialog>     

            <el-table
                height="100%"
                :data="tableData"
                align="center"
                style="width: 100%"
                :default-sort="{prop: 'resource.type', order: 'ascending'}"
                >
                    <el-table-column
                        label="资源编号"
                        width="150">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="点击查看预约" placement="right">
                                <el-link @click="openWeekApply(scope.row,$event)">{{scope.row.resource.rId}}<i class="el-icon-view el-icon--right"></i> </el-link>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="resource.rType"
                        label="类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="resource.rArea"
                        label="地点"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="resource.rFunctions"
                        label="用途"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="resource.rCapacities"
                        label="容量"
                        width="100">
                    </el-table-column>

                    <el-table-column
                        label="当前可预约节次"
                        width="420"
                    >
                        <template slot-scope="scope">
                            <el-tag size="mini" v-if="!scope.row.isReserve" >{{"暂无可预约时间"}}</el-tag>
                            <el-tag size="mini" v-for="(item,index) in scope.row.availableReserve" :key="index">{{item.label}}</el-tag>
                            
                        </template>
                    </el-table-column>
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                :type="scope.row.isReserve ? 'primary' : 'info'"
                                :disabled ="scope.row.isReserve ? false : true"
                                @click="apply(scope.row,$event)"
                                >预约</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </el-main>
        <el-footer height="5%">
                <span>总资源数:{{totalResources}}</span>
                <el-button-group >
                    <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="frontPage" :disabled="currentPage == 1">上一页</el-button>
                    <el-button type="primary" size="mini" @click="nextPage" :disabled="totalPages == currentPage">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
                </el-button-group>
                <span>总共{{totalPages}}页，当前第{{currentPage}}页</span>
        </el-footer>
    </el-container>
</template>

<script>
import ApplySchedule from '../components/ApplySchedule.vue'
import ResourceApply from '../components/ResourceApply.vue'
    export default {
        name:'Resource',
        components:{ResourceApply,ApplySchedule},
        data() {
            return {
                startDate:'',
                typeOptions: this.rType,
                funOptions: this.rFunctions,

                typeValue:'',
                funValue:'',
                tableData: [],
                dialogVisible: false,
                dialogShow:true,

                isApplyDialogShow:false,
                isApplyDialogVisible:false,

                totalResources:0,
                totalPages:0,
                currentPage:1,
                
                resourceItem:Object,
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
        mounted() {

            // this.resourceRequest(this.currentPage)
            this.search(Event,this.currentPage)
        },
        methods: {
            closeApplySchedule(){
                this.isApplyDialogShow = false
                this.isApplyDialogVisible = false
            },
            // 请求分页数据
            resourceRequest(currentPage){
                this.$axios.get('http://localhost:8087/resource/findAllResource',{
                    params:{
                        currentPage:currentPage,
                        limit:10
                    }
                }).then(
                    res =>{
                        this.totalResources = res.data.data.totalResources
                        this.totalPages = res.data.data.totalPages
                        this.tableData = res.data.data.resources.map(
                            resource =>{
                                resource.rFunctions = this.parseResourceInfo(this.funOptions,resource.rFunctions)
                                resource.rType = this.parseResourceInfo(this.typeOptions,resource.rType)
                                return resource
                            }
                        )
                        // console.log(this.tableData)
                    // this.notices = res.data.data.notices.map( notice =>{
                    //     notice.gmtCreate = this.dayjs(notice.gmtCreate).format('YYYY-MM-DD')
                    //     return notice
                    // })
                })
            },
            // 解析rFunctions和rType转化为前端展示
            parseResourceInfo(key,value){
                return key[parseInt(value)-1].label
            },
            nextPage(){
                if(this.currentPage != this.totalPages) {
                    this.search(Event,this.currentPage + 1)
                    this.currentPage += 1
                }
            },
            frontPage(){
                if(this.currentPage > 1){
                    this.search(Event,this.currentPage - 1)
                    this.currentPage -= 1
                }
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            apply(item,$event) {
                if(this.$store.state.userInfo.credit <= 3){
                    this.$message({
                        message: '当前您的信用度低于3分，无法进行资源预约操作。',
                        type: 'error'
                    });
                }else {
                    this.dialogShow = true
                    this.dialogVisible = true
                    this.resourceItem = item.resource
                }

            },
            search(e,currentPage){
                if(currentPage === 0) {
                    ++currentPage
                    ++this.currentPage
                }
                let startDate = ''
                let nextDate = ''
                if(this.startDate != ''){
                    startDate = this.dayjs(this.startDate).format('YYYY-MM-DD HH:mm:ss')
                    nextDate = this.dayjs(this.startDate).add(1,'day').format('YYYY-MM-DD HH:mm:ss')
                }else{
                    startDate = this.dayjs().format('YYYY-MM-DD ') + '00:00:00'
                    nextDate = this.dayjs().add(1,'day').format('YYYY-MM-DD ') + '00:00:00'
                }
                this.$axios.post('http://localhost:8087/resource/search',{
                    "rType":this.typeValue === '' ? null :this.typeValue,
                    "rFunctions":this.funValue === '' ? null : this.funValue
                },{
                    params:{
                        currentPage:currentPage,
                        limit:7,
                        startDate:startDate,
                        nextDate:nextDate
                    }
                }).then(
                    res => {
                        console.log(res);
                        if(res.data.code === 0){
                            this.totalResources = res.data.data.totalResources
                            this.totalPages = res.data.data.totalPages
                            this.tableData = res.data.data.resources.map(
                                resource => {
                                    resource.resource.rFunctions = this.parseResourceInfo(this.funOptions,resource.resource.rFunctions)
                                    resource.resource.rType = this.parseResourceInfo(this.typeOptions,resource.resource.rType)
                                    
                                    // 先进行资源预约记录情况的过滤
                                    var listTime = JSON.parse(JSON.stringify(this.sectionTime))
                                    // 资源预约不为空
                                    if(resource.record.length > 0){
                                        listTime =  listTime.filter(
                                            item => {
                                                // 该资源预约记录的预约时间
                                                let recordList = resource.record
                                                recordList.forEach( element => {
                                                    let recordTime = this.dayjs(element.appointmentStartTime).format('HH:mm:ss')
                                                    if(recordTime == item.startTime){
                                                        item.disabled = true
                                                    }
                                                });
                                                return !item.disabled
                                            }
                                        )
                                    }
                                    
                                    // 资源可预约的最晚时间
                                    var reserveEndTime = this.dayjs().format('YYYY-MM-DD ') + '19:00:00'
                                    // 判断是否是当天
                                    if(startDate == (this.dayjs().format("YYYY-MM-DD ")+'00:00:00')){
                                        if(listTime.length > 0){
                                            listTime = listTime.filter(
                                                item => {
                                                    var tempTime = this.dayjs().format("YYYY-MM-DD ") + item.startTime;
                                                    return this.dayjs().isBefore(this.dayjs(tempTime))
                                                }
                                            )
                                        }
                                        resource.isReserve = resource.record.length == 5 || this.dayjs().isAfter(reserveEndTime)  ? false : true 
                                    }else{
                                        resource.isReserve = resource.record.length == 5 ? false : true 
                                    }
                                    resource.availableReserve = listTime
                                    return resource
                                }
                            )   
                        }else{
                            this.totalResources = 0
                            this.totalPages = 0
                            this.currentPage = 0
                            this.tableData = []
                        }
                    },
                )
            },
            applyConfirm(){
                 // 检验表单是否填写完毕
                 //  获取申请组件里面的信息
                let applyMessage = this.$refs.resourceApply.sendMessage()
                if(applyMessage !== null){
                    // 发送post请求
                    console.log("接收：",applyMessage);
                    this.$axios.post('http://localhost:8087/apply/addApply',{
                        id : applyMessage.id,
                        resourceId : applyMessage.resourceId,
                        userId : applyMessage.userId,
                        appointmentStartTime : this.dayjs(applyMessage.appointmentStartTime).toDate(),
                        appointmentEndTime : this.dayjs(applyMessage.appointmentEndTime).toDate(),
                        applyReason : applyMessage.applyReason,
                        applyNumbers : applyMessage.applyNumbers,
                        isAgree: applyMessage.isAgree,
                        reviewer:applyMessage.reviewer,
                        reviewerId:applyMessage.reviewerId,
                        // 新添加两个字段
                        isReview: applyMessage.isReview
                    }).then(
                        res => {
                            if(res.data.code === 0){
                                this.$message({
                                    showClose: true,
                                    message: '资源预约成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '资源预约失败',
                                    type: 'error'
                                });
                            }
                        }
                    )
                    // 关闭模态框
                    this.dialogShow = false
                }
            },
            openWeekApply(item,$event){
                this.resourceItem = item.resource
                this.isApplyDialogShow = true
                this.isApplyDialogVisible = true
            }
        },
    }
</script>

<style scoped>
    .el-header{
        display: flex;
        justify-content:space-around;
        align-items: center;
    }
    .el-container{
        width: 100%;
    }
    /* .el-select{
        margin-left: 2rem;
        margin-right: 5rem;
    } */
    .el-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>