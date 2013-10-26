$('#reportListPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	console.log("reports for " + id);
	$.getJSON(serviceURL + '?id='+id, function (data) {
		var reports = data.items;
		$.each(reports, function(index, employee) {
			$('#reportList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					'<h4>' + employee.title + '</h4>' +
					'<p>' + employee.description + '</p>' +
					'<span class="ui-li-count">' + "Brasil" + '</span></a></li>');
		});
		$('#reportList').listview('refresh');
	});
});
s