
document.addEventListener('DOMContentLoaded', bindOrgButton);

function bindOrgButton() {
	document.getElementById('submitData').addEventListener('click', function(event) {
		var multiSearch = 0;
		var req = new XMLHttpRequest();
		var orgName = document.getElementById('organization').value;
		var orgName = orgName.replace(" ", "+");
		orgName = orgName.toUpperCase();
		var fName = document.getElementById('Fname').value;
		fName = fName.toUpperCase();
		var lName = document.getElementById('Lname').value;
		lName = lName.toUpperCase();
		lName = lName.replace(" ", "+");
		var city = document.getElementById('city').value;
		city = city.replace(" ", "+");
		city = city.toUpperCase();
		var state = document.getElementById('state').value;
		var zip = document.getElementById('zip').value;
		
		//Build URL based on what search criteria are entered
		var pQuery = 'https://registry.npi.io/search/api/public/nppes/pjson/pjson.json?';
		if(orgName != "") {
			var orgQuery = '&basic.organization_name='+orgName;
			pQuery = pQuery+orgQuery;
		}
		if(fName != "") {
			var fNameQuery = '&basic.first_name='+fName;
			pQuery = pQuery+fNameQuery;
		}
		if(lName != "") {
			var lNameQuery = '&basic.last_name='+lName;
			pQuery = pQuery+lNameQuery;
		}
		if(city != "") {
			var cityQuery = '&addresses.city='+city;
			pQuery = pQuery+cityQuery;
		}
		if(state != "") {
			var stateQuery = '&addresses.state='+state;
			pQuery = pQuery+stateQuery;
		}
		if(zip != "") {
			var zipQuery = '&addresses.zip='+zip;
			pQuery = pQuery+zipQuery;
		}
		console.log(pQuery);
		req.open("GET", pQuery, true);
		
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status<400){
				var response = JSON.parse(req.responseText);
				var resultsArray = new Array();		//array to hold NPI numbers
				console.log(response);
				$('#searchResults').empty();	//clear prior search results
				var results = document.createElement('h3');
				searchResults.appendChild(results);
				results.textContent = 'Search Results';
				var listResults =  document.createElement('ul');
				results.appendChild(listResults);
				
				//Finds NPI number of all search results.
				for(var k=0; k<response.results.length; k++) {
					(function(y) {
						//populate array to hold all NPI numbers
						resultsArray.push(response.results[y].number);
						var npiNum = document.createElement('li');
						npiNum.textContent = response.results[y].number;
						listResults.appendChild(npiNum);
						//console.log(response.results[y].number);
						
					})(k);
					
					
				}
				console.log(resultsArray);
				Papa.parse("https://dashboard.healthit.gov/datadashboard/data/MU_REPORT_2016.csv", {
				download: true,
				step: function(row) {
				console.log("Row:", row.data);
				},
				complete: function() {
				console.log("All done!");
    }
});

			}
			else {
				console.log("Error in network request: " + request.statusText);
			}
	});
	req.send(null);
	
	event.preventDefault();
	
	});
	
	//https://registry.npi.io/search/api/public/nppes/pjson/pjson.json?basic.last_name=BEYER
	
	/*
	Papa.parse("/files/big.csv", {
    download: true,
    step: function(data) { ... },
    complete: function(results) { ... }
	*/
	


}