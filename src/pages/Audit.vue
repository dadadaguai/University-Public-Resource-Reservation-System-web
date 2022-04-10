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
                label="资源编号"
                prop="id">
            </el-table-column>

            <el-table-column
                label="资源类型"
                prop="name">
            </el-table-column>

            <el-table-column
                label="地点"
                prop="desc">
            </el-table-column>

            <el-table-column
                label="申请人"
                prop="desc">
            </el-table-column>

            <el-table-column
                label="职位"
                prop="desc">
            </el-table-column>

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="院系">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="专业">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="申请时间">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="申请人数">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="申请理由">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                        <div class="submit">
                            <el-button  type="primary" @click="refuse">拒绝</el-button>
                            <el-button  type="primary" @click="accept">同意</el-button>
                        </div>
                        
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
                tableData: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
                }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
                }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
                }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
                }]
            }
        },
        methods: {
            refuse(){
                this.$confirm('此操作将拒绝该申请人的预约请求, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
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
            accept(){
                this.$message({
                        message: '恭喜你，这是一条成功消息',
                        type: 'success'
                });
            }
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
        float: right;
    }
    .submit .el-button{
        width: 10rem;
        margin-right: 2rem;
    }
</style>