
document.addEventListener('DOMContentLoaded', bindOrgButton);

var parsed_csv;



function bindOrgButton() {
	document.getElementById('submitData').addEventListener('click', function(event) {

	//var target = document.getElementById('searchResults');
	//var spinner = new Spinner(opts).spin(target);
		
		//Parse chosen CSV file and save results as gobal variable using Papaparse
		var newFile = document.getElementById("myFile").files[0];
		Papa.parse(newFile, {
				
				
				complete: function(results) {
				parsed_csv = results;
				console.log(parsed_csv); // results appear in dev console
				//console.log(parsed_csv.data[0][17]);
				//console.log(parsed_csv.data.length);
				
					}
		});
		//stop();
		
		//Get search values
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
		
		//console.log(pQuery);
		req.open("GET", pQuery, true);
		
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status<400){
				var response = JSON.parse(req.responseText);
				var resultsArray = new Array();		//array to hold NPI numbers
				console.log(response);
				$('#searchResults').empty();	//clear prior search results
				
			
				//console.log(parsed_csv.data[0][17]);
				
				//Create table 
				var listResults =  document.createElement('table');
				listResults.id='listResults';
				searchResults.appendChild(listResults);
				var table = document.getElementById('listResults');

				var header = table.createTHead();
				var row = header.insertRow(0);
				var cell1 = row.insertCell(0);
				cell1.innerHTML = "<b>Name</b>";
				var cell2 = row.insertCell(1);
				cell2.innerHTML = "<b>Location</b>";
				var cell3 = row.insertCell(2);
				cell3.innerHTML = "<b>EMR System</b>";
				
				//Finds NPI number of all search results.
				for(var k=0; k<response.results.length; k++) {
					(function(y) {
						//populate array to hold all NPI numbers
						var credString = response.results[y].basic.credential;
						//console.log(credString);
						
						
						resultsArray.push(response.results[y].number);
						
						//create and populate table rows
						var table = document.getElementById('listResults');
						
						var row = table.insertRow(0);
						var cell1=row.insertCell(0);
						cell1.innerHTML=response.results[y].title + '&nbsp &nbsp &nbsp &nbsp';
						var cell2=row.insertCell(1);
						cell2.innerHTML=response.results[y].addresses[0].address_1 + '\n' + 
						response.results[y].addresses[0].city + ' ' + response.results[y].addresses[0].state + '&nbsp &nbsp &nbsp &nbsp';
						var cell3=row.insertCell(2);
						for(var i = 0; i<parsed_csv.data.length;i++) {
							if(parsed_csv.data[i][0] == response.results[y].number) {
							cell3.innerHTML= parsed_csv.data[i][17];
							}
						}
						listResults.appendChild(row);
						//}
						
					})(k);
					
					
				}
				console.log(resultsArray);
				
				
	

			}
			else {
				console.log("Error in network request: " + request.statusText);
			}
	});
	req.send(null);
	
	event.preventDefault();
	
	
	});

	
}