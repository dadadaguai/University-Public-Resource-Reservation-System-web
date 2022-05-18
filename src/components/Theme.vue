<template>
    <div class="basic">
        <!-- <el-row :gutter="30">
            <el-col :span="6" v-for="theme in themeColor" :key="theme.keyID" :style="{'background-color' : theme.value}" class="theme" @click="bubbling">
                <div class="vague"></div>
                <div class="title">{{theme.title}}</div>
            </el-col>
        </el-row> -->
        <div v-for="theme in themeColor" :key="theme.keyID" :style="{'background-color' : theme.value}" class="theme" @click="bubbling">
            <div class="vague"></div>
            <div class="title">{{theme.title}}</div>
        </div>
    </div> 
</template>

<script>
    export default {
        name:'Theme',
        data() {
            return {
                themeColor:[
                    {
                        keyID:1,
                        title:'桔梗',
                        value:'#585eaa'
                    },
                    {
                        keyID:2,
                        title:'若柳',
                        value:'#bed742'
                    },
                    {
                        keyID:3,
                        title:'秋香',
                        value:'#d9b612'
                    },
                    {
                        keyID:4,
                        title:'褐返',
                        value:'#02435f'
                    },
                    {
                        keyID:5,
                        title:'真赪',
                        value:'#c76968'
                    },
                    {
                        keyID:6,
                        title:'竹青',
                        value:'#789262'
                    }
                ]
            }
        },
        methods:{
            bubbling(e) {
                
                localStorage.setItem('bgColor',e.target.parentElement.style.backgroundColor)
                this.$emit('getThemeColor', e.target.parentElement.style.backgroundColor)
                // console.log(e)
                // var bg = e.target.parentElement
                // console.log(bg.style.backgroundColor)
            }
        }
    }
</script>

<style scoped>
    .basic{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;
        align-content:flex-end;
        width: 33rem;
        background-color: rgb(255, 255, 255);
    }
    .theme{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .theme:hover{
        opacity: 0.4;
    }
    .theme:active{
        opacity: 0.4;
        background-color: aquamarine;
    }
    .vague{
        background-color:rgb(255, 255, 255);
        opacity: 0.4;
        height: 50px;
        width: 100px;
    }
    .title{
        text-align: center;
        color: rgb(255, 255, 255);
    }
</style>