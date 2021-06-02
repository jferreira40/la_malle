window.addEventListener("DOMContentLoaded", (event) => {
  initializeGames();
});

function initializeGames() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/getgames.php', {
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
          console.log(data);
        })
    })
  })
}
