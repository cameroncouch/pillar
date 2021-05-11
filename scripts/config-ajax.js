"use strict";

// var response;
// var xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function(e) {
//     if(this.readyState == 4 && this.status == 200) {
//         response = JSON.parse(this.response);
//     }
// }

// xhttp.open('GET', '../configuration.json', true);
// xhttp.send();

var jsonResponse;

try {
    var response = fetch('../configuration.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network Error');
        })
        .then((json) => {
            jsonResponse = json;
        })
} catch (error) {
    // Enter your error handling here
}