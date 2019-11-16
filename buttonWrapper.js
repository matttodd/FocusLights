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
    window.setInterval(freakOut, 1000);
}

function freakOut() {
    // var temp = window.setInterval(turnLights, 1000);
    // window.clearInterval(temp);
    if(includingBadSite()) {
        console.log("PLEASE");
        window.setInterval(turnLights, 1000);
    } else {
        turnOff();
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