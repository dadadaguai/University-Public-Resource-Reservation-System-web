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
            
            <el-switch
                v-model="switchValue"
                active-text="可预约"
                inactive-text="全部">
            </el-switch>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-header>
        <el-main>
            <el-dialog
                title="公共资源预约申请表"
                :modal="false"
                :visible.sync="dialogVisible"
                width="40%">
                <ResourceApply></ResourceApply>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                        prop="r_id"
                        label="资源编号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="area"
                        label="地点"
                        width="348">
                    </el-table-column>
                    <el-table-column
                        prop="functions"
                        label="用途"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="capacity"
                        label="容量"
                        width="200">
                    </el-table-column>
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                :type="scope.row.states>0?'primary':'info'"
                                :disabled ="scope.row.states>0?false:true"
                                @click="apply">预约</el-button>
                        </template>
                    </el-table-column>
            </el-table>

        </el-main>
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
                switchValue: false,
                typeOptions: [{
                        value: '1',
                        label: '智慧教室'
                    }, {
                        value: '2',
                        label: '录播室'
                    }, {
                        value: '3',
                        label: '研讨教室'
                    }, {
                        value: '4',
                        label: '投影教室'
                    }, {
                        value: '5',
                        label: '非投影教室'
                    }
                ],
                funOptions: [
                    {
                        value: '1',
                        label: '教学'
                    }, 
                    {
                        value: '2',
                        label: '讲座'
                    }, 
                    {
                        value: '3',
                        label: '会议'
                    }, 
                    {
                        value: '4',
                        label: '活动'
                    }, 
                    {
                        value: '5',
                        label: '录播'
                    }, 
                    {
                        value: '6',
                        label: '直播'
                    }, 
                ],
                
                typeValue:'',
                funValue:'',
                tableData: [],
                dialogVisible: false
            }
        },
        mounted() {
            this.$axios.get('/api/resource').then(res =>{
                this.tableData = res.data.data
            })
        },
        methods: {
            handleDelete(index, row) {
                console.log(index, row);
            },
            apply() {
                this.dialogVisible = !this.dialogVisible
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
</style>