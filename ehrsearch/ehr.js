
document.addEventListener('DOMContentLoaded', bindOrgButton);

var parsed_csv;

function call_back(response) {
	
		//Parse chosen CSV file and save results as gobal variable using Papaparse	
		
		var newFile = document.getElementById("myFile").files[0];
		Papa.parse(newFile, {
						
				complete: function(results) {
				parsed_csv = results;
				console.log(parsed_csv); // results appear in dev console
				//console.log(parsed_csv.data[0][17]);
				//console.log(parsed_csv.data.length);
		
				console.log(response);
				var resultsArray = new Array();		//array to hold NPI numbers
				console.log(response.result[1].practice_address.address_line);
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
				for(var k=0; k<response.result.length; k++) {
					(function(y) {
												
						resultsArray.push(response.result[y].npi);
						
						//create and populate table rows
						var table = document.getElementById('listResults');
						
						var row = table.insertRow(0);
						var cell1=row.insertCell(0);
						cell1.innerHTML=response.result[y].first_name + '&nbsp' + response.result[y].last_name + '&nbsp &nbsp &nbsp &nbsp';
						var cell2=row.insertCell(1);
						cell2.innerHTML=response.result[y].practice_address.city + ' ' + response.result[y].practice_address.state + '&nbsp &nbsp &nbsp &nbsp';
						var cell3=row.insertCell(2);
						for(var i = 0; i<parsed_csv.data.length;i++) {
							if(parsed_csv.data[i][0] == response.result[y].npi) {
							cell3.innerHTML= parsed_csv.data[i][17];
							}
						}
						listResults.appendChild(row);
						//}
						
					})(k);
					
					
				}
				console.log(resultsArray);
				}
				});
	};

function bindOrgButton() {
	document.getElementById('submitData').addEventListener('click', function(event) {
		
		//Get search values
		var multiSearch = 0;
		//var req = new XMLHttpRequest();
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
		var key = 0;
		var op = 0;
		var value = 0;
		var pQuery = 'https://www.bloomapi.com/api/search/usgov.hhs.npi?';
		if(orgName != "") {
			key += 1;
			op += 1;
			value += 1;
			var orgQuery = 'key'+key+'=organization_name'+'&op'+op+'=eq'+'&value'+value+'='+orgName;
			pQuery = pQuery+orgQuery;
		}
		if(fName != "") {
			key += 1;
			op += 1;
			value += 1;
			var fNameQuery = '&key'+key+'=first_name'+'&op'+op+'=eq'+'&value'+value+'='+fName;
			pQuery = pQuery+fNameQuery;
		}
		if(lName != "") {
			key += 1;
			op += 1;
			value += 1;			
			var lNameQuery = '&key'+key+'=last_name'+'&op'+op+'=eq'+'&value'+value+'='+lName;
			pQuery = pQuery+lNameQuery;
		}
		if(city != "") {
			key += 1;
			op += 1;
			value += 1;			
			var cityQuery = '&key'+key+'=city'+'&op'+op+'=eq'+'&value'+value+'='+city;
			pQuery = pQuery+cityQuery;
		}
		if(state != "") {
			key += 1;
			op += 1;
			value += 1;				
			var stateQuery = '&key'+key+'=state'+'&op'+op+'=eq'+'&value'+value+'='+state;
			pQuery = pQuery+stateQuery;
		}
		if(zip != "") {
			key += 1;
			op += 1;
			value += 1;			
			var zipQuery = '&key'+key+'=postal_code'+'&op'+op+'=eq'+'&value'+value+'='+zip;
			pQuery = pQuery+zipQuery;
		}
		
		//JSONP script creation and callback function creation
		
		var tag = document.createElement("script");	
		tag.src = pQuery+'&callback=call_back';	
		document.getElementsByTagName("head")[0].appendChild(tag);

	event.preventDefault();
	
	});

	
}
