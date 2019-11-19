// var countDownDate = new Date("Nov 17, 2019 23:47:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
console.log("whatthefukc");

function startTimer() {
  // console.log("bang")
  var hours = document.getElementById("hours").value;
  var minutes = document.getElementById("minutes").value;
  var countDownDate = new Date();
  console.log(countDownDate)
  // console.log(countDownDate.getMinutes())
  // countDownDate.setHours(countDownDate.getHours() + hours, countDownDate.getMinutes() + minutes)
  // countDownDate.setMinutes()
  countDownDate = new Date(countDownDate.getTime() + (hours * 60 * 60000) + (minutes * 60000))
  console.log(countDownDate)
  // console.log(hours)
  // console.log(minutes)
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date();
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    console.log(countDownDate)
    console.log(now)
    console.log(distance)
  
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    document.getElementById("demo").textContent = hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
}

window.onload = function() {
  // console.log(startTimer)
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit").onclick = sendStart;
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "send_timer") {
        document.getElementById("demo").textContent = request.text;
      }
  }
);

function sendStart() {
  var hours = document.getElementById("hours").value;
  var minutes = document.getElementById("minutes").value;
  chrome.runtime.sendMessage({
    msg: "startFunc",
    hours: hours,
    minutes: minutes
  });
}