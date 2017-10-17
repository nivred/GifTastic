var hotDudes = ["Paul Rudd", "David Duchovny", "Topher Grace", "Rick Moranis"];


function displayTopicPhoto() {
	var topic = $(this).attr("data-name");
  console.log("this= "+topic);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
      	method: "GET"
    })

    //
    .done(function(response){
      	console.log(response);

        var imageStill = "" //response.data[0].images.original_still.url;
      	var imageAnimate = ""//response.data[0].images.original.url;
        var state = "still"
        imageUrl = imageStill;

      	console.log(imageUrl);
        //var topicImage = $("<img");

        //
        $("#images").empty();
        for (var i=0; i<response.data.length;i++)
        {
          imageStill=response.data[i].images.original_still.url;
          imageAnimate = response.data[i].images.original.url;
          console.log("IS="+imageStill);
          console.log("IA="+imageAnimate);
          topicImage = $("<img>");          //
          topicImage.attr("src", imageStill);
          topicImage.attr("data-still", imageStill);
          topicImage.attr("data-animate", imageAnimate);
          topicImage.attr("data-state", state);
          topicImage.addClass("gifs");
          topicImage.attr("alt", topic);
          $("#images").prepend(topicImage);
          console.log(topicImage);

        }

        //
        

    })
}      

function renderButtons() {
    // Deleting the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)

        $("#buttons-view").empty();
        console.log("hotDudes.length"+ hotDudes.length);

        // Looping through the array of topics
        for (var i = 0; i < hotDudes.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of topics to our button
          a.addClass("topics btn btn-default btn-success btn-group");
          // Adding a data-attribute
          a.attr("data-name", hotDudes[i]);
          // Providing the initial button text
          a.text(hotDudes[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);

        };
        console.log(a);
      }

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    console.log("event"+event);
    // This line grabs the input from the textbox
    var topics = $("#topic-input").val().trim();
    var alreadyUsed = $.inArray(topics,hotDudes);
    console.log(topics);
    console.log(alreadyUsed);
    if (topics && alreadyUsed<0){


      // Adding topic from the textbox to our array
      hotDudes.push(topics);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    }

    });

    // $(".gif").on("click", function() {
        // STEP ONE: study the html above.
        // Look at all the data attributes.
        // Run the file in the browser. Look at the images.
    function changePhotoState()   {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state =="still"){
          $(this).attr("data-state", "animate");
          $(this).attr("src",$(this).attr("data-animate"));
        } 
        else {
          $(this).attr("data-state", "still");
          $(this).attr("src",$(this).attr("data-still"));
        }
        
    }



    // Adding a click event listener to all elements with a class of "movie"
 	$(document).on("click", ".topics", displayTopicPhoto);
  $(document).on("click", ".gifs", changePhotoState);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
