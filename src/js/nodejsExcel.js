var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+'/collection-point.xlsx');
// console.log(__dirname);
var excelObj=obj[1].data;
// console.log(excelObj);
 
var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}
var buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }        
]);

console.log(data);