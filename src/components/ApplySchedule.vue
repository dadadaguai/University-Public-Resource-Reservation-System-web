<template>
    <el-container>
        <el-header height="50px">
            <!-- <span></span> -->
            <span class="header-title">第{{weekTerm}}周</span>
            <el-button-group>
                <el-button type="primary" size="mini" plain  icon="el-icon-arrow-left" @click="goFrontWeek">上一周</el-button>
                <el-button type="primary" size="mini" plain @click="goNextWeek">下一周<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
        </el-header>
        <el-main>
            <el-table
                ref="singleTable"
                :data="tableData"
                stripe
                border
                style="width: 100%"
                class="schedule-table"
                >
                    <el-table-column>
                        <template slot-scope="scope">
                            {{schedule[scope.$index]}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="星期一"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[0].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[0].status">{{scope.row.lessonWeek[0].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="星期二"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[1].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[1].status">{{scope.row.lessonWeek[1].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="星期三"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[2].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[2].status">{{scope.row.lessonWeek[2].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>


                    <el-table-column
                        label="星期四"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[3].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[3].status">{{scope.row.lessonWeek[3].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        property="address"
                        label="星期五"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[4].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[4].status">{{scope.row.lessonWeek[4].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        property="address"
                        label="星期六"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[5].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[5].status">{{scope.row.lessonWeek[5].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        property="address"
                        label="星期日"
                        width="145">
                        <template slot-scope="scope">
                            <el-tag type="success"  v-if="scope.row.lessonWeek[6].status"></el-tag>
                            <el-tag type="warning" 
                                effect="dark" 
                                v-if="!scope.row.lessonWeek[6].status">{{scope.row.lessonWeek[6].applicant}}
                            </el-tag>
                        </template>
                    </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name:'ApplySchedule',
        data(){
            return {
                // 第几周
                weekTerm:'',
                schedule:["第一大节","第二大节","第三大节","第四大节","第五大节"],
                week:["周一","周二","周三","周四","周五","周六","周日"],
                // 
                virtualWeeks:[],
                // virtualLesson:[28800000,36000000,50400000,57600000,68400000],
                virtualLesson:[8,10,14,16,19],
                tableData: [],
                receiveResource:null,
                currentTime:new Date().getTime()
            }
        },
        props:['resource'],
        methods:{
            getCurrentTermWeek(){
                const termStart = this.dayjs(this.$store.state.term.startTime)
                const current = this.dayjs(this.currentTime)
                // let 
                let diffWeek =  current.diff(termStart,'week')
                this.weekTerm = diffWeek
            },  
            getWeek(time){
                var weeks = []
                // 本周的开始时间，即周一
                var Mon = this.dayjs(time).startOf('week').add(1,'day').valueOf()
                // 周二
                var Tues = this.dayjs(Mon).add(1,'day').valueOf()
                // 周三
                var Wed = this.dayjs(Tues).add(1,'day').valueOf()
                // 周四
                var Thur = this.dayjs(Wed).add(1,'day').valueOf()
                // 周五
                var Fri = this.dayjs(Thur).add(1,'day').valueOf()
                // 周六
                var Sat = this.dayjs(Fri).add(1,'day').valueOf()
                // 周日
                var Sun = this.dayjs(Sat).add(1,'day').valueOf()
                weeks.push(Mon)
                weeks.push(Tues)
                weeks.push(Wed)
                weeks.push(Thur)
                weeks.push(Fri)
                weeks.push(Sat)
                weeks.push(Sun)
                return weeks
            },
            getDefaultLesson(){
                var arr = [
                    {
                        lessonWeek:[
                            {
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            }
                        ]
                    },
                    {
                        lessonWeek:[
                            {
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            }
                        ]
                    },
                    {
                        lessonWeek:[
                            {
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            }
                        ]
                    },
                    {
                        lessonWeek:[
                            {
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            }
                            
                        ]
                    },
                    {
                        lessonWeek:[
                            {
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            },{
                                status:true,
                                applicant:'',
                            }
                        ]
                    }
                ]
                return arr
            },
            getApply(weeks){
                this.$axios.post('http://localhost:8087/resource/getApplyOfWeek',{
                    'id': this.receiveResource.id,
                    'rId': this.receiveResource.rId 
                },{
                    params:{
                        weeks: weeks
                    }
                }).then(
                    res => {
                        var tableTemp = this.getDefaultLesson()
                        let lessons = res.data.data

                        let arr = []
                        // 数组是res.data.data
                        // 总共五节
                        console.log("lessons",lessons);
                        for(var i=0; i<5; ++i){
                            // lesson 是按顺序的第一节、第二节、第三节、第四节、第五节
                            var lesson = lessons[i]
                            if(lesson.length != 0){
                                lesson.forEach(element => {
                                    // 获取预约开始时间
                                    let date = element.record.appointmentStartTime
                                    // console.log("某一节",this.dayjs(date).format('YYYY-MM-DD HH:mm:ss'));
                                    // 获取当天的凌晨00:00，来与星期天数判断
                                    let time = new Date(this.dayjs(date).format('YYYY-MM-DD')+' 00:00:00').getTime()
                                    // console.log(time);
                                    // // let timeNum = parseInt(this.dayjs(date).format('H'))
                                    for(var j=0;j<7;++j){
                                        // console.log("i and j",i,j);
                                        // console.log("week",this.virtualWeeks);
                                        // console.log('time',time);
                                        if(this.virtualWeeks[j] == time){
                                            // console.log("换了");
                                            tableTemp[i].lessonWeek[j].status = false
                                            tableTemp[i].lessonWeek[j].applicant = element.user.faculty + '-' + element.user.username
                                            return
                                        }
                                    }
                                });
                            }
                        }
                        
                        this.tableData = tableTemp
                        this.getCurrentTermWeek()
                        // console.log(parseInt(this.dayjs().format('H')));
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
            },
            goFrontWeek(){
                // 获取上周的今天
                this.currentTime = new Date(this.dayjs(this.currentTime).subtract(1,'week')).getTime()
                // 更新时间
                this.virtualWeeks = this.getWeek(this.currentTime)
                // 发送请求
                this.getApply(this.virtualWeeks.toString())
            },
            goNextWeek(){
                 // 获取下周的今天
                this.currentTime = new Date(this.dayjs(this.currentTime).add(1,'week')).getTime()
                // 初始化表格
                this.virtualWeeks = this.getWeek(this.currentTime)
                // this.tableData = this.getDefaultLesson()
                // 发送请求
                this.getApply(this.virtualWeeks.toString())
            }

        },
        mounted() {
            this.currentTime = new Date().getTime()
            this.tableData = this.getDefaultLesson()
            this.receiveResource = this.resource
            this.virtualWeeks = this.getWeek(this.currentTime)
            if(this.receiveResource != null){
                this.getApply(this.virtualWeeks.toString())
            }
            this.getCurrentTermWeek()
            // console.log(this.receiveResource);
            // this.getWeek()
        }
        
    }
</script>


<style scoped>
    .schedule-table{
        text-align: center;
    }
    .el-tag{
        width: 100%;
        height:42px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background-color: rgb(147, 120, 120); */
    }
    .el-main{
        padding: 0;
    }
    .header-title{
        font-size: x-large;
        color: #303133;
    }
</style>