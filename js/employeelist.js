var serviceURL = "http://nossotablet.hospedagemdesites.ws/teste/json/exercicios.php";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getExerciseList();
});

function getExerciseList() {
	$.getJSON(serviceURL, function(data) {
		alert(data.items);
		
		
		
		//$('#employeeList li').remove();
		//employees = data.items;
		//$.each(employees, function(index, employee) {
		//	$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
		//			/*'<img src="pics/' + employee.picture + '"/>' +*/
		//			'<h4>' + employee.title + '</h4>' +
		//			'<p>' + employee.description + '</p>' +
		//			'<span class="ui-li-count">' + "Brasil" + '</span></a></li>');
		//});
		//$('#employeeList').listview('refresh');
	});
}