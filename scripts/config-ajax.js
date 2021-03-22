"use strict";

var response;
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(e) {
    if(this.readyState == 4 && this.status == 200) {
        response = JSON.parse(this.response);
    }
}

xhttp.open('GET', '../configuration.json', true);
xhttp.send();