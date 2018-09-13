
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
//change id from he and he1 to a unique id that that will delete any element on page with that id.
function pushNewContact(name, number, email, address, id) {
  $(".collapsible").append("<li><div id='"+id+"' class='collapsible-header black-text text'><i class='material-icons'>account_circle</i>"+name+"</div><div id='"+id+"' class='collapsible-body white black-text text' row><div class='valign-wrapper'><i class='material-icons'>call</i><h6 class='col'>"+number+"</h6><i class='material-icons'>email</i><h6 class='col'>"+email+"</h6><i class='material-icons'>place</i><h6 class='col'>"+address+"</h6></div><a row s1 class='btn red' onclick='event.stopPropagation(); pushDeleteContact()'><i col offset-s10 class='material-icons'>delete</i></a></li>");
  //COLLAPSIBLE INITIALIZATION
 $('.collapsible').collapsible();
}

function pushDeleteContact() {
  console.log("weee");
  $("#he").remove();
  $("#he1").remove();

}

function pushLogOut(sample) {
  sessionStorage.clear();

}

function pruneSeach(){
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    //Loop through all list items
}
