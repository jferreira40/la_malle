if (window.localStorage.getItem('jwt') === null)
  window.location = 'connexion.html';

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
          console.log(data)
          createGamesSection(data);
        })
    })
  })
}


function createGamesSection(games) {
  if (games.length === 0) {
    const emptyGames = document.createElement('p');
    emptyGames.className = 'text-center text-sm text-black py-5';
    emptyGames.textContent = "Aucun jeu pour le moment.";

    document.getElementById('favorites').append(emptyGames);
  } else {
    for (const game of games) {

      const divGame = document.createElement('div');
      divGame.className = 'game overflow-hidden relative rounded-xl h-36 mb-3';

      const linkGame = document.createElement('a');
      if (game.Url !== null) {
        linkGame.href = game.Url;
      }

      const divWrapper = document.createElement('div');
      divWrapper.className = 'wrapper flex flex-col justify-between items-end h-full pr-4 pb-3 pt-4';

      const span = document.createElement('span');
      if (game.IsFavorite === "1") {
        span.className = 'starred on';
      } else {
        span.className = 'starred';
      }

      // TODO Fix favorites
      span.addEventListener("click", function () {
        addFavorite(game.Id);
        location.reload();
      })

      const title = document.createElement('h3');
      title.className = 'text-white font-bold text-lg';
      title.textContent = game.Name;

      if (game.Name === "L'infiltré") {
        divGame.classList.add('infiltre', 'bg-spy');
      }

      if (game.Name === 'Le loup du village') {
        divGame.classList.add('le-loup', 'bg-wolf');
      }

      if (game.Name === 'Le survivant') {
        divGame.classList.add('survivant', 'bg-survive');
      }

      divWrapper.append(span, title);
      linkGame.append(divWrapper);
      divGame.append(linkGame);

      document.getElementById('games').append(divGame);
    }
  }
}
