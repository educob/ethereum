# Web3. How to compile, deploy and run solidity smart contracts.

Running the first contract is a challenge. The docu and the samples are oudated. 
Looking for internet I found this tutorial: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2
It didn't run but the modifications were minimal and finally I made it work.

## Instructions for ubuntu:


Terminal 1: geth --dev --unlock 0 --rpc --rpcport "8545" --rpccorsdomain "*" --port "30303" --rpcapi "eth,web3,personal,net,miner,admin,debug" console

Terminal 2:
$ node

Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

# check everything is ok (or at least it looks ok :)
web3.eth.accounts

code = fs.readFileSync('Voting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = '0x'+compiledCode.contracts[':Voting'].bytecode

win1: miner.start(1)
win2:
var gasValue = web3.eth.estimateGas({data:byteCode})
gasValue
# your balance:
ethers = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether").toString()
# next 2 lines are one
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 377610})

deployedContract.address # important is not undefined
contractInstance = VotingContract.at(deployedContract.address)

## using the contract:
contractInstance.totalVotesFor.call('Rama').toString()
contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})

contractInstance.totalVotesFor.call('Rama').toLocaleString()

win1: miner.stop()
