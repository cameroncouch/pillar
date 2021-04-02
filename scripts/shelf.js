"use strict";
//when the json has been returned as response, store response in a variable within shelf.js
var waitForResponse = setInterval(
  function() {
    if(response) {
      clearInterval(waitForResponse);
      buildShelf(response);
    } else { console.log('Waiting for response...'); }
  }, 10);

  function buildShelf(customizations) {

    var customShelf = {
      animate: customizations.animate,
      arrowColor: customizations.arrowColor,
      courseBorder: customizations.courseBorder,
      courseColor: customizations.courseColor,
      fontColor: customizations.fontColor,
      hasScrollTop: customizations.hasScrollTop,
      moveable: customizations.moveable, 
      shelfState: {
        lifted: false
      },
      segmentBorder: customizations.segmentBorder,
      segments: customizations.segments,
      segmentColor: customizations.segmentColor,
      type: customizations.type,
      xColor: customizations.xColor
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
    shelf.setAttribute('id', 'shelf');
    shelf.style.background = customShelf.courseColor;
    expand.setAttribute('type', 'button');
    expand.setAttribute('id', 'left-arrow');
    expand.style.color = customShelf.arrowColor;
    expand.innerText = '⠗';
    scrollTop.setAttribute('type', 'button');
    scrollTop.setAttribute('id', 'right-arrow');
    scrollTop.style.color = customShelf.arrowColor;
    scrollTop.innerText = '⠗';
    closeX.setAttribute('type', 'button');
    closeX.setAttribute('id', 'close');
    closeX.style.color = customShelf.xColor;
    closeX.innerText = 'X';
    // Button type for all buttons segments
    segmentsButtons.forEach(function(segment) { segment.setAttribute('type', 'button'); customShelf.segmentColor ? segment.style.backgroundColor = customShelf.segmentColor : '' });
    // Build shelf
    segmentsContainers.forEach(function(segment, idx) { segment.appendChild(segmentsButtons[idx]); });
    shelf.appendChild(expand);
    shelf.insertAdjacentHTML("beforeend", shelfMarkup);
    shelf.appendChild(scrollTop);
    shelf.appendChild(closeX);
    
    var shelfTable = shelf.childNodes[1],
        tableBody = shelfTable.childNodes[0],
        tableRow = tableBody.childNodes[0];
    
    // apply customizations to each drawer
    segmentsContainers.forEach(function(segment, idx) { 
        segment.firstChild.innerText = Object.keys(customShelf.segments[idx]); 
        segment.firstChild.style.color = customShelf.fontColor;
        segment.setAttribute('class','segment-container');
        segment.firstChild.setAttribute('class', 'segment');
        tableRow.appendChild(segment); 
    });
    
    expand.addEventListener('click', function (evt) {
        shelfTable.style.display = shelfTable.style.display === 'inline-block' ? 'none' : 'inline-block';
    }, false);
    
    shelf.addEventListener('mousedown', function (evt) {
        customShelf.shelfState.lifted = true;
        this.style.cursor = 'grabbing';
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0px 0px 1px 1px rgba(0,0,0,1)';
    }, true);
    shelf.addEventListener('mouseup', function(evt) {
        customShelf.shelfState.lifted = false;
        this.style.cursor = 'grab';
        this.style.boxShadow = '';
        this.style.transform = '';
    }, true);
        // registers 'mousemove' event to body
    window.addEventListener('mousemove', function(e){
    if(customShelf.shelfState.lifted) {
        console.log(e.screenX, e.screenY);
        this.style.left = e.screenX - 80 +'px';
        this.style.top = e.screenY - 80 +'px';
    }
    }.bind(shelf), true);
    document.body.appendChild(shelf);
  }