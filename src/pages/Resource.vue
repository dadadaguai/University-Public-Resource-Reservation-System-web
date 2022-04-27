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
                    placeholder="选择日期">
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
            <el-table
                height="100%"
                :data="tableData"
                align="center"
                style="width: 100%"
                :default-sort = "{prop: 'type', order: 'ascending'}"
                >
                    <el-table-column
                        prop="rId"
                        label="资源编号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="rType"
                        label="类型"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="rArea"
                        label="地点"
                        width="348">
                    </el-table-column>
                    <el-table-column
                        prop="rFunctions"
                        label="用途"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="rCapacities"
                        label="容量"
                        width="200">
                    </el-table-column>
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                :type="scope.row.rStates>0?'primary':'info'"
                                :disabled ="scope.row.rStates>0?false:true"
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
import ResourceApply from '../components/ResourceApply.vue'
    export default {
        name:'Resource',
        components:{ResourceApply},
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
                totalResources:0,
                totalPages:0,
                currentPage:1,
                
                resourceItem:Object

            }
        },
        mounted() {
            // this.resourceRequest(this.currentPage)
            this.search(Event,this.currentPage)
        },
        methods: {
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
                console.log(key);
                console.log(value);
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
                this.dialogShow = true
                this.dialogVisible = true
                this.resourceItem = item
            },
            search(e,currentPage){
                if(currentPage === 0) {
                    ++currentPage
                    ++this.currentPage
                }
                let startDate = ''
                let nextDate = ''
                if(this.startDate !== ''){
                    startDate = this.dayjs(this.startDate).format('YYYY-MM-DD HH:mm:ss')
                    nextDate = this.dayjs(this.startDate).add(1,'day').format('YYYY-MM-DD HH:mm:ss')
                }
                this.$axios.post('http://localhost:8087/resource/search',{
                    "rType":this.typeValue === '' ? null :this.typeValue,
                    "rFunctions":this.funValue === '' ? null : this.funValue
                },{
                    params:{
                        currentPage:currentPage,
                        limit:8,
                        startDate:startDate,
                        nextDate:nextDate
                    }
                }).then(
                    res => {
                        if(res.data.code === 0){
                            this.totalResources = res.data.data.totalResources
                            this.totalPages = res.data.data.totalPages
                            this.tableData = res.data.data.resources.map(
                                resource => {
                                    console.log(resource);
                                    resource.rFunctions = this.parseResourceInfo(this.funOptions,resource.rFunctions)
                                    resource.rType = this.parseResourceInfo(this.typeOptions,resource.rType)
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
                    this.$axios.post('http://localhost:8087/apply/addApply',{
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