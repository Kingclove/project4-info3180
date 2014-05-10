var onClose = function() {
 alert("connection lost try to refresh");
  }

var onError = function() {
 alert("we have an error"); 
}



var onMessage = function(message) {
	console.log("hello");
	console.log("we have a message: " + message.data);

}

var onOpened = function(){
	console.log("Connection made");
}


var sendMessage = function(name,roomid,message) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/sendmessage/' + name + '/' + roomid, true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("message="+message);
	console.log("Request sent to main page");
};