/**
 * The background page for the Rate My USask Profs extension.
 * Adapted from Rate My Fiu extension created by: Christian Canizares - ccani008@fiu.edu
 */

 console.log("Background");

//This recieves the message from the main script file
chrome.runtime.onMessage.addListener(
    function(request, sender, callback) {
    	console.log("Listener");

	    if (request.action == "xhttp") {
	        var xhttp = new XMLHttpRequest();
	        var method = request.method ? request.method.toUpperCase() : 'GET';

	        xhttp.onload = function() {
	            console.log("Loaded URl: " + request.url);
	            console.log("Professor: " + request.professor);
	            callback({
	                response: xhttp.responseText,
	                searchPageURL: request.link});
	        };
	        xhttp.onerror = function() {

	            // callback to clean up the communication port.
	            console.log("error");
	            callback();
	        };
	        console.log("Attempting to open URL: " + request.url);
	        xhttp.open(method, request.url, true);
	        if (method == 'POST') {
	            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        }
	        xhttp.send(request.data);
	        return true; // prevents the callback from being called too early on return
	    }

	    return true;
    }
);