//Document load
$(document).ready(function() {

//Array of Studio Ghibli characters
var gChar = ["Catbus", "Totoro", "Kaonashi", "Wizard Howl", "Ponyo", "Sosuke", "Chihiro Ogino","Calcifer","Yubaba", "Ashitaka", "Sophie Hatter","Radish Spirit", "Ghibli Cat Returns", "Granmamare",  "Kakashi no Kabu", "Dragon Haku", "Kawa no Kami", "Mononoke"];	

//DISPLAY BUTTONS
//Function that (1)iterates through the array, (2)creates a space
//for buttons, (3)creates a button for each array item
//(4)adds classes, (5)stores/adds button names (6)appends buttons
function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < gChar.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("ghibli");
		gifButton.addClass("btn btn-primary");
		gifButton.attr("data-name", gChar[i]);
		gifButton.text(gChar[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

//ADD NEW BUTTON
//Function with (1)listener for Submit button click, 
//(2)takes in field input,
//(3)pushes as new button if text submission is not empty
function addNewButton() {
	$("#addGif").on("click", function() {
		var ghibli = $("#gCharInput").val().trim();
		if (ghibli == ""){  //if blank on Submit
			return false; 
		}
		gChar.push(ghibli);
		displayGifButtons();
		return false;
	});
}

//REMOVE ADDED BUTTON
//Function with (1)listner for Remove button selection,
//(2) pop method to remove last added button from 
//displayGifButtons()
function removeLastButton() {
	$("removeGif").on("click", function() {
		gChar.pop(ghibli);
		displayGifButtons();
		return false;
	});
}

//DISPLAY GIFS USING GIPHY API
//(1)Grabs the data-name from selected button (2)URL
//and AJAX query to get GIF (3)response handling
function displayGifs() {
	var ghibli = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ghibli + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=G";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		var results = response.data;
		if (results == "") {
			alert("No GIF found"); //Message if no GIF
		}
		for (var i = 0; i<results.length; i++) {
			var gifDiv = $("<div1>");
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			var gifImage = $("<img>"); //Creates image element
			gifImage.attr("src", results[i] .images.fixed_height_small_still.url); //Grabs still, small image
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); //Adds still attr
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url); //Adds animate attr
			gifImage.attr("data-state", "still"); //Defaults to still
			gifImage.addClass("image");
			gifDiv.append(gifImage); //Adds gif to gifDiv as still with animated stored
			gifDiv.append(gifRating); //Appends rating
			$("#gifsView").prepend(gifDiv);
		}
	});
}

//CALL FUNCTIONS
displayGifButtons();
addNewButton();
removeLastButton();

//LISTENERS FOR IMAGE CLICK: STILL & ANIMATE TOGGLE
$(document).on("click", ".ghibli", displayGifs);
$(document).on("click", ".image", function(){
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}
	if (state == 'animate') {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}else {
		$(this).attr('src', $(this),data('still'));
		$(this).attr('data-state', 'still');
	}
});

//Script End
});