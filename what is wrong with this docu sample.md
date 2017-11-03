# What's wrong with this code in the ethereum docu:?

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

## Let's see: Everything.

This piece of code appears almost at the beginning of the solidity docu when beginners are wondering what is solidity.

## Wrong #1.
Only Consumer.sol code is shown and that's makes you think that InfoFeed, somehow, will get compiled and deployed.
That's not the case. A second file InfoFeed.sol must be added with contract InfoFeed code in it.

## wrong #2
Consumer.callFeed() doesn't return anything. So how are we going to see whether it return 42 or not?

## wrong #3.
InfoFeed.finfo() return 42 when called directly from an InfoFeed instance BUT when called from Consumer.callFeed() it return 0.
How to solve it? Remove the "ret" from "function info() payable returns (uint ret) { return 42; }".
I cannot explain this behavior but after many failed attempts it only worked when I remove "ret".

## Final Code:

InfoFeed.sol file:
```ruby
pragma solidity ^0.4.0;

contract InfoFeed {
    function info() payable returns (uint) { return 42; }
    function getAddress() payable returns (address) { return this; }
}
```

Consumer.sol file:

```ruby
pragma solidity ^0.4.0;

contract InfoFeed {
    function info() payable returns (uint) { return 42; }
}

contract Consumer {
    InfoFeed feed;
    function setFeed(address addr) { feed = InfoFeed(addr); }
    function callFeed() returns (uint) { return feed.info(); }
}

```

## How to compile, deploy and run this piece of code so we learn something from it?
No need to go to further aways: https://github.com/educob/ethereum/blob/master/compile%20deploy%20and%20run%20solidity%20code.md
