"use strict";
//when the json has been returned as response, store response in a variable within shelf.js
var waitForResponse = setInterval(
  function() {
    if(jsonResponse) {
      clearInterval(waitForResponse);
      if(window.sessionStorage.getItem('hideSvcShelf') == true || document.cookie.indexOf('hideSvcShelf') > -1) {
          return;
      }
      buildShelf(jsonResponse);
    } else { console.log('Waiting for response...'); }
  }, 10);

  function buildShelf(customizations) {

    var customShelf = {
      animate: customizations.animate,
      leftArrowColor: customizations.leftArrowColor,
      rightArrowColor: customizations.rightArrowColor,
      courseBorder: customizations.courseBorder,
      courseColor: customizations.courseColor,
      fontFamily: customizations.fontFamily,
      fontColor: customizations.fontColor,
      hasScrollTop: customizations.hasScrollTop,
      moveable: customizations.moveable, 
      shelfState: {
        lifted: false
      },
      segmentBorder: customizations.segmentBorder,
      segments: customizations.segments,
      segmentColor: customizations.segmentColor,
      sessionStorage: customizations.sessionStorage,
      startingPosition: customizations.startingPosition,
      type: customizations.type,
      xColor: customizations.xColor,
      width: 0,
      height: 0,
    },
// Setting up markup
    // googleFont = customShelf['fontFamily']['google'] ? customShelf['fontFamily']['name'] : undefined;
    // if(googleFont) {
    //     document.head.append('<link href="https://fonts.googleapis.com/css2?family=' + googleFont + '&display=swap" rel="stylesheet">');
    // }
    shelf = document.createElement('div'),
    shelfMarkup = customShelf.shelfMarkup ? customShelf.shelfMarkup : "<table id='menu-wrapper'><tbody><tr id='main-menu'></tr></tbody></table>",
    segmentsContainers = [],
    segmentsButtons = [],
    scrollTopArrow = customShelf.hasScrollTop ? document.createElement('button') : undefined,
    closeX = document.createElement('button'),
    expand = document.createElement('button');

    customShelf.segments.forEach(function(segment) { var cell = document.createElement('td'); segmentsContainers.push(cell); });
    customShelf.segments.forEach(function(segment) { var button = document.createElement('button'); segmentsButtons.push(button); });

// Attribute setup
    shelf.setAttribute('id', 'shelf');
    shelf.setAttribute('class', customShelf.startingPosition);
    shelf.style.background = customShelf.courseColor;
    expand.setAttribute('type', 'button');
    expand.setAttribute('id', 'left-arrow');
    expand.style.color = customShelf.leftArrowColor;
    expand.innerText = '⠗';
    scrollTopArrow.setAttribute('type', 'button');
    scrollTopArrow.setAttribute('id', 'right-arrow');
    scrollTopArrow.style.color = customShelf.rightArrowColor;
    scrollTopArrow.innerText = '⠗';
    closeX.setAttribute('type', 'button');
    closeX.setAttribute('id', 'close');
    closeX.style.color = customShelf.xColor;
    closeX.innerText = '✕';
    // Button type for all buttons segments
    segmentsButtons.forEach(function(segment) { segment.setAttribute('type', 'button'); customShelf.segmentColor ? segment.style.backgroundColor = customShelf.segmentColor : '' });
    // Build shelf
    segmentsContainers.forEach(function(segment, idx) { segment.appendChild(segmentsButtons[idx]); });
    shelf.appendChild(expand);
    shelf.insertAdjacentHTML("beforeend", shelfMarkup);
    shelf.appendChild(scrollTopArrow);
    shelf.appendChild(closeX);
    
    var shelfTable = shelf.childNodes[1],
        tableBody = shelfTable.childNodes[0],
        tableRow = tableBody.childNodes[0];
    
    // apply customizations to each drawer
    segmentsContainers.forEach(function(segment, idx) { 
        segment.firstChild.innerText = Object.keys(customShelf.segments[idx]); 
        segment.firstChild.style.color = customShelf.fontColor;
        segment.firstChild.style.fontFamily = customShelf.fontFamily.name;
        segment.setAttribute('class','segment-container');
        segment.firstChild.setAttribute('class', 'segment');
        tableRow.appendChild(segment); 
    });
    
    expand.addEventListener('click', function (evt) {
        evt.stopPropagation();
        shelfTable.style.display = shelfTable.style.display === 'inline-block' ? 'none' : 'inline-block';
    }, false);

    expand.addEventListener('touchstart', function (evt) {
        shelfTable.style.display = shelfTable.style.display === 'inline-block' ? 'none' : 'inline-block';

    }, false);

    window.addEventListener('scroll', function (evt) {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if(scrollTop > 0) {
            scrollTopArrow.classList.add('right-arrow-scrolled');
        }
        if(scrollTop == 0) {
            scrollTopArrow.classList.value.includes('right-arrow-scrolled') ? scrollTopArrow.classList.remove('right-arrow-scrolled') : '';
        }
    }, false);
    
    scrollTopArrow.addEventListener('click', function(evt) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, false);

    scrollTopArrow.addEventListener('touchstart', function(evt) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        evt.stopPropagation();
    }, false);

    closeX.addEventListener('click', function(evt) {
        customShelf.shelfState.hidden = true;
        shelf.classList.add('hidden-by-user');
        if(customShelf.sessionStorage) {
            try {
                window.sessionStorage.setItem('hideSvcShelf', true);
            } catch (e) { console.warn(e); }
        } else {
            document.cookie = 'hideSvcShelf=true;SameSite=strict;Secure;max-age=60'; // test value - should be configurable in JSON
        }
    }, false);

    shelf.addEventListener('mousedown', function (evt) {
        evt.stopPropagation();
        customShelf.shelfState.lifted = true;
        this.style.cursor = 'grabbing';
    }, false);

    shelf.addEventListener('touchstart', function (evt) {
        customShelf.shelfState.lifted = true;
        this.style.cursor = 'grabbing';
    }, false);

    shelf.addEventListener('mouseup', function(evt) {
        customShelf.shelfState.lifted = false;
        this.style.cursor = 'grab';
    }, false);

    shelf.addEventListener('touchend', function(evt) {
        customShelf.shelfState.lifted = false;
        this.style.cursor = 'grab';
    }, false);

    window.addEventListener('mousemove', function(e){
    if(customShelf.shelfState.lifted) {
        if(e.screenX < window.innerWidth - customShelf.width * .62 && e.screenX > 0 + customShelf.width * .55) {
            this.style.left = e.screenX - 50 +'px';
        }
        if(e.screenY < window.innerHeight && e.screenY > 0 + customShelf.height * 2) {
            this.style.top = e.screenY - customShelf.height * 2 + 'px';
        }
    }
    }.bind(shelf), false);

    window.addEventListener('touchmove', function(e){
    if(customShelf.shelfState.lifted) {
        this.style.left = e.touches[0].clientX - 50 +'px';
        this.style.top = e.touches[0].clientY - 25 +'px';
    }
    }.bind(shelf), false);

    document.body.insertBefore(shelf, document.body.firstChild);
    customShelf.width = shelf.offsetWidth;
    customShelf.height = shelf.offsetHeight;
  }