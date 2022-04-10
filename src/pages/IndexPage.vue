<template>
    <div class="basic">
        <div class="header">
            <span class="header-time">{{time}}</span>
            <span class="header-date">{{date}}</span>
            <div class="header-weather">
                <span class="weather-font">{{weather.city}}</span>
                <div class="weather-state">    
                    <el-image :src="WeatherImg" fit="scale-down" class="weather-img"></el-image>
                    <span class="weather-font">
                        {{weather.wea}}
                    </span>
                </div>
                <span class="weather-font">{{weather.tem_night+'°'+' ~ '+weather.tem_day+'°'}}</span>
                <span></span>
            </div>
        </div>
        <div class="middle">
            <el-divider content-position="center">欢迎您，{{userName}}</el-divider>
        </div>
            
        <div class="main">
            <el-carousel trigger="click" height="36rem">
                <el-carousel-item v-for="item in carousel" :key="item._id">
                    <el-image :src="item.url" fit="scale-down"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        name:'IndexPage',
        data(){
            return {
                date:'',
                time:'',
                weather:Object,
                timer:null,
                WeatherImg:'',
                carousel:[
                    {
                       url:require('../assets/carousel1.png'),
                       _id:1 
                    },
                    {
                        url:require('../assets/carousel2.png'),
                       _id:2 
                    },
                    {
                        url:require('../assets/carousel3.png'),
                       _id:3 
                    },
                    {
                        url:require('../assets/carousel4.png'),
                       _id:4 
                    }
                ]
            }
        },
        props:['userName'],
        methods:{
            ipCallback(res){
                console.log(res);
            },
            getWeatherImg(weather){
                let imgSrc = weather.wea_img
                if(weather.wea_img == 'qing' || weather.wea_img == 'yun'){
                    if(parseInt(this.dayjs().format('HH'))  > 18){
                        imgSrc+='night'
                    }
                }
                this.WeatherImg = require('../assets/'+imgSrc+'.png')
            }
        },
        mounted() {
            this.date = this.dayjs().format('YYYY年MM月DD日')
            this.timer = setInterval(() => {
              this.time = this.dayjs().format('HH:mm:ss')
            },144)
            //  获取当前外网ip地址
            // this.$jsonp('https://www.taobao.com/help/getip.php',{
            //     callbackQuery: 'callback',
            //     callbackName: 'ipCallback'
            // }).then(res => {
            //     console.log(res.ip);
            // })
            this.$axios.get('https://yiketianqi.com/free/day',{
                params:{
                    appid:'34962419',
                    appsecret:'GhNEd877',
                    vue:'1'
                }
            }).then(res => {
                this.weather = res.data
                this.getWeatherImg(this.weather)
            })
        },
        beforeDestroy(){
            //  销毁前关闭定时器
            clearInterval(this.timer)
        }
        
    }
</script>

<style scoped>
    .basic{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header{
        display: flex;
        flex-direction: column;
    }
    .main{
        width:80%;
        height: 30rem;
    }
    .middle{
        width: 66%;
    }
    .header-time{
        font-size: 6rem;
        font-weight: 4rem;
    }
    .header-date{
        font-size: 1.5rem;
        font-weight:bold;
        margin-bottom: 1rem;
    }
    .header-weather{

        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .weather-font{
        font-size: 1.5rem;
    }
    .weather-state{
        display: flex;
        align-items: center;
    }
    .weather-img{
        width: 24px;
        height: 24px;
    }
</style>