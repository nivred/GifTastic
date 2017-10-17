$(document).ready(function() {

	var topic = ["wolf", "eagle", "shark", "deer", "sparrow", "dolphin"];
	function displayGiphy() {
		$("#images").empty();

		var topic = $(this).attr("data-name");
		// var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OgVDazF54ZOYgwxGk7JuTKttqFr4FAPb&q=q&limit=25&offset=10&rating=PG&lang=en"+topic
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			
			console.log('response ' + response);

			console.log('response.data ' + response.data);
			
			for (var i = 0; i < response.data.length; i++) {
				// var imageUrl = response.data[i].images.original.webp; //webp;

				var gifDiv = $("<div>");
				gifDiv.addClass("gif");
				var imageRating = response.data[i].rating;
				var imageUrl = response.data[i].images.fixed_width_still.url; //webp;

				console.log('rating ' + imageRating);
				console.log('imageUrl ' + imageUrl);

				var topicRating = $("<p>");
				topicRating.addClass("rating");
				// topicRating.css("font-size", "14px");
				topicRating.text("Rated " + imageRating);

				var topicImage = $("<img>");
				topicImage.attr("src", imageUrl);
				topicImage.attr("alt", topic);

            	gifDiv.prepend(topicImage);
				gifDiv.prepend(topicRating);

				$("#images").prepend(gifDiv);
			}
		})
	}

	function makeBtn() {
		$("#displayBtns").empty();
		
		console.log("number of topics " + topic.length);

		for (var i = 0; i < topic.length; i++) {
			var btn = $("<button>");
			btn.addClass("topics");
			btn.attr("data-name", topic[i]);
			btn.text(topic[i]);
			$("#displayBtns").append(btn);
		}
		console.log('btn ' + btn);
	}


	$("#addTopic").on("click", function(event) {
		//	stops browser from leaving the page
		event.preventDefault();
		var topics = $("#chooseTopic").val().trim();
		topic.push(topics);
		makeBtn();
		$("#chooseTopic").val("");
	});




	$(".gif").on("click", function() {
    	var state = $(this).attr("data-state");
    	if (state === "still") {
    		$(this).attr("src", $(this).attr("data-animate"));
    		$(this).attr("data-state", "animate");
    } else {
    		$(this).attr("src", $(this).attr("data-still"));
    		$(this).attr("data-state", "still");
    	}
    });




	$(document).on("click", ".topics", displayGiphy);

	makeBtn();
});