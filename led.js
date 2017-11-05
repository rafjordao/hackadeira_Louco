var Gpio = require('onoff').Gpio,
  buzzer = new Gpio(18, 'out'),
  pir = new Gpio(28, 'in', 'both');

var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8081, path: '/moviment_sensor'});

 
	pir.watch(function(err, value) {
  		if (err) exit();
  		buzzer.writeSync(value);
  		//console.log('Intruder detected'+ new Date());
  		if(value == 1){
			console.log("tem gente"+ new Date());
			ws.send("sensor ativado");
   		}
	}); 
console.log('Pi Bot deployed successfully!');
console.log('Guarding the Magic pencil...');
 
function exit() {
  
  pir.unexport();
  process.exit();
}
