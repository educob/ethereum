// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import proof_artifacts from '../../build/contracts/Proof.json'

// Proof is our usable abstraction, which we'll use through the code below.
var Proof = contract(proof_artifacts);

window.App = {
	submit: function() {
		var file = document.getElementById("file").files[0];

		if(file) {
			var owner = document.getElementById("owner").value;

			if(owner == "")	{
				alert("Please enter owner name");
			} else {
				var reader = new FileReader();
				reader.onload = function (event) {
			  	      var hash = sha1(event.target.result);
				          console.log("hash:"+hash)

	       			      Proof.deployed().then(function(instance) {
                                var meta = instance;
                                console.log("deployed:"+meta.address+" owner:"+owner+" hash:"+hash);
                                return meta.set(owner, hash, {from: web3.eth.accounts[0]});
                          }).then(function(result) {
                              console.log(result.tx);
                              if(!result) {
                                $("#message").text("An error occured.");
                              } else {
                                $("#message").html("Transaction hash: " + result.tx);
                              }
                          });
				};
				reader.readAsArrayBuffer(file);
			}
		} else {
			alert("Please select a file");
		}
	},

	getInfo: function() {
		var file = document.getElementById("file").files[0];

		if(file) {
			var reader = new FileReader();
			reader.onload = function (event) {
		  		var hash = sha1(event.target.result);

		  	    Proof.deployed().then(function(instance) {
                        console.log("deployed:"+instance.address);
                        return instance.get.call(hash);
                }).then(function(timestamp, owner) {
                      console.log("timestamp:"+timestamp);
                      if(timestamp == 0) {
                        console.log("no data")
                        $("#message").html("File not found");
                      } else {
                        console.log("SIIIIII data")
                        $("#message").html("Timestamp: " + timestamp + " Owner: " + owner);
                      }
                }).catch(function(e) {
                      console.log("Error :" + e);
                });

			};
			reader.readAsArrayBuffer(file);
		} else {
			alert("Please select a file");
		}
	}
};


window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    Proof.setProvider(web3.currentProvider);
    Proof.deployed().then(function(instance) {
        console.log("instance:"+instance.address);
        var logAddedEvent = instance.logFileAddedStatus({fromBlock: "latest"});
        logAddedEvent.watch(function(error, result) {
            console.log("Evento logFileAddedStatus disparado")
            if(!error) {
                if(result.args.status == true) {
                    if($("#events_list").text() == "No Transaction Found") {
                        $("#events_list").html("<li>Txn Hash: " + result.transactionHash + "\nOwner: " + result.args.owner + "\nFile Hash: " + result.args.fileHash + "</li>");
                    } else {
                        $("#events_list").prepend("<li>Txn Hash: " + result.transactionHash + "\nOwner: " + result.args.owner + "\nFile Hash: " + result.args.fileHash + "</li>");
                    }
                }
            }
        });
    });
});



/*
for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
        console.log( p + '::' + obj[p] );
    }
}
*/


