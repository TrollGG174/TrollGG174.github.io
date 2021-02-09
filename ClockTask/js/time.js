var timeNode = document.getElementById('time-node');
 
   function getCurrentTimeString2(dots) {
      var timeString = new Date().toTimeString().replace(/:[0-9]{2,2} .*/, '');
      return dots ? timeString : timeString.replace(/:/, ' ');
   }
 
   setInterval(
      function() { 
         timeNode.innerHTML = getCurrentTimeString2(Math.round(Date.now() / 1000) % 2);
      },
      1000
   );
