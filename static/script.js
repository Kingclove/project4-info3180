var onMessage = function(message) {
	console.log("hello");
	console.log("we have a message: " + message.data);

}


var sendMessage = function(name,roomid,message) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/sendmessage/' + name + '/' + roomid, true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("message="+message);
	console.log("Request sent to main page");
};