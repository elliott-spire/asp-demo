var playpause = document.getElementById('playpause');
playpause.onclick = function() {
	// hide vessel popup
	document.getElementById('vesselPopup').style.display = 'none';
	// play or pause time depending on current state
    if (playpause.className == 'play') {
    	playTime();
    	playpause.className = 'pause';
    } else {
    	pauseTime();
    	playpause.className = 'play';
    }
}

document.getElementById('left').onclick = function() {
	// hide vessel popup
	document.getElementById('vesselPopup').style.display = 'none';
	// go backwards 1 frame if animation is not in progress
	if (window.WMS_Animation == null) {
		iterateBackward();
	}
}

document.getElementById('right').onclick = function() {
	// hide vessel popup
	document.getElementById('vesselPopup').style.display = 'none';
	// go forwards 1 frame if animation is not in progress
	if (window.WMS_Animation == null) {
		iterateForward();
	}
}