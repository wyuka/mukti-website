function showChild(text, Y, id, leftSide) {
	var X, width;
	width = $('#parentNode').width();
    if (leftSide == true) {
    	X = Math.floor(50 + Math.random() * (width / 2 - 260));
	} else {
		X = Math.floor(width / 2 + 30 + Math.random() * (width / 2 - 420));
	}
	$('#childNodes').append('<div class="linkText invisible" id="' + id + '" style="left: ' + X + 'px; top: ' + Y + '%" onclick="console.log(JSON.stringify(currentObject)); clickedOn(\'' + id + '\')">' + text + '</div>');
	var item = $('#' + id);

	var speed = getRandomSpeed();
	setTransSpeed(item, speed + 'ms');
	setTimeout(function() {
		item.removeClass('invisible');
	}, 0)
	setTimeout(function() {
		setTransNormal(item);
	}, speed);
	var leftX = item.position().left;
	console.log(leftX);
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

function getRandomSpeed() {
	return (50 + Math.floor(Math.random() * 950));
}

function clickedOn(child) {
	console.log(child);
	var item = contents[child];
	console.log(JSON.stringify(item));
	currentObject = item;
	eraseChildren();
	eraseParent();
}

function eraseParent() {
	$('#parentNode').css('opacity', 0);
}

function eraseChildren() {
	var maxSpeed = 0;
	$('.linkText').each(function() {
		var speed = getRandomSpeed();
		maxSpeed = Math.max(maxSpeed, speed);
		setTransSpeed($(this), speed + 'ms');
		$(this).css('opacity', 0);
	});
	console.log(maxSpeed);
	setTimeout(removeChildren, maxSpeed + 1);
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

function setTransSpeed(item, speed) {
	item.css('transition', 'opacity ' + speed);
	item.css('-moz-transition', 'opacity ' + speed);
	item.css('-webkit-transition', 'opacity ' + speed);
	item.css('-o-transition', 'opacity ' + speed);
}

function setTransNormal(item) {
	item.css('transition', 'text-shadow 500ms, opacity 500ms');
	item.css('-moz-transition', 'text-shadow 500ms, opacity 500ms');
	item.css('-webkit-transition', 'text-shadow 500ms, opacity 500ms');
	item.css('-o-transition', 'text-shadow 500ms, opacity 500ms');
}
