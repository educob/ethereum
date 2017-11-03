# How to easily compile, deploy and run contracts so we learn something from the samples?

I assume truffle has been installed.
Create a directory and cd to it.
Open a terminal, let's call it terminal 2, and run: truffle init
1) In folder: "contracts" remove: ConverLib.sol & MetaCoin.sol (or study and play with them). Then insert your contract/s file/s.
2) Let's say you have inserted InfoFeed.sol & Consumer.sol (see:  https://github.com/educob/ethereum/blob/master/what%20is%20wrong%20with%20this%20docu%20sample.md)
    Go to "migrations" folder and replace the content of "2_deploy_contracts.js" with:
    
    ```ruby
    var Consumer = artifacts.require("./Consumer.sol");
    var InfoFeed = artifacts.require("./InfoFeed.sol");

    module.exports = function(deployer) {
      deployer.deploy(InfoFeed);
      deployer.deploy(Consumer);
    };
    ```
3) In the folder you created add "gas" option to file "truffle.js" (it didn't work for me until I added it) so it looks like this:

    ```ruby
    module.exports = {
      networks: {
        development: {
          host: "localhost",
          port: 8545,
          network_id: "*", // Match any network id
          gas: 4600000
        }
      }
    };
    ```
4) Open a new terminal, let's call it terminal 1 (I know it's confusing but for me it makes sense). In terminal 1 run:

    ```ruby
        geth --testnet --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" console --unlock 0

    ```
You will be asked for your testnet first ether account password.

5) In terminal 2, in your folder, run one: "truffle migrate". This compiles and deployes your contracts.

6) You need InfoFeed contract address. You have two ways to get it:
  a) Look at "truffle migrate" output and find it in line with: 

    ```ruby
    InfoFeed: 0x02df0aa034523a0f922876da3d2fe5acf9bb36d5
    ```
  
  b) Run in terminal 2: 

    ```ruby
    InfoFeed.deployed().then(function(instance) {
    return instance.getAddress.call();
    }).then(function(obj) {
    console.log("address: " +obj)
    })
    ```
   
   BUT you must paste the code as a single line. My trick is that I paste in chrome's address and then selected and copied again.
    
    You are running solidity contracts!!! Hooray!!!!
    
    Now you can run Consumer methods with this code:
   
      ```ruby
      Consumer.deployed().then(
        function(instance) {
          instance.setFeed('0x02df0aa034523a0f922876da3d2fe5acf9bb36d5');
          return instance;
        }).then(function(instance) {
          return instance.callFeed.call();
        }).then(function(obj) {
          console.log(obj.toString())
        }).catch(function(e){
          alert("Error:"+e);
        })
    ```
    
    ### Have fun!!
