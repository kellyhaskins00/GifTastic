// create global variables and array of button characters
var topics = ["mikey mouse", "stitch", "aladdin", "buzz lightyear", "sulley", "tigger"];

var buttonColors = [
	{color: "btn-primary"},
	{color: "btn-success"},
	{color: "btn-danger"}, 
	{color: "btn-info"}
];

var controller = {

    topicButtonClick: () => {
        $("body").on("click", ".topic-button", function () {
            var character = $(this).text();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        character + "&api_key=XSvcJWu1sUUT5b7hb0J36R2vnmpkz04a";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                $('.gif-display').empty();

                //declare JSON output into a results variable
                var results = response.data;

                //console log the results
                console.log(results)

                //loop through results to parse out what we want to display from the api
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $('<div>');
                    gifDiv.addClass('col-4 gif-Div');

                    var rated = $('<p>');
                    rated.addClass('rating');

                    //get the ratiing of each gif to display
                    rated.text("rated: " + results[i].rating);

                    //jQuery variable for gifImages to go into
                    var gifImage = $('<img>')

                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("gif-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("gif-animate", results[i].images.fixed_height.url);
                    gifImage.attr("gif-state", "still");
                    gifImage.addClass('image-gif');

                    gifDiv.prepend(rated);

                    gifDiv.prepend(gifImage);

                    $('.gif-display').append(gifDiv);
            }
            })
    });
},

addTopicToArray: () => {
    $("body").on("click", ".add-button", function() {
        //prevent form from submitting
        event.preventDefault();

        var newTopic = $("#new-topic").val().trim();
        console.log(newTopic);
        topics.push(newTopic);
        $('#new-topic').val("");
        view.displayButtons();
    });
},

playGifs: () => {
    $("body").on("click", ".image-gif", function() {

        var state = $(this).attr("gif-state");
        //if the clicked image's state is still, update its src attribute to what its gif-animate value is
        //then, set the image's state to animate
        //else set src to the still value

        if (state === "still") {
            $(this).attr("src", $(this).attr("gif-animate"));
            $(this).attr("gif-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("gif-still"));
            $(this).attr("gif-state", "still");
        }
    });
    },
};

$(document).ready(function(){

	view.displayButtons();
	controller.topicButtonClick();
	controller.playGifs();
	controller.addTopicToArray();

});

//view object

var view = {

	displayButtons: () => {

		$('.button-display').empty()

		for (var i = 0; i < topics.length; i++) {
			var topicButtons = $('<button>').addClass('topic-button btn').text(topics[i]);
				topicButtonColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
				topicButtons.addClass(topicButtonColor.color);
			$('.button-display').append(topicButtons);
		}

	},

};