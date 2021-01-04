
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function submitClicked(){
  preventDefault();
  const start = document.getElementsByName('start').value;
  const end =document.getElementsByName('end').value;
  const eventName = document.getElementsByName('eventName').value;
  const details = document.getElementsByName('details').value;
  if (!start || !end || !eventName){
    alert('You must fill in all the required fields')
    returnToPreviousPage()
  }
  if (start == '' || end == '' || eventName == ''){
    alert('You must fill in all the required fields')
    returnToPreviousPage();
    return false;
  }else{
    postData('/calendar/mongodb',{ start, end, eventName, details})
    .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    });
  }
}

  