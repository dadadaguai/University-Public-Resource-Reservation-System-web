// 引入ANGLE_instanced_arrays
var Mock=require("mockjs")
// 请求地址，请求方法（post/get）,require(请求数据地址)
Mock.mock("/api/notice","get",require("./data/notice.json"))

Mock.mock("/api/userInfo","get",require("./data/userInfo.json"))