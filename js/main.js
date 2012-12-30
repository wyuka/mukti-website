function showChild(text, Y, id, leftSide) {
	var X, width;
	width = $('#parentNode').width();
    if (leftSide == true) {
    	X = Math.floor(50 + Math.random() * (width / 2 - 260));
	} else {
		X = Math.floor(width / 2 + 30 + Math.random() * (width / 2 - 420));
	}
	$('#childNodes').append('<div class="linkText invisible" id="' + id + '" style="left: ' + X + 'px; top: ' + Y + '%"">' + text + '</div>');
	var item = $('#' + id);

	item.click( function() {
		clickedOn(id);
	});

	setTimeout(function() {
		item.removeClass('invisible');
	}, 0)
	var leftX = item.position().left;
	function animateLink(link, right) {
		if (right == true) {
			link.animate({"left": "+=25px"}, 2000 + Math.floor(Math.random() * 2000), function() { animateLink(link, false); });
		} else {
			link.animate({"left": "-=25px"}, 2000 + Math.floor(Math.random() * 2000), function() { animateLink(link, true); });
		}
	}
	if (Math.random() > 0.5) {
		animateLink(item, true);
	} else {
		animateLink(item, false);
	}
}

var currentObject;

function drawChildren() {
	var item = currentObject;
	var onLeft = false;
	for (childKey in item.children) {
		childText = contents[childKey].text;
		childLine = item.children[childKey];
		if (onLeft == true)
			onLeft = false;
		else
			onLeft = true;
		showChild(childText, childLine, childKey, onLeft);
	}
}

function clickedOn(child) {
	console.log(child);
	var item = contents[child];
	currentObject = item;
	eraseChildren();
	eraseParent();
}

function eraseParent() {
	$('#parentNode').css('opacity', 0);
}

function eraseChildren() {
	$('.linkText').css('opacity', 0);
	setTimeout(removeChildren, 500);
}

function drawParent() {
	parentNode = $('#parentNode');
	parentNode.html(currentObject.text);
	parentNode.css('opacity', 1);
}
function removeChildren() {
	$('.linkText').remove();
	drawParent();
	drawChildren();
}

function bootstrap() {
	$(document).ready( function() {
    	currentObject = contents['mukti'];
		drawChildren();
        setTimeout(function (){
        	$('#parentNode').removeClass('invisible');
        }, 10);
    });
}
