window.addEventListener("DOMContentLoaded", (event) => {
  initializeHistory();
});


function initializeHistory() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/gethistory.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id')
      })
    }).then(response => {
      if (response.status === 200)
        response.json().then(data => {
            console.log(data)
          createHistory();
        })
    })
  })
}

function createHistory() {
  //TODO faire le html en js
}
