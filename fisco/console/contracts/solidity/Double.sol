pragma solidity ^0.4.24;

contract Double{
    uint number;

    constructor() public{
       number = 0;
    }

    function get() constant public returns(uint){
	uint index = number * 2;
        return index;
    }

    function set(uint n) public{
    	number = n;
    }
}
