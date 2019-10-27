/**
 * Define a controllable timer.
 * Available actions:
 *  - pause, resume, reset
 * 
 * 
 * Inspired from https://stackoverflow.com/questions/16134997/how-to-pause-and-resume-a-javascript-timer
 * 
 * By Ludovic Mouline (https://github.com/lmouline)
 */


let ControllableTimer = (function(){
    return {
        init: function() {
            Reveal.addEventListener('slidechanged', function(event) {
                console.log(event);
            });
            document.addEventListener( 'keydown',  ControllableTimer.keyControl);
        },

        keyControl: function(event) {
            var keyCode = event.keyCode;

            if(keyCode == Timer.keyCode) {
                if(Timer.isRunning) {
                    Timer.pause();
                } else {
                    Timer.start();
                }
            }
        },   
    }
 })();


 Reveal.registerPlugin( 'myPlugin', ControllableTimer ); 

 var Timer = {
    startTime: undefined,
    timePassed: 0,
    isRunning: false,
    timer: undefined,
    keyCode: 84, //t

    start: function() {
        Timer.startTime = new Date().getTime();
        Timer.timer = setInterval(Timer.step, 500);
        Timer.isRunning = true;
    },

    pause: function() {
        Timer.timePassed = Timer.step();
        clearInterval(Timer.timer);
        Timer.isRunning = false;
    },

    step: function() {
        var timerValue = Math.max(0, (new Date().getTime()- Timer.startTime + Timer.timePassed))
        hour = Math.floor(timerValue/3600000),
        min = Math.floor(timerValue/60000)%60,
        min = (min < 10 ? "0" : "") + min,
        seconds = Math.floor(timerValue/1000)%60;
        seconds = (seconds < 10 ? "0" : "")+seconds; 

        console.log(hour+":"+min+":"+seconds);
        return timerValue;
    }
 };