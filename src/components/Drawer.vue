<template>
    <div>

        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="hover">
                鼠标悬浮时显示
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
  export default {
        name:'Drawer',
        data() {
        return {
            drawer: false,
            direction: 'rtl',
        };
        },
        methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
        }
  };
</script>

<style>

</style>


