function showChild(text, line, id, leftSide) {
	var X;
    if (leftSide == true) {
    	X = 2 + Math.floor(Math.random() * 43);
	} else {
		X = 45 + Math.floor(Math.random() * 35);
	}
	var Y = line * 10;
	$('#childNodes').append('<div class="linkText" id="' + id + '" style="left: ' + X + '%; top: ' + Y + '%">' + text + '</div>');
	var item = $('#' + id);
	var leftX = item.position().left;
	console.log(leftX);
	function animateLink(link, right) {
		if (right == true) {
			link.animate({"left": "+=2%"}, 2000 + Math.floor(Math.random() * 2000), function() { animateLink(link, false); });
		} else {
			link.animate({"left": "-=2%"}, 2000 + Math.floor(Math.random() * 2000), function() { animateLink(link, true); });
		}
	}
	if (Math.random() > 0.5) {
		animateLink(item, true);
	} else {
		animateLink(item, false);
	}
}