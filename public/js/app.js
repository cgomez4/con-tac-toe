
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
  $(".collapsible").append("<li><div id='"+id+"' class='collapsible-header black-text text'><i class='material-icons'>account_circle</i>"+name+"</div><div id='"+id+"' class='collapsible-body white black-text text' row><div class='valign-wrapper'><i class='material-icons'>call</i><h6 class='col'>"+number+"</h6><i class='material-icons'>email</i><h6 class='col'>"+email+"</h6><i class='material-icons'>place</i><h6 class='col'>"+address+"</h6></div><a id='"+id+"'row s1 class='btn red' onclick='event.stopPropagation(); handleDelete()'><i id='"+id+"'col offset-s10 class='material-icons'>delete</i></a></li>");
  //COLLAPSIBLE INITIALIZATION
 $('.collapsible').collapsible();
}

function handleDelete() {
    var id = event.target.id;
  console.log(id); //Check to see if i got the id on click
  var api = "https://us-central1-con-tac-toe2.cloudfunctions.net/app/api/contacts/"+id;
  console.log(api);
  fetch(api, {
    method: 'delete',
     headers: {
      'bearer': sessionStorage.token
    }
  })
  .then(function(response){
        //pushDeleteContact(id);
     //console.log("response", response);
    if(response.status == 200){
      console.log('status 200');
//      pushDeleteContact();
      var lists = document.getElementById("myUL");
      console.log(lists);
      while(lists.hasChildNodes())
        lists.removeChild(lists.childNodes[0]);
      reRenderList();
    }
  })
  .catch(function(error){
    console.log(error);
  })

}

function pushDeleteContact(id) {

  $(document).on('click', 'span', function () {
      alert(this.id);
  });
   console.log(id);
   $("#id").remove();
   $("#id").remove();

}

function pushLogOut(sample) {
  sessionStorage.clear();

}

function reRenderList()
{

  console.log("sample.length");
    fetch("https://us-central1-con-tac-toe2.cloudfunctions.net/app/api/contacts",  {
      method: 'get',
       headers: {
        'bearer': sessionStorage.token
      }
    })
    .then(function(response){

      // console.log("response", response);
      if(response.status != null){
        return response.json();
      }
        return null;
    })

    .then(function(responseData){
      console.log("responseData", responseData);
          if(responseData != null)
          sample = responseData;
          console.log(sample);

            //pushNewContact(responseData.name, responseData.email, responseData.phoneNumber, responseData.address, responseData.id);
            //Rerender....
            for(var i = 0; i<sample.length; i++)
            {
              //Display the divs with the correct info
              pushNewContact(sample[i].name, sample[i].phoneNumber, sample[i].email, sample[i].address, sample[i].id);
            }
    })
    .catch(function(error){
      console.log(error);
    })

}


function pruneSeach(){
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('autocomplete-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    //Loop through all list items
    for (i = 0; i < li.length; i++) {
        divs = li[i].getElementsByTagName("div");
        //console.log(divs[0].getElementsByTagName("i"));
        //console.log(divs[0].innerText);
        //console.log(divs[0].innerText.substring(15));
        //console.log(divs[1].innerText);
        //console.log(divs[2].innerText);
        if (divs[0].innerText.substring(15).toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else if (divs[1].innerText.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else if (divs[2].innerText.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
