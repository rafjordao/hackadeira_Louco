
var Gpio = require('pigpio').Gpio,
  trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
  echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

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
      console.log(distancia)
      if(distancia < 11){
              ws.send(0);
		console.log(distancia)
      } else {
              ws.send(1);
		console.log(null)
      }

    }
  });
}())


// Trigger a distance measurement once per second
setInterval(function () {
   console.log("trigger")
   trigger.trigger(10,1);
}, 1000);

ws.on('message', function(message) {
	console.log(message);
});

console.log('new connection');

});
