pragma solidity ^0.4.21;

contract Final_2{
    
    struct Deal{
        int256 bank;
        int256 account_A;
        int256 account_B;
        int256 start_time;
        int256 end_time;
        int256 limit;
    }
    
    struct Bank_turst_list{
        int256 name;
        int256[] trust_user; 
    }
    
    struct Payback{
        int256 account_A;
        int256 account_B;
        int256 money;
        int256 final_time;
    }
    
    int256 now_time;
    int256[] account;
    int256[] account_asset;
    int256[] account_type;
    Deal[] deal_list;
    Bank_turst_list[] trust_list;
    Payback[] payback_list;
    
    function constructor () public {
       now_time = 0;
    }
    
    // 
    function find_index_in_account(int256 a) public returns(int256){
        for (uint256 i = 0; i < account.length; i ++){
            int256 temp = account[i];
            if (temp == a) return int256(i);
        }
        return -1;
    }
    
    function get() public returns(int256){
        int256 temp = account[0];
        return temp;
    }
    
    //-1 error else >0 = success
    //type 0==bank 1==user
    function register(int256 a, int256 b, int256 money) public returns(int256) {
        int256 index = find_index_in_account(a);
        if (index != -1) return -1;
        else {
            account.push(a);
            account_type.push(b);
            account_asset.push(money);
        }
        return 0;
    } 
    // first parama represent success or error
    function select(int256 a) public returns (int256,int256,int256,int256) {
       int256 index = find_index_in_account(a);
       if (index == -1) return (-1,0,0,0);
       return(0,account[uint256(index)],account_type[uint256(index)],account_asset[uint256(index)]);
    }
    
    function transfer(int256 a, int256 b, int256 amount) public returns (int256) {
        int256 index1 = find_index_in_account(a);
        int256 index2 = find_index_in_account(b);
        if (index1 == -1) return 0;
        if (index2 == -1) return 1;
        if (account[uint256(index1)] < amount) return 2;
        
        account[uint256(index1)] -= amount;
        account[uint256(index2)] += amount;
        return 3;
    }
    
    // 0->not find a 1->not find b 2->not find bank 3->success
    function make_deal(int256 bank, int256 a, int256 b, int256 start, int256 end, int256 limit) public returns(int256){
        if (find_index_in_account(a) == -1) return 0;
        if (find_index_in_account(b) == -1) return 1;
        if (find_index_in_account(bank) == -1) return 2;
        Deal memory deal = Deal(bank, a, b, start, end, limit);
        deal_list.push(deal);
        return 3;
    }
    
    function trust(int256 bank, int256 user) public returns(int256){
        if (find_index_in_account(user) == -1 || find_index_in_account(bank) == -1) return 0;
        int256 t1;
        int256 t2;
        int256 t3;
        int256 t4;
        (t1,t2,t3,t4) = select(user);
        if(t1 == 0 || t3 != 1) return 1;
        (t1,t2,t3,t4) = select(bank);
        if (t1 == 0 || t4 != 0) return 1;
        
        for (uint256 i = 0; i < trust_list.length; i ++){
            if (trust_list[i].name == bank) {
                trust_list[i].trust_user.push(user);
                return 2;
            }
        }
        int256[] arr;
        arr.push(user);
        Bank_turst_list memory li = Bank_turst_list(bank, arr);
        trust_list.push(li);
        return 2;
    }
    
    // -1== other error , 0 == no, 1 == yes
    function is_bank_trust_account(int256 bank, int256 account) public returns(int256){
        if (find_index_in_account(bank) == -1 || find_index_in_account(account) == -1) return -1;
        for (uint256 i = 0; i < trust_list.length; ++ i){
            if (trust_list[i].name == bank) {
                for (uint256 j = 0; j < trust_list[i].trust_user.length; ++ j){
                    if (trust_list[i].trust_user[j] == account) return 1;
                }
            }
        }
        return 0;
    }
    
    // 0 = error  1 = success
    function load(int256 a, int256 bank, int256 amount, int256 end_date)  public returns(int256){
        int256 index1 = find_index_in_account(a);
        int256 index2 = find_index_in_account(bank);
        if (index1 == -1 || index2 == -1) return 0;
        if(is_bank_trust_account(bank,a) == 1) {
            account[uint256(index1)] += amount;
            account[uint256(index2)] -= amount;
            payback_list.push(Payback(a, bank, amount, end_date));
            return 1;
        }
        return 0;
    }
    
    function checkNeedToPay() public returns (int256) {
        for (uint256 i = 0; i < payback_list.length; ++ i){
            if (payback_list[i].final_time <= now_time){
                int256 index1 = find_index_in_account(payback_list[i].account_A);
                int256 index2 = find_index_in_account(payback_list[i].account_B);
                account[uint256(index1)] -= payback_list[i].money;
                account[uint256(index2)] += payback_list[i].money;
                // i = i + 1
                for (uint256 j = i; j < payback_list.length - 1; ++ j){
                    payback_list[j] = payback_list[j + 1]; 
                }
                -- i;
            }
        }
    }
    
    function setTime(int256 time) public {
        now_time = time;
        checkNeedToPay();
    }
}