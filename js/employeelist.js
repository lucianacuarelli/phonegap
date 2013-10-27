var serviceURL = "http://nossotablet.hospedagemdesites.ws/teste/json/exercicios.php";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();
		employees = data;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					/*'<img src="pics/' + employee.image_url + '"/>' +*/
					'<h4>' + employee.title + '</h4>' +
					'<p>' + employee.description + '</p>' +
				'<span class="ui-li-count">' + "Brasil" + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
	});
}