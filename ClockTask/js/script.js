// Do some stuff when page hmtl page is launched
$(document).ready(function () {

  $("#headerTitle").hide(300).show(1500);
  // calling show food menu function
  // showClock();
});

/*----------------------------------------------------------------------------*/
const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();

let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();

console.log("The curent time is: ", hr + ":" + min + ":" + sec);

// let convert hour, minute and seconds into degree to be display on the clockbox
let hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
let minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
let secPosition = sec * 360 / 60;

function runTheClock() {

  hrPosition += 3/360;
  minPosition += 6/60;
  secPosition += 6;
  
  if((hrPosition % 360) >= (9 * 360 / 12) && (hrPosition % 360) <= (9 * 360 / 12) + ((1 / 60) * 360 / 12)) 
    alert("Время отчислений");

  HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
  MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
  SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
  
  if((hrPosition % 360) >= (9 * 360 / 12) && (hrPosition % 360) <= (9 * 360 / 12) + ((1 / 60) * 360 / 12)) 
    alert("Время отчислений");
}

// run runTheClock function every second
var interval = setInterval(runTheClock, 1000);
/*----------------------------------------------------------------------------*/
