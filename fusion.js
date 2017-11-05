
var Gpio = require('pigpio').Gpio,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

var Gpio2 = require('onoff').Gpio,
  buzzer = new Gpio2(18, 'out'),
  pir = new Gpio2(17, 'in', 'both');



// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var MICROSECDONDS_PER_CM = 1e6/34321;

trigger.digitalWrite(0); // Make sure trigger is low



var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8080, path: '/sonic_sensor'});

wss.on('connection', function(ws) {


(function () {
  var startTick;

  echo.on('alert', function (level, tick) {
    var endTick,
      diff;

    if (level == 1) {
      startTick = tick;
    } else {
      endTick = tick;
      diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      distancia = diff / 2 / MICROSECDONDS_PER_CM;
      if(distancia < 11){

		pir.watch(function(err, value) {
                if (err) exit();
                buzzer.writeSync(value);
                //console.log('Intruder detected'+ new Date());
                if(value == 1){
			ws.send(distancia+" sensor ativado");
                        console.log("Sem energia "+ new Date());
                }
        	});
      } else {
              ws.send(null);
                console.log(null)
      }

    }
  });
}());

setInterval(function () {
   console.log("energizado")
   //trigger.trigger(10,1);
}, 1000);

ws.on('message', function(message) {
        console.log(message);
});

console.log('new connection');

});

function exit() {
  buzzer.unexport();
  pir.unexport();
  process.exit();
}


