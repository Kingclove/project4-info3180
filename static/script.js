var onClose = function() {
 alert("connection lost try to refresh");
  }

var onError = function() {
 alert("we have an error"); 
}



var onMessage = function(message) {
	console.log("hello");
	console.log("we have a message: ");
	console.log(JSON.parse(message.data));  //Testing parse

	messageHandler(JSON.parse(message.data))

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


var messageHandler = function(message){
	switch(message.messageType){
		case "name":
			hostSetup(message);
			break;
		case "boardSetup":
			opponentSetup(message);
			break;
		case "yourTurn":
			yourTurn(message);
			break;
		default:
			console.log("Something went wrong");
			break;
	}
}



function hostSetup(message){
	sessionStorage.opponent = message.content;
	$(".sideBox").html("");
	var deck = createDeck();
	showDeck(deck);
	layout_cards();
	console.log("hostSetup");
	$('#player1').addClass('playingplayer');
	$('#player2').removeClass('playingplayer');
	clickSetter();
	setnames();
	myTurn = true;
	var board = $(".sideBox").html()
	console.log(board);
	var jsonMessage = {"messageType":"boardSetup","content":board}
	sendMessage(sessionStorage.opponent, sessionStorage.roomid, JSON.stringify(jsonMessage));
}

function opponentSetup(message){
	$(".sideBox").html(message.content);
	$('.flip').get(0).play();
	opponentScore = message.score;
	
	updatescores();
	setTimeout(checkmatch, 700);
}



function yourTurn(message){
	$(".sideBox").html(message.content);
	console.log("yourTurn");
	$('#player1').addClass('playingplayer');
	$('#player2').removeClass('playingplayer');
	myTurn= true;
	clickSetter();
}
