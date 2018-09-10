//Get the freaking add contact button to freaking add a contact to the db
//Update the ui with the new contact

// const preObject = document.getElementById('object');
// fetch('https://us-central1-con-tac-toe.cloudfunctions.net/api/getTest')
//   .then(response => response.json())
//   .then(data => {
//     preObject.innerText = JSON.stringify(data, null, 3)
//   });
//
// function submit1() {
//   var x = document.getElementById("addContact");
//   console.log("hi");
//   var postData = {
//   entry1: x.elements[0].value,
//   entry2: x.elements[1].value,
//   entry3: x.elements[2].value,
//   entry4: x.elements[3].value,
//   entry5: x.elements[4].value
//   };
//
//   fetch('https://us-central1-con-tac-toe.cloudfunctions.net/api/putTest', {
//     method: 'post',
//     headers: {
//      'Accept': 'application/json',
//      'Content-Type': 'application/json'
//    },
//     body: JSON.stringify(postData, null, 3)
//   })
//   .then(response => response.json())
//   .then(data => {
//     preObject.innerText = JSON.stringify(data, null, 33)
//   })
// }


function submitSignUp() {
  //Capture values
  var email = document.getElementById("email").value;
  console.log(email);
  var password = document.getElementById("password").value;
  console.log(password);
  var password2 = document.getElementById("cPassword").value;
  console.log(password2);

  //Check if password and confirm password are equal

  //JSON-ify the data fields
  var postData = {
  email: email,
  password: password
  };

  fetch('https://con-tac-toe.firebaseapp.com/api/auth/signup', {
    method: 'post',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/x-www-form-urlencoded'
   },
    body: JSON.stringify(postData, null, 3)
  });

}

function addContact() {
  //Capture values
  var firstname = document.getElementById("first_name").value;
    console.log(firstname);
  //JSON-ify
}

function push() {
    console.log("hi");
  $(".collapsible").append("<li><div class='collapsible-header black-text text'><i class='material-icons'>account_circle</i>Fred haug</div><div class='collapsible-body white black-text text'><div class='valign-wrapper row'><i class='material-icons'>call</i><h6 class='col'>9548997868</h6><i class='material-icons'>email</i><h6 class='col'>haug.freddy@gmail.com</h6><i class='material-icons'>place</i><h6 class='col'>233 wildwood cirlce</h6></div></li>");
  //COLLAPSIBLE INITIALIZATION
 $('.collapsible').collapsible();
}

//This is for adding new contacts, Evetually we need these variables to pass over to the backend to save the contact to database
function pushNewContact() {
  var firstname = document.getElementById("first_name").value;
  var lastname = document.getElementById("last_name").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  $(".collapsible").append("<li><div class='collapsible-header black-text text'><i class='material-icons'>account_circle</i>"+firstname+"</div><div class='collapsible-body white black-text text'><div class='valign-wrapper row'><i class='material-icons'>call</i><h6 class='col'>"+number+"</h6><i class='material-icons'>email</i><h6 class='col'>"+email+"</h6><i class='material-icons'>place</i><h6 class='col'>"+address+"</h6></div></li>");
  //COLLAPSIBLE INITIALIZATION
 $('.collapsible').collapsible();
}
