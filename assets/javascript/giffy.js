var topic = ["wolf", "eagle", "shark", "deer", "sparrow", "dolphin"];

function displayGiphy() {
	var topic = $(this).attr("chooseTopic");
	var query = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {
		console.log(response);
		var imageUrl = response.data[0].images.original.webp;
		console.log(imageUrl);

		var topicImage = $("<img>");

		topicImage.attr("src", imageUrl);
		topicImage.attr("alt", "none");

		$("#images").prepend(topicImage);

	})
}

function makeBtn() {
	$("#displayBtns").empty();
	console.log("number of topics" + topic.length);

	for (var i = 0; i < topic.length; i++) {
		var btn = $("<button>");

		btn.addClass("topics");

		btn.attr("data-name", topic[i]);

		btn.text(topic[i]);

		$("#displayBtns").append(btn);
	}
	console.log(btn);
}

$("#addTopic").on("click", function(event) {
	event.preventDefault();

	var topics = $("#chooseTopic").val().trim();

	topic.push(topics);

	makeBtn();
});

$(document).on("click", ".topics", displayGiphy);

makeBtn();