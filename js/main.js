function showChild(text, Y, id, leftSide) {
	var X, width;
	width = $('#parentNode').width();
    if (leftSide == true) {
    	X = Math.floor(50 + Math.random() * (width / 2 - 260));
	} else {
		X = Math.floor(width / 2 + 60 + Math.random() * (width / 2 - 420));
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

var currentObject, contents;

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
	$('#parent').addClass('invisible');
}

function eraseChildren() {
	$('.linkText').css('opacity', 0);
	setTimeout(removeChildren, 500);
}

function drawParent() {
	parentNode = $('#parentNode');
	parentNode.html(currentObject.text);

	subParent = $('#subparent');
	if (currentObject.subtext != null) {
		subParent.html(currentObject.subtext);
	}
	else {
		subParent.html('');
	}
	$("#parent").removeClass('invisible');
}
function removeChildren() {
	$('.linkText').remove();
	console.log(currentObject.contents);
	if (currentObject.contents == null || currentObject.contents == '') {
		drawParent();
		drawChildren();
	}
	else {
		$('#contentTitle').html(currentObject.text);
		$('#contentBody').html(currentObject.contents);
		$('#contents').show();
		$('#contentBodyWrapper').mCustomScrollbar('update');
	}
}

function bootstrap() {
	$(window).load( function() {
		$.getJSON('js/contents.json', function(data) {
    		contents = data;
    		currentObject = contents['mukti'];
    		drawParent();
			drawChildren();
    	});
    	$("#contentBodyWrapper").mCustomScrollbar({advanced: {autoScrollOnFocus: true}, autoDraggerLength:true});
    	$("#contents").hide();
    });
}
