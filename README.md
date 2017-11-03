# My ethereum code
As a way of learning I am adapting the code sample of the book "Building Blockchain Projects" to the truffle framework.
And more.

## About: "Building Blockchain Projects"

I have read 5 books about ethereum-blockchain-decentralized applications and "Building Blockchain Projects" is without anydoubt the best book of them.

But the truffle framework is not introduced until chapter 8, so in order to really learn the concepts of contract deployment and webserver manipulation of contracts I decided to recode the samples of chapeter 4 and 5 to run in truffle.

I am quite happy with the result cause changing the code really forces you to learn every little detail in there.

##  hint: don't ever run "truffle init webpack" once your code is in place. 

I did it and, of course, I lost all the code.

##  hint 2: if you get an error complaining about the "import" command in your app.js

Quite probably you are not running index.html in the webserver but directly on the browser.

## What's wrong with this piece of code in the docu:?

```ruby
pragma solidity ^0.4.0;

contract InfoFeed {
    function info() payable returns (uint ret) { return 42; }
}

contract Consumer {
    InfoFeed feed;
    function setFeed(address addr) { feed = InfoFeed(addr); }
    function callFeed() { feed.info.value(10).gas(800)(); }
}
```

Everything!!!!!
https://github.com/educob/ethereum/blob/master/what%20is%20wrong%20with%20this%20docu%20sample.md

## How to run contracts?
With web3:
https://github.com/educob/ethereum/blob/master/web3:%20compile%2C%20deploy%20and%20run%20smart%20contracts.md

With truffle:
https://github.com/educob/ethereum/blob/master/compile%20deploy%20and%20run%20solidity%20code.md
