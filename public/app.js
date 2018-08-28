(function(){
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCOIw-jXibG6hzJ_4G0TFk67S3hoUP_va4",
    authDomain: "con-tac-toe.firebaseapp.com",
    databaseURL: "https://con-tac-toe.firebaseio.com",
    projectId: "con-tac-toe",
    storageBucket: "con-tac-toe.appspot.com",
    messagingSenderId: "1010375995617"
  };
  	firebase.initializeApp(config);
	// Get a reference to the database service
	var database = firebase.database();
	
	const preObject = document.getElementById('object');
	
	const dbRefObject = database.ref().child('test');
	
	dbRefObject.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(), null, 3);
	});
}());

function submit1(){
	var x = document.getElementById("frm1");
	var postData ={
	entry1: x.elements[0].value,
	entry2: x.elements[1].value
	};
	var update = {};
	update['test'] = postData;
	firebase.database().ref().update(update);
}