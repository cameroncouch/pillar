var pillar = document.getElementById('pillar');
var leftArrow = document.getElementById('left-arrow');
var menu = document.getElementById('menu-wrapper');
var dropNodes = document.getElementsByClassName('drop-node');
var overlay = document.getElementById('overlay');

var pillarState = {
    lifted: false,
    hasMoved: false,
    position: 'SE'
}

for (var i = 0; i < dropNodes.length; i++) {
    dropNodes[i].addEventListener('dragover', function(evt) {
        evt.preventDefault();
    }, false);
    dropNodes[i].addEventListener('drop', function(evt) {
        evt.preventDefault();
        var element = evt.dataTransfer.getData('text');
        if(element === "pillar") {
            evt.target.appendChild(pillar);
            pillarState.hasMoved = true;
            pillarState.position = evt.target.id;
            console.log(pillarState);
        }
    }, false);
}

leftArrow.addEventListener('click', function () {
    menu.style.display = menu.style.display === 'inline-block' ? 'none' : 'inline-block';
}, false);

pillar.addEventListener('dragstart', function (evt) {
    pillarState.lifted = !pillarState.lifted;
    for(var i = 0; i < dropNodes.length; i++) {
        if(dropNodes[i].className.search('active') === -1) {
            dropNodes[i].style.display = 'inline-block';
        }
    }
    evt.dataTransfer.setData('text', pillar.id);
    overlay.style.backgroundColor = "rgba(0,0,0,.1)";
}, false);

pillar.addEventListener('dragend', function (evt) {
    pillarState.lifted = !pillarState.lifted;
    // for(var i = 0; i < dropNodes.length; i++) {
    //     if(dropNodes[i].className.search('active') === -1) {
    //         dropNodes[i].style.display = 'none';
    //     }
    // }
    overlay.style.background = "transparent";
}, false);
