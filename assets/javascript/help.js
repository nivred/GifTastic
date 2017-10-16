var topics = [];
var clearButtonContainer = function() {
	$("#myBtnContainer").empty();
}
var clearGifContainer = function() {
	$("#myGiphyContainer").empty();
}

$(document).on("click","#mySubmit", function(event){
	event.preventDefault();
	
	var tempSearchValue = $("#mySearch").val().trim();
	if (topics.indexOf(tempSearchValue) === -1) {	
		clearButtonContainer();
		topics.push(tempSearchValue);
		var btnCounter = 0;
		for(var i = 0; i < topics.length; i++) {
			var tempBtn = $("<button>");
			tempBtn.attr({
				class: "btn",
				id: "myBtn-" + btnCounter
			});
			if(btnCounter % 2 === 0){
				tempBtn.addClass("btn-secondary");
			} else {
				tempBtn.addClass("btn-default");
			}
			tempBtn.attr("data-btnValue",topics[i]);
			tempBtn.attr("data-value",btnCounter);
			tempBtn.text(topics[i]);
			$("#myBtnContainer").append(tempBtn);
			btnCounter++
		}
	}
});


$(document).on("click","button[id*='myBtn-']",function(event){
	event.preventDefault();
	clearGifContainer();
	var tempQueryValue = $(this).attr("data-value");
	var apiKey = "?api_key=" + "2m4rWNVpTqAABADj01J4SoyUB8USPBjM";
	var giphyURL = "https://api.giphy.com/v1/gifs/";
	var queryType = "search";
	var tempSearch = "&q=" + $(this).attr("data-btnValue");
	var maxNumResults = "&limit=" + 10;
	var myRatings = "&rating=" + "g" + "&rating=" + "pg";
	// offset to select a position to start from ie. 0 to 90 to allot for a min of 10 results, see maxNumResults variable
	var myOffset = "&offset=" + Math.floor(Math.random()*90);
	var queryURL = giphyURL + queryType + apiKey + tempSearch + maxNumResults + myRatings + myOffset;
	$.ajax({
		url:queryURL,
		method:"GET"
	}).done(function(response){
		for(var i = 0; i < response.data.length; i++) {
			var tempRatings = response.data[i].rating;
			var tempImgStill = response.data[i].images.fixed_width_still.url;
			var tempImgGif = response.data[i].images.fixed_width.url;
			var tempNarrative = response.data[i].title;	
			var tempDivCard = $("<div>");
			tempDivCard.attr({
				class: "card float-left center-block",
				style: "width:25em; height:600px"
			});
			var tempDivCardImg = $("<img>");
			tempDivCardImg.attr({
				class: "card-img-top",
				id: "myGif-" + i,
				src: tempImgStill
			});
			tempDivCardImg.attr("data-still", tempImgStill);
			tempDivCardImg.attr("data-animate", tempImgGif);
			tempDivCardImg.attr("data-status","still");
			var tempDivCardBody = $("<div>");
			tempDivCardBody.attr("class","card-body");
			var tempHFour = $("<h6>");
			tempHFour.attr("class","card-title");
			tempHFour.html(tempNarrative);
			var tempPara = $("<p>");
			tempPara.attr("class","card-text");
			tempPara.html("Rated: " + tempRatings);
			tempDivCardBody.append(tempHFour);
			tempDivCardBody.append(tempPara);
			tempDivCard.append(tempDivCardImg);
			tempDivCard.append(tempDivCardBody);
			$("#myGiphyContainer").append(tempDivCard);
		}
		
	});
});

$(document).on("click","img[id*='myGif-']",function(event){
	if($(this).attr("data-status") === "still") {
		$(this).attr("src",$(this).attr("data-animate"));
		$(this).attr("data-status","animate");
	} else {
		$(this).attr("src",$(this).attr("data-still"));
		$(this).attr("data-status","still");
	}
})
