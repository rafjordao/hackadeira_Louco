var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED04 = new Gpio(4, 'out');

LED04.writeSync(1);

var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8082, path: '/shut_down'});
var funcao = true;
var ativa = true;

wss.on('connection', function(ws) {

	LED04.writeSync(1);



	function unexportOnClose() { //function to run when exiting program
		LED04.writeSync(0);
	};

console.log("led ok");

ws.on('message', function(message) {

	if(message.includes("Tomada") && message.includes("Ativa")){
		ativa = true;
	}else if (message.includes("Tomada") && message.includes("Desativar")){
		ativa = false;
	}	
	
	if(message.includes("Função") && message.includes("Ativar")){
	  funcao = true;
	}else if (message.includes("Função") && message.includes("Desativar")){
	  funcao = false;	
	};
	
	console.log("tomada :" +ativa);
	console.log("funcao :" +funcao);

	if(ativa){
		if(funcao){
			console.log(message);
	
			if(message.includes("liberada")){
			 	LED04.writeSync(1);
			}else{
				LED04.writeSync(0);
			};
		}else{
			LED04.writeSync(1);
		};
	}else{
		LED04.writeSync(0);	
	}
	

	
	
});



});

