// Author: Daniel Beyer

document.addEventListener('DOMContentLoaded', bindShowRecPlayedButton);

function bindShowRecPlayedButton(){
	document.getElementById('getShowRecPlayed').addEventListener('click', function(event) {
	var homeURL = "http://localhost:3000/getrecentlyplayed/?"
	var userInput = document.getElementById('GetRecPlayedInput').value;
	var newURL = homeURL+userInput;
	var req = new XMLHttpRequest();
	req.open("GET", newURL, true);
	req.addEventListener('load', function(){
		if(req.status>= 200 && req.status<400){
		var response = JSON.parse(req.responseText);
		console.log(response);
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
	for(var p in response.response.games) {

		var gameName = response.response.games[p].name;
		
		console.log(gameName);
		var play2wks = response.response.games[p].playtime_2weeks;
		var playForver = response.response.games[p].playtime_forever;

		var newName = document.createElement('p');
		var newPlayTime = document.createElement('p');
		newName.textContent = gameName;
		newPlayTime.textContent = play2wks;
		
		document.getElementById('RecentlyOwned').appendChild(newName);
		document.getElementById('RecentlyOwned').appendChild(newPlayTime);
	}
}
