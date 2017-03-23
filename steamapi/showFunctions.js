// Author: Daniel Beyer

document.addEventListener('DOMContentLoaded', bindGetContentsNewsButton);

function bindGetContentsNewsButton(){
	document.getElementById('getContentsNewsForApp').addEventListener('click', function(event) {
	var homeURL = "http://localhost:3000/getnews/?"
	var userInput = document.getElementById('GetContentsNewsForAppInput').value;
	var newURL = homeURL+userInput;
	var req = new XMLHttpRequest();
	req.open("GET", newURL, true);
	req.addEventListener('load', function(){
		if(req.status>= 200 && req.status<400){
		var response = JSON.parse(req.responseText);
		console.log(response);
		console.log(response.appnews.appid);
		console.log(response.appnews.newsitems[0].contents);
		showContents(response);
		}
			else {
				console.log("Error in network request: " + request.statusText);
			}
	});
	req.send(null);
	event.preventDefault();
});
}

function showContents(response){
	var newsList = document.createElement('ul');
	for (var i = 0; i<3; i++){
		var newItem = document.createElement('li');
		newItem.textContent = response.appnews.newsitems[i].contents;
		newsList.appendChild(newItem);
	}
	document.getElementById("newsItems").appendChild(newsList);
}

