$(function (){
	var $firstname = $('#first_name');
	var $lastname = $('#last_name');
	var $password = $('#password');
	var $passwordConfirm = $('#password_confirm');
	var $username = $('#username');

	$('#submit').on('click', function(){
		// todo 
		// set rules for name and password
		// unique username ? password length? special character in names?
		var checkInput = true;
		// todo
		// pop the alert to the html
		// use alert() ??
		if($firstname.val() == ''){
			console.log('missing fisrt name');
			checkInput = false;
		}
		if($lastname.val() == ''){
			console.log('missing last name');
			checkInput = false;
		}
		if($password.val() == ''){
			console.log('missing password');
			checkInput = false;
		}
		if($password.val() != $passwordConfirm.val()){
			console.log('confirm password doesn\'t match');
			checkInput = false;
		}
		if($username.val() == ''){
			console.log('missing username');
			checkInput = false;
		}

		//console.log('here');
		if(checkInput == true){
			//check username has been taken or not
			var newUsername = {
				username : $username.val(),
			}

			$.ajax({
				type: 'POST',
				url: 'signup/checkunique',
				data: newUsername,
			}).done(function(data, textStatus, jqXHR){
				if(jqXHR.responseText == 'true'){
					var newUser = {
						name: $firstname.val() + ' ' + $lastname.val(),
						password: $password.val(),
						username: $username.val(),
					};

					$.ajax({
						type: 'POST',
						url: 'signup/submit',
						data: newUser,
					}).done(function(data, textStatus, jqXHR){
						window.location.href = 'index';
					});
				}else{
					console.log('username has been taken');
				}
			});
		}
	});
});