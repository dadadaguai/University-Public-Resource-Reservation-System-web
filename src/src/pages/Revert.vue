<template>
    <div class="basic">
        <div class="title-position">
            <span class="title">资源归还</span>
        </div>
        <div class="main">
            <div class="main-search">
                  <el-select v-model="searchValue" clearable placeholder="请选择">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <el-option
                        v-for="item in searchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="searchRecord"> 搜索</el-button>
            </div>
            <div class="block">
                
            <el-timeline >
                <el-dialog
                    ref="revertDialog"
                    v-if="dialogShow"
                    title="资源归还统计表"
                    :modal="false"
                    :visible.sync="dialogVisible"
                    width="40%"
                    >
                    <RevertDetail  ref="revert" :record="propRecord" @isUploadSuccess="isUploadSuccess"></RevertDetail>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="receiveMessage">确 定</el-button>
                    </span>
                </el-dialog>
                <el-timeline-item  v-for="(value,index) in recordList" :key="index" :color="value.returnStatus.color">

                <el-card>
                    <el-descriptions :colon="false">
                        <el-descriptions-item label="资源类型：">{{value.resource.rType}}</el-descriptions-item>
                        <el-descriptions-item label="资源地点：">{{value.resource.rArea}}</el-descriptions-item>
                        <el-descriptions-item label="审核人：">{{value.record.reviewer}}</el-descriptions-item>
                        <el-descriptions-item label="预约时间：">
                            <el-tag size="small" effect="plain" type="warning">{{value.record.appointmentStartTime}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="规定归还时间：">
                            <el-tag size="small" effect="plain" type="warning">{{value.returnTime}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="实际归还时间：">
                            <el-tag size="small" effect="plain" type="warning">{{value.record.returnTime}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="使用状态：">
                            <el-tag size="small" effect="dark" :type="value.resourceUseStatus.type">{{value.resourceUseStatus.value}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="归还状态：">
                            <el-tag size="small" effect="dark" :type="value.returnStatus.type">{{value.returnStatus.value}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item >
                            <el-button 
                                size="small" 
                                type="primary" 
                                plain 
                                :disabled="value.returnStatus.key || value.resourceUseStatus.key == 0 || value.resourceUseStatus.key == 1 " 
                                @click="clickBack(value.record)">点击归还</el-button>
                        </el-descriptions-item>
                    </el-descriptions>
                    <span class="prompt-test">注：用户未在规定归还时间归还资源，则会被扣除相应的信用积分。</span>
                </el-card>
                </el-timeline-item>
            </el-timeline>
            </div>
        </div>
    </div> 
</template>

<script>
import RevertDetail from '../components/RevertDetial.vue'
export default {
    name:'Revert',
    components:{RevertDetail},
    data() {
      return {
            searchOptions:[
                {
                    value: 0,
                    label: '所有资源记录'
                },
                {
                    value: 1,
                    label: '未归还资源'
                }, {
                    value: 2,
                    label: '已归还资源'
                }
            ],
            searchValue:1,
            returnStatus:[
                {
                    key:false,
                    value:'未归还',
                    type:'danger',
                    color:'#F56C6C'
                },{
                    key:true,
                    value:'已归还',
                    type:'success',
                    color:'#67C23A'
                }
            ],
            recordList:[],
            dialogVisible: false,
            dialogShow: true,
            propRecord:null
      }
    },
    methods:{
        recordRequest(option){
            this.$axios.get('http://localhost:8087/record/findRecordsByUid',{
                params:{
                    uid:this.$store.state.userInfo.uId,
                    option:option
                }
            }).then(res => {
                this.recordList = res.data.data.map(
                    data => {
                        // 规定归还时间
                        let startTime = this.dayjs(data.record.appointmentStartTime).format('YYYY-MM-DD HH:mm:ss')
                        let endTime = this.dayjs(data.record.appointmentEndTime).subtract(20,'minute').format('YYYY-MM-DD HH:mm')
                        let backTime = this.dayjs(data.record.appointmentEndTime).format('YYYY-MM-DD HH:mm')
                        data.returnTime = endTime + ' ~ '+ backTime.split(' ')[1]
                        // 使用状态
                        let start = new Date(startTime).getTime()
                        let end = new Date(endTime).getTime()
                        let current = new Date().getTime()
                        if(current < start){
                            // 未使用
                            data.resourceUseStatus = this.resourceUseStatusList[0]
                        }else if(current > end){
                            //已使用
                            data.resourceUseStatus = this.resourceUseStatusList[2]
                        }else{
                            //使用中
                            data.resourceUseStatus = this.resourceUseStatusList[1]
                        }
                        
                        // 真实归还时间处理
                        let returnStatus = 0
                        if(data.record.returnTime !== null){
                            returnStatus = 1
                            data.record.returnTime = this.dayjs(data.record.returnTime).format('YYYY-MM-DD HH:mm:ss')
                        }
                        // 归还状态
                        data.returnStatus = returnStatus === 0 ? this.returnStatus[0] : this.returnStatus[1]
                        // 预约时间
                        let dateTime = startTime.split(' ')
                        let realTime = this.sectionTime.filter(res =>{
                            return res.startTime === dateTime[1]
                        })
                        data.record.appointmentStartTime = dateTime[0]+" "+realTime[0].label
                        
                        return data
                    }
                )
            })
        },
        clickBack(record){
            this.propRecord = record
            this.$nextTick(()=>{
                this.dialogVisible = true
                this.dialogShow = true
            })
        },
        searchRecord(){
            if(typeof(this.searchValue) == 'string'){
               this.recordRequest(0)
            }else{
                this.recordRequest(this.searchValue)
            }
        },
        receiveMessage(){
            this.$refs.revert.sendMessage()
        },
        // 
        isUploadSuccess(data){
            if(data){
                this.recordRequest(this.searchValue)
                this.dialogVisible = false,
                this.dialogShow = false,
                this.$parent.$parent.$parent.$parent.getNotReturnResourceNumber()
                this.$message({
                    message: '资源归还成功，感谢您的使用',
                    type: 'success'
                });
            }
        }
    },
    mounted(){
        this.recordRequest(this.searchValue)
    }
}
</script>

<style>
    .basic{
        width: 100%;
        height: 100%;
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
    .main{
        /* background-color: rgb(68, 183, 181); */
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
    .prompt-test{
        color: #C0C4CC;
        font-size: 1rem;
    }
    .main-search{
        /* background-color: rgb(92, 157, 181); */
        margin-bottom: 2rem;
        display:flex;
        justify-content: flex-end;
        align-items: center;
    }
    .main-search .el-button {
        margin-right: 3rem;
        margin-left: 4rem;
    }
</style>