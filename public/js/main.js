$(document).ready(function () {

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: '/signin',
		data: $('#mySignInForm').serialize(),
		success: function (data) {
		}
	});
	
});