function add() {// Retrieve the entered form data
	var episode = $('[name="episode"]').val();
	// Fetch the existing objects
	var episodes= getEpisodes();
	// Push the new item into the existing list
	for (var i=0; i < episode; i++) {
	  	episodes.push({
		haveWatched:false
	});
	};
	// Store the new list
	saveEpisodes(episodes);
	// Reload the page to show the new objects
	window.location.reload();
}

function getEpisodes() {// See if objects is inside localStorage
	if (localStorage.getItem("episodes")) {// If yes, then load the objects
		episodes = JSON.parse(localStorage.getItem("episodes"));
	} else {// Make a new array of objects
		episodes = new Array();
	}
	return episodes;
}

function saveEpisodes(episodes) {// Save the list into localStorage
	localStorage.setItem("episodes", JSON.stringify(episodes));
}

function homepage() {// Fetch the existing objects
	episodes = getEpisodes();
	// Clear the list
	$('#episodes').find('li').remove();
	// Add every object to the objects list
	$.each(episodes, function(index, item) {
		if (episodes[index].haveWatched) element = '<li><input data-iconpos="right" name=checkbox-"'+ (index+1) + '" id="' + (index+1) + '"type="checkbox" checked onclick="changeWatched(id,checked);" ><label for="' + (index+1) + '">Episode ' + (index+1) + '</label></li>';
		else if (!episodes[index].haveWatched) element = '<li><input data-iconpos="right" name=checkbox-"'+ (index+1) + '" id="' + (index+1) + '"type="checkbox" onclick="changeWatched(id,checked);" ><label for="' + (index+1) + '">Episode ' + (index+1) + '</label></li>';
		$('#episodes').append(element);

	});
	$('#episodes').listview();
	$('#episodes').listview("refresh");
}

function changeWatched(id, checked)
{
	episodes[id-1].haveWatched = checked;
 	saveEpisodes(episodes);
}

$(document).on('pagebeforeshow', '#running-man', function(event) {
	homepage();
});

