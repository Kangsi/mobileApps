function add() {// Retrieve the entered form data
	var episode = $('[name="addEpisode"]').val();
	// Fetch the existing objects
	var episodes = getEpisodes();
	// Push the new item into the existing list
	for (var i = 0; i < episode; i++) {
		episodes.push({
			haveWatched : false
		});
	};
	// Store the new list
	saveEpisodes(episodes);
	// Empty the form data
	$('[name="addEpisode"]').val('');
	// Reload the page to show the new objects
	homepage();
}

function getEpisodes() {// See if objects is inside localStorage
	var title = $('title').text();
	if (title == "Running man") {
		if (localStorage.getItem("runningmanEpisodes")) {// If yes, then load the objects
			episodes = JSON.parse(localStorage.getItem("runningmanEpisodes"));
		} else {// Make a new array of objects
			episodes = new Array();
		}
	} else if (title == "Game of Thrones") {
		if (localStorage.getItem("gameofthronesEpisodes")) {// If yes, then load the objects
			episodes = JSON.parse(localStorage.getItem("gameofthronesEpisodes"));
		} else {// Make a new array of objects
			episodes = new Array();
		}
	} else if (title == "How I Met Your Mother") {
		if (localStorage.getItem("howimetyourmotherEpisodes")) {// If yes, then load the objects
			episodes = JSON.parse(localStorage.getItem("howimetyourmotherEpisodes"));
		} else {// Make a new array of objects
			episodes = new Array();
		}
	}else {
		episodes = new Array();
	}	
	return episodes;
}

function saveEpisodes(episodes) {// Save the list into localStorage
	var title = $('title').text();
	if (title == "Running man")
		localStorage.setItem("runningmanEpisodes", JSON.stringify(episodes));
	else if (title == "Game of Thrones")
		localStorage.setItem("gameofthronesEpisodes", JSON.stringify(episodes));
	else if (title == "How I Met Your Mother")
		localStorage.setItem("howimetyourmotherEpisodes", JSON.stringify(episodes));
		
}

function homepage() {// Fetch the existing objects
	episodes = getEpisodes();
	// Clear the list
	$('#episodes').find('li').remove();
	// Add every object to the objects list
	$.each(episodes, function(index, item) {
		if (episodes[index].haveWatched)
			element = '<li><input data-iconpos="right" id="' + (index + 1) + '" type="checkbox" checked onclick="changeWatched(id,checked);" ><label for="' + (index + 1) + '">Episode ' + (index + 1) + '</label></li>';
		else
			element = '<li><input data-iconpos="right" id="' + (index + 1) + '" type="checkbox" onclick="changeWatched(id,checked);" ><label for="' + (index + 1) + '">Episode ' + (index + 1) + '</label></li>';
		$('#episodes').append(element);

	});
	$('#episodes').listview();
	$('#episodes').listview("refresh");
}

function changeWatched(id, checked) {
	episodes[id - 1].haveWatched = checked;
	saveEpisodes(episodes);
}

function deleteEpisode() {
	// Retrieve the entered form data
	var episode = $('[name="deleteEpisode"]').val();
	// Fetch the existing objects
	var episodes = getEpisodes();
	// Change the objects length
	if (episode > episodes.length) episodes.length = 0;
	else episodes.length -= episode;
	// Store the new list
	saveEpisodes(episodes);
	// Empty the form data
	$('[name="deleteEpisode"]').val('');
	// Reload the page to show the new objects
	homepage();
}


$(document).on('pageshow', function()
{
	homepage();
});
		

