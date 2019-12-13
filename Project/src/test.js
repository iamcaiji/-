var http = require("http")
var url=require('url');
var qs=require('querystring');//解析参数的库

const webapi = require("../nodejs-sdk/packages/api/web3j").Web3jService;
const Configuration = require("../nodejs-sdk/packages/api/common/configuration").Configuration;
Configuration.setConfig("../nodejs-sdk/packages/cli/conf/config.json");
const utils = require("../nodejs-sdk/packages/api/common/web3lib/utils");

http.createServer(function(req,res){
    res.writeHead(200,
        {"Content-Type":'text/plain','charset':'utf-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
    // console.log("req_url:" + req.url)
    var url_info = require('url').parse(req.url,true)
    var get_data = url_info.query;
    var api = new webapi();
    var Addr = "0xfedb4cf7cadcec18221efedf3d4ea112fc4cffff";

    if (url_info.pathname == '/deploy'){
        api.deploy("../nodejs-sdk/packages/cli/contracts/Final_3.sol","../nodejs-sdk/packages/cli/contracts/").then(value=>{
            console.log(value);
            res.end();
        }).catch(err=>{
            console.log(err);
        });
    }

    if (url_info.pathname == '/api'){       
        if (get_data.type == 1){
            var data1 = get_data.account + "";
            var data2 = get_data.account_type + "";
            var data3 = get_data.account_asset + "";
            var sendarr = new Array(data1,data2,data3);
            api.sendRawTransaction(Addr,"register(string,int256,int256)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var returndata;
                if (parseInt(temp[0]) == -1) {
                    returndata = "this account has been used!";
                }
                if (parseInt(temp[0]) == 0) {
                    returndata = "register success";
                }
                var json = JSON.stringify({
                    result1:returndata,
                });
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
        if (get_data.type == 2){
            var data1 = get_data.account + "";
            var sendarr = new Array(data1);
            api.sendRawTransaction(Addr,"select(string)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256","string","int256","int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var json;
                if (parseInt(temp[0]) == -1) {
                    json = JSON.stringify({
                        result1:"can't find the user! maybe haven't register?",
                        result2:"",
                        result3:"",
                        result4:""
                    });
                }
                if (parseInt(temp[0]) == 0) {
                    json = JSON.stringify({
                        result1:"success!",
                        result2:temp[1],
                        result3:temp[2],
                        result4:temp[3]
                    });
                }
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
        if (get_data.type == 3){
            var data1 = get_data.account_A + "";
            var data2 = get_data.account_B + "";
            var data3 = get_data.money + "";
            var sendarr = new Array(data1,data2,data3);
            api.sendRawTransaction(Addr,"transfer(string,string,int256)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var json;
                if (parseInt(temp[0]) == 0) {
                    json = JSON.stringify({
                        result1:"can't find account_A."
                    });
                }
                if (parseInt(temp[0]) == 1) {
                    json = JSON.stringify({
                        result1:"can't find account_B."
                    });
                }if (parseInt(temp[0]) == 2) {
                    json = JSON.stringify({
                        result1:"account_A have no enough money."
                    });
                }if (parseInt(temp[0]) == 3) {
                    json = JSON.stringify({
                        result1:"success!"
                    });
                }
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
        
        if (get_data.type == 4){
            var data1 = get_data.account_A + "";
            var data2 = get_data.account_B + "";
            var data3 = get_data.money + "";
            var data4 = get_data.ddl + "";
            var sendarr = new Array(data1,data2,data3,data4);
            api.sendRawTransaction(Addr,"load(string,string,int256,int256)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var json;
                if (parseInt(temp[0]) == 0) {
                    json = JSON.stringify({
                        result1:"one of accounts is not register?"
                    });
                }
                if (parseInt(temp[0]) == 1) {
                    json = JSON.stringify({
                        result1:"success!"
                    });
                }
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
        if (get_data.type == 5){
            var data1 = get_data.bank + "";
            var data2 = get_data.account_A + "";
            var data3 = get_data.account_B + "";
            var data4 = get_data.startTime + "";
            var data5 = get_data.endTime + "";
            var data6 = get_data.limit + "";
            var sendarr = new Array(data1,data2,data3,data4,data5,data6);
            api.sendRawTransaction(Addr,"make_deal(string,string,string,int256,int256,int256)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var json;
                if (parseInt(temp[0]) == 0) {
                    json = JSON.stringify({
                        result1:"can't find account_A."
                    });
                }
                if (parseInt(temp[0]) == 1) {
                    json = JSON.stringify({
                        result1:"can't find account_B."
                    });
                }
                if (parseInt(temp[0]) == 2) {
                    json = JSON.stringify({
                        result1:"can't find bank."
                    });
                }
                if (parseInt(temp[0]) == 3) {
                    json = JSON.stringify({
                        result1:"success!"
                    });
                }
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
        if (get_data.type == 6){
            var data1 = get_data.bank + "";
            var data2 = get_data.account + "";
            var sendarr = new Array(data1,data2);
            api.sendRawTransaction(Addr,"trust(string,string)",sendarr).then(value=>{
                // console.log(value.output);                   
                // console.log(utils.decodeParams(returnarr,value.output));
                var returnarr = new Array("int256");
                var temp = utils.decodeParams(returnarr,value.output);
                var json;
                if (parseInt(temp[0]) == 0) {
                    json = JSON.stringify({
                        result1:"can't find account or bank."
                    });
                }
                if (parseInt(temp[0]) == 1) {
                    json = JSON.stringify({
                        result1:"make sure bank is bank, account is account."
                    });
                }
                if (parseInt(temp[0]) == 2) {
                    json = JSON.stringify({
                        result1:"success!"
                    });
                }
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }

        if (get_data.type == 7){
            var data1 = get_data.time + "";
            var sendarr = new Array(data1);
            api.sendRawTransaction(Addr,"setTime(int256)",sendarr).then(value=>{
                var json = JSON.stringify({
                    result1:"Time have set success!"
                });
                res.write(json);
                // console.log(json);
                res.end();
            }).catch(err=>{
                console.log(err);
            });
        }
    }
}).listen(3000);
