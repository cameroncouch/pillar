"use strict";
var ServiceShelf;

function buildShelf() {
    var customShelf = {
        animate: response.animate,
        arrowColor: response.arrowColor,
        courseBorder: response.courseBorder,
        courseColor: response.courseColor,
        fontColor: response.fontColor,
        hasScrollTop: response.hasScrollTop,
        moveable: response.moveable, 
        pillarState: pillarState,
        segmentBorder: response.segmentBorder,
        segments: response.segments,
        segmentColor: response.segmentColor,
        type: response.type,
        xColor: response.xColor
    },
// Setting up markup
    shelf = document.createElement('div'),
    shelfMarkup = customShelf.shelfMarkup ? customShelf.shelfMarkup : "<table id='menu-wrapper'><tbody><tr id='main-menu'></tr></tbody></table>",
    segmentsContainers = [],
    segmentsButtons = [],
    scrollTop = customShelf.hasScrollTop ? document.createElement('button') : undefined,
    closeX = document.createElement('button'),
    expand = document.createElement('button');

    customShelf.segments.forEach(function(segment) { var cell = document.createElement('td'); segmentsContainers.push(cell); });
    customShelf.segments.forEach(function(segment) { var button = document.createElement('button'); segmentsButtons.push(button); });

// Attribute setup
    shelf.setAttribute('id', 'pillar');
    shelf.style.backgroundColor = customShelf.courseColor;
    expand.setAttribute('type', 'button');
    expand.setAttribute('id', 'left-arrow');
    expand.style.color = customShelf.arrowColor;
    expand.innerText = '←';
    scrollTop.setAttribute('type', 'button');
    scrollTop.setAttribute('id', 'right-arrow');
    scrollTop.style.color = customShelf.arrowColor;
    scrollTop.innerText = '↑';
    closeX.setAttribute('type', 'button');
    closeX.setAttribute('id', 'close');
    closeX.style.color = customShelf.xColor;
    closeX.innerText = 'X';
    // Button type for all buttons segments
    segmentsButtons.forEach(function(segment) { segment.setAttribute('type', 'button'); customShelf.segmentColor ? segment.style.backgroundColor = customShelf.segmentColor : '' });
    // Build pillar
    segmentsContainers.forEach(function(segment, idx) { segment.appendChild(segmentsButtons[idx]); });
    shelf.appendChild(expand);
    shelf.insertAdjacentHTML("beforeend", shelfMarkup);
    shelf.appendChild(scrollTop);
    shelf.appendChild(closeX);
    
    var shelfTable = shelf.childNodes[1],
        tableBody = shelfTable.childNodes[0],
        tableRow = tableBody.childNodes[0];
    
    segmentsContainers.forEach(function(segment, idx) { 
        segment.firstChild.innerText = Object.keys(customShelf.segments[idx]); 
        segment.firstChild.style.color = customShelf.fontColor;
        segment.setAttribute('class','segment-container');
        segment.firstChild.setAttribute('class', 'segment');
        tableRow.appendChild(segment); 
    });
    
    expand.addEventListener('click', function () {
        shelfTable.style.display = shelfTable.style.display === 'inline-block' ? 'none' : 'inline-block';
    }, false);
    

    return shelf;
}


var setConfig = setInterval(function() {
    if(response) {
        ServiceShelf = buildShelf();
        ServiceShelf.addEventListener('mousedown', function (evt) {
            pillarState.lifted = true;
            // logic for following the mouse
        }, false);
        ServiceShelf.addEventListener('mouseup', function(evt) {
            // logic for dropping the badge
            pillarState.lifted = false;
        }, false);
        clearInterval(setConfig);
        document.body.appendChild(ServiceShelf);
    }
}, 500);

var pillarState = {
    lifted: false,
    position: 'SE'
}



//move to top function

//mobile browser fix

