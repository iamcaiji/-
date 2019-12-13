var webapi = require("../api/web3j");
var exec = require('child_process').exec;
var http = require("http")

// async function f1() {
//   let x = await webapi.getBlockNumber
//   console.log(x.result);
//   return x;
// }
function  execute(){
    var cmd='./cli.js getBlockNumber'   
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.log(error);
        }
        else{
            console.log(stdout);
            var data = JSON.parse(stdout);
            return stdout
            console.log(data);
        }
    });
}

http.createServer(function(req,res){
	// var number = f1();
	var ans = execute();
	// var promise = webapi.getBlockNumber;
	// promise.then(value=>{
	// 	console.log(value);
	// },err=>{
	// 	console.log(err);
	// });
	res.write('hello' + ans);
	res.end('success!')
}).listen(3000);
