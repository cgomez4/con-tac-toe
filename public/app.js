const preObject = document.getElementById('object');
fetch('https://us-central1-con-tac-toe.cloudfunctions.net/api/getTest')
  .then(response => response.json())
  .then(data => {
    preObject.innerText = JSON.stringify(data, null, 3)
  });

function submit1() {
  var x = document.getElementById("frm1");
  var postData = {
    entry1: x.elements[0].value,
    entry2: x.elements[1].value
  };
  fetch('https://us-central1-con-tac-toe.cloudfunctions.net/api/putTest', {
    method: 'post',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
    body: JSON.stringify(postData, null, 3)
  })
  .then(response => response.json())
  .then(data => {
    preObject.innerText = JSON.stringify(data, null, 33)
  })
}
