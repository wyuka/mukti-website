var slowTransSpeed = 1000;

function showChild(text, Y, id, leftSide) {
	var X;
    if (leftSide == true) {
    	X = 2 + Math.floor(Math.random() * 43);
	} else {
		X = 45 + Math.floor(Math.random() * 35);
	}
	$('#childNodes').append('<div class="linkText slowTrans invisible" id="' + id + '" style="left: ' + X + '%; top: ' + Y + '%" onclick="console.log(JSON.stringify(currentObject)); clickedOn(\'' + id + '\')">' + text + '</div>');
	var item = $('#' + id);
	setTimeout(function() {
		item.removeClass('invisible');
	}, 0)
	setTimeout(function() {
		item.removeClass('slowTrans');
		item.addClass('fastTrans');
	}, slowTransSpeed);
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

var muktiObject, currentObject;

function drawChildren () {
	var object = currentObject;
	for (var childNum = 0; childNum < object.children.length; childNum++) {
		childText = object.children[childNum].text;
		var onLeft, childLine;
		if (childNum % 2)
			onLeft = true;
		else
			onLeft = false;
		childLine = object.children[childNum].line;

		showChild(childText, childLine, childNum, onLeft);
	}
}

function clickedOn(child) {
	console.log(child);
	var item = currentObject.children[child];
	console.log(JSON.stringify(item));
	currentObject = item;
	eraseParent();
	eraseChildren();
}

function eraseParent() {
	$('#parentNode').css('opacity', 0);
	setTimeout(drawParent, slowTransSpeed);
}
function eraseChildren() {
	$('.linkText').removeClass('fastTrans');
	$('.linkText').addClass('slowTrans');
	$('.linkText').css('opacity', 0);
	setTimeout(removeChildren, slowTransSpeed);
	
}

function drawParent() {
	parentNode = $('#parentNode');
	parentNode.html(currentObject.text);
	parentNode.css('opacity', 1);
}
function removeChildren() {
	$('.linkText').remove();
	drawChildren();
}
