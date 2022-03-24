<template>
    <div class="block">
        <div>公告通知</div>
        <el-timeline >
            <el-timeline-item timestamp="2018/4/12" placement="top" type="primary">
                <el-card>
                    <h4>教室XXX出现故障</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top" type="warning">
                <el-card>
                    <el-tag
                        type="success"
                        effect="light">更新 Github 模板
                    </el-tag>
                    <!-- <h4></h4> -->
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top" type="info">
                <el-card>
               <el-tag
                        type="success"
                        effect="dark">更新 Github 模板
                    </el-tag>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top" type="info">
                <el-card>
               <el-tag
                        type="success"
                        effect="plain">更新 Github 模板
                    </el-tag>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top" type="info">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    export default {
        name:'Notice'
    }
</script>

<style>
    .el-card{
        width: 35rem;
    }
</style>