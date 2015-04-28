var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0'; // Put your API key here
var game;
var i = 0;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
 
    for(i = 0; i <= 8; i++){
    	var picture = results[i].image.medium_url;
    	var deck = results[i].deck;
    	$("#returnGame").append("<div class='container well col-md-4' id='mainWindow'><div class='hidden-sm hidden-xs' id='gameImage'><img src='" + picture + "'/></div><div class='well outer text-center' id='gameTitle'><p class='lead'>" + results[i].name + "</p></div><p id='textHidden'>" + results[i].deck + "</p><button class='btn-sm btn-success' id='removeGame'>Remove Game</button></div>");
	}
}

$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		event.preventDefault();
		game = $("#searchField").val();
		search(game);
		
		
	});
	$("#returnGame").on("click", "#removeGame", function(){
		$(this).parent().remove();
	});

	// Start the search here!
	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
