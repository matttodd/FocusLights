var badSites = ["reddit.com", "youtube.com", "twitch.tv"];
var host = "http://10.0.0.98";
var url = host + "/api/hU6-hgDMjApmZQk0kDUz4T5KKr3wl0-GI-W4IbEC/lights/1/state";
var url2 = host + "/api/hU6-hgDMjApmZQk0kDUz4T5KKr3wl0-GI-W4IbEC/lights/4/state";

chrome.browserAction.onClicked.addListener(buttonClicked);

async function includingBadSite() {
    await chrome.tabs.query({}, function (tabs) {
        for (tab in tabs) {
            for(badSite in badSites) {
                // console.log(badSites[badSite]);
                // console.log(tabs[tab].url);
                // console.log(tabs[tab].url.includes(badSites[badSite]));
                if(tabs[tab].url.includes(badSites[badSite])) {
                    console.log(true)
                    return true;
                }
            }
        }
        console.log(false)
        return false;
    });
}

function buttonClicked(_) {
    freakOut();
}

async function freakOut() {
    console.log("im alive")
    while(await includingBadSite()) {
        turnLights();
    }
}

function turnLights() {
    var xhttp = new XMLHttpRequest();
    var body = {"hue": Math.floor(Math.random() * 65535.0)}
    console.log(body)
    xhttp.open("PUT", url, true);
    xhttp.open("PUT", url2, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(body));
    // var response = JSON.parse(xhttp.responseText);
}

function turnOff() {
    var xhttp = new XMLHttpRequest();
    var body = {"on": false}
    console.log(body)
    xhttp.open("PUT", url, true);
    xhttp.open("PUT", url2, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(body));
    // var response = JSON.parse(xhttp.responseText);
}

//10.0.0.98
//"username": "hU6-hgDMjApmZQk0kDUz4T5KKr3wl0-GI-W4IbEC"
//1,4

function startTimer(hours, minutes) {
    // console.log("bang")
    // var hours = document.getElementById("hours").value;
    // var minutes = document.getElementById("minutes").value;
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
      var text = hours + "h "
      + minutes + "m " + seconds + "s ";
    
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        text = "EXPIRED";
      }
      chrome.runtime.sendMessage({
          msg: "send_timer",
          timer: text
      });
    }, 1000);
  }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if(request.msg == "startFunc") {
            startTimer(request.hours, request.minutes);
        }
    }
);