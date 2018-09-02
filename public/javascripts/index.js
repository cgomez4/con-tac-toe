// signin button, package username and password as json and post them to the /signin
// signin router handler is in index.js
$(function (){
	var $username = $('#username');
	var $password = $('#password');

	$('#signin').on('click', function(){

		var passport = {
			username: $username.val(),
			password: $password.val()
		};

		$.ajax({
			type: 'POST',
			url: 'signin',
			data: passport,
		}).done(function(data, textStatus, jqXHR){
			if(jqXHR.responseText == 'true')
				window.location.href = 'user';
			else
				window.location.href = 'index';
		});
	});
});