pragma solidity ^0.4.21;

contract Final_1{
    address public bank;
    mapping (address => uint) public balances;
    address public trust;
    
    struct Page{
        string name;
        uint start_time;
        uint range;
        address c1;
        address c2;
        uint money;
    }
    
    struct PayList{
        address s;
        address t;
        uint amount;
        uint end_time;
    }

    Page[] public page;
    PayList[] public list;
    
    constructor(){
        bank = msg.sender;
        balances[msg.sender] = 100000;
    }
    
    function addMoney(uint amount) {
        balances[msg.sender] += amount;
    }
    
    function makefirstdeal(string name, uint now_time, address t, address v, uint amount, uint range){
        if (v != bank) return;
        Page memory p = Page(name, now_time, range, msg.sender, t, amount);
        trust = msg.sender;
        page.push(p);
    }
    
    function makedeal(string name, uint now_time, address t, address v, uint amount, uint range){
        if (v != bank) return;
        Page memory p = Page(name, now_time, range, msg.sender, t, amount);
        page.push(p);
    }
    
    function load(address t, uint amount, uint now_time) returns (bool){
        if (t != bank) return false;
        address a;
        address b;
        b = msg.sender;
        for (uint i = page.length - 1; i >= 0; -- i){
            if (page[i].c2 == b){
                a = page[i].c1;
                if (a == trust) {
                    if (page[i].start_time + page[i].range > now_time && page[i].money > amount){
                        balances[bank] -= amount;
                        balances[msg.sender] += amount;
                        page[i].money -= amount;
                        PayList memory pl = PayList(t, msg.sender, amount, page[i].start_time + page[i].range);
                        list.push(pl);
                        return true;
                    }
                }
                else {
                    b = a;
                    i = page.length;
                }
            }
        }
        return false;
    }
    
    function repay(uint time) {
        for (uint i = 0; i < page.length; ++ i){
            if (page[i].start_time + page[i].range <= time){
                balances[page[i].c2] += page[i].money;
                balances[page[i].c1] -= page[i].money;
            }
        }
        for (i = 0; i < list.length; ++ i){
            if (time > list[i].end_time){
                balances[list[i].s] += list[i].amount;
                balances[list[i].t] -= list[i].amount;
            }
        }  
    }
}