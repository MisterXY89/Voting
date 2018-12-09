
$(document).ready(function() {

	$("#add").click(function() {
		var ops = $("#currentOptions");
		var option = $("#option").val();
		var del = " <span id='delete'>Entfernen</span>";
		var append = "<li><span class='val'>" + option + "</span>" + del + "</li>";
		$("#option").val("");
		ops.append(append);
	});

	/**
	@author: Paolo Forgia, Anatoliy
	from: 
	https://stackoverflow.com/questions/1484506/random-color-generator#1484514
	*/
	function getColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}


	/**
	return array w/ given size of random colors 
	and adjusted 
	*/
	function getColorList(len) {
		colors = [];		
		for (var i = 0; i < len; i++) {
			colors.push( getColor() );
		}
		return colors;
	}

	
	$(document).on('click', 'span#delete', function () {
    	var $parentDiv = $(this).closest('li');  
    	$parentDiv.remove();   
	});

	var genKey = function () { 
		return Math.random().toString(36).substring(7); 
	}

	var addToFirebase = function(dict) {
		// Get a reference to the database service
		console.log("addToFirebase");
		var database = firebase.database();
		var votingID = genKey();
		console.log(votingID);
		var votingsRef = firebase.database().ref("votings/"+votingID);

		try {
			votingsRef.set(dict);
		} catch(e) {
			return false;
		}
		return true;		

	};


	// read from -> async
	var readFromFireBase = function(source) {
		console.log("source: " + source);
		// var out = [];
		firebase.database().ref('/votings/').once('value').then(function(snapshot) {
			var callback = snapshot.val();
			for (var elt in callback) {
				// out.push([elt, callback[elt]]);
				var html = "";
				var title = callback[elt].title;
				var options = callback[elt].options;
				if (source == "init") {
					html = "<h2>" + title + "</h2><div id='" + elt + "-buttons'>";
					for (var i = 0; i < options.length; i++) {
						html += "<button type='button' class='btn btn-primary' data-title='" + title + "' data-id='" + elt + "' data-nr='" + i + "' data-options='" + JSON.stringify(options) + "'>" + options[i].name + "</button>";
					}
					html += "</div>";
					$(".votings").append(html);
				} else if (source == "results") {
					console.log("inside results");

					$(".results").append("<div class='row'><h2>" + title + "</h2> <canvas id='" + elt + "'>  </canvas></div>");
					
					var ctx = document.getElementById(elt).getContext('2d');

					var votesData = [];
					var votesLabels = [];

					for (var i = 0; i < options.length; i++) {
						votesData.push(options[i].votes);
						votesLabels.push(options[i].name);
					}

					console.log(votesData);
					console.log(votesLabels);

					// var votesData = [14, 23, 31];
					// var votesLabels = ['Red', 'Yellow', 'Blue'];
					var votesColors = getColorList(votesData.length);

					var chart = new Chart(ctx, {
					    // The type of chart we want to create
					    type: 'doughnut',

					    // The data for our datasets
					    data: {
					    	datasets: [
					    	{
					        	data: votesData,
								backgroundColor: votesColors
						   	}],

					    	// These labels appear in the legend and in the tooltips when hovering different arcs
							labels: votesLabels
						},
					    // Configuration options go here
					    options: {}
					});

				}				
			}
		});
	};


	$(".votingsWrapper").ready(function() {
		var addTo = $(".votings");
		var firebaseResult = readFromFireBase("init");		
	});


	// trigger results load and resukts creation
	$(".results").ready(function() {
		console.log("results ready");
		readFromFireBase("results");		
	});


	// vote
	$(document).on('click', '.votings button', function () {
		var votingID = $(this).attr("data-id");
		var hasVoted = $.cookie(votingID);
		console.log(hasVoted);
		if (hasVoted) {
			$("#" + votingID + "-buttons :input").attr("disabled", true);
			alert("An dieser Abstimmung hast du bereits teilgenommen!");
			return false;
		}
		var index = $(this).data("nr");
		var title = $(this).attr("data-title");
		var name = $(this).text();
		var optionsStr = $(this).attr("data-options");
		console.log(votingID);
		console.log(name);
		var optionsS = JSON.stringify(eval("(" + optionsStr + ")"));
		options = JSON.parse(optionsS);
		var option = options[index];
		console.log(option);
		var votes = option.votes;
		var newVotes = votes + 1;
		var optionsUpdate = [{
					name: name,
					votes: newVotes
				}];
		for (var i=0; i<options.length;i++) {
			if (i!=index) {
				optionsUpdate.push(options[i]);
			}
		}
		// first read current vote for voting with votingID and name and raise it by one
		// then update / write the new state
		// firebase.database().ref().update();

		firebase.database().ref('/votings/' + votingID + "/").update({
			options: optionsUpdate,
			title: title
		});

		$("#" + votingID + "-buttons :input").attr("disabled", true);
		$.cookie(votingID, true, { expires: 7 });
		window.location.href = "results.php";
	});	
	

	// create new
	$("#submit").click(function() {
		var options = [];
		var ops = $("#currentOptions")[0].children;

		for (var i = 0; i < ops.length; i++) {
			var tmp = ops[i].children[0].childNodes[0].nodeValue;
			options.push(tmp);
		}

		var optionsJson = [];

		for (var i = 0; i < options.length; i++) {
			optionsJson.push({
				name: options[i],
				votes: 0
			}); 
		}

		console.log(optionsJson);

		if (options.length <= 1) {
			alert("Du musst mindestens zwei Optionen angeben.");
		} else {
			var title = $("#title").val();
			var dt = new Date();
			var time = dt.getDate() + "." + (dt.getMonth()+1) + "." + dt.getFullYear() + "@"  + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
			// generate json to store into firebase
			var dict = {
				"title": title,
				"options": optionsJson,
				"time": time
			};
			console.log(dict);
			// add to firebase
			addToFirebase(dict);			
			window.location.href = "index.php";
		}

	});

});