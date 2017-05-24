document.addEventListener('DOMContentLoaded', bindOrgButton);



function bindOrgButton() {
	document.getElementById('submitData').addEventListener('click', function(event) {
		console.log("eggs");
$.get("https://dashboard.healthit.gov/datadashboard/data/MU_REPORT_2016.csv", function(text)
{
    var data = $.parse(text);
    console.log(data);
});

});

}