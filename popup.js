window.onload = function() {
  // console.log(startTimer)
    document.getElementById("submit").onclick = sendStart;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request)
    if(request.msg == "send_timer") {
      document.getElementById("demo").innerHTML = request.timer;
      if(request.timer == "EXPIRED") {
        document.getElementById("submit").disabled = false;
      }
    }
  }
);

function sendStart() {
  document.getElementById("submit").disabled = true;
  var hours = document.getElementById("hours").value;
  var minutes = document.getElementById("minutes").value;
  chrome.runtime.sendMessage({
    msg: "startFunc",
    hours: hours,
    minutes: minutes
  });
}