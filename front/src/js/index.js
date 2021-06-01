if (window.localStorage.getItem('jwt') === null)
  window.location = './src/pages/connection/login.html';

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('name').textContent = localStorage.getItem('user');
  initializeHome();
});


function initializeHome() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/home.php', {
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
          createFavoritesSection(data.favorites);
          createHistoricalSection(data.history);
          createFriendsSection(data.friends)
        })
    })
  })
}

function createFavoritesSection(favorites) {
  if (favorites.length === 0) {
    const emptyFavorites = document.createElement('p');
    emptyFavorites.className = 'text-center text-sm text-black py-5';
    emptyFavorites.textContent = "Vous n'avez encore aucun favoris.";

    document.getElementById('favorites').append(emptyFavorites);
  } else {
    for (const favoritesKey of favorites) {

      const divGame = document.createElement('div');
      divGame.className = 'game overflow-hidden relative rounded-xl h-36 mb-3';

      const linkGame = document.createElement('a');
      const divWrapper = document.createElement('div');
      divWrapper.className = 'wrapper flex flex-col justify-between items-end h-full pr-4 pb-3 pt-4';

      const span = document.createElement('span');
      span.className = 'starred on';
      span.addEventListener("click", function () {
        removeFavorite(favoritesKey.Id)
        location.reload()
      })

      const title = document.createElement('h3');
      title.className = 'text-white font-bold text-lg';
      title.textContent = favoritesKey.Name;

      if (favoritesKey.Name === "L'infiltré") {
        divGame.classList.add('infiltre', 'bg-spy');
      }

      if (favoritesKey.Name === 'Le loup du village') {
        divGame.classList.add('le-loup', 'bg-wolf');
      }

      if (favoritesKey.Name === 'Le survivant') {
        divGame.classList.add('survivant', 'bg-survivant');
      }

      divWrapper.append(span, title);
      linkGame.append(divWrapper);
      divGame.append(linkGame);

      document.getElementById('favorites').append(divGame);
    }
  }

}

function createFriendsSection(friends) {

  if(friends.length === 0) {
    const emptyFriends = document.createElement('p');
    emptyFriends.className = 'text-center text-sm text-black pt-5 pb-10 w-full';
    emptyFriends.textContent = "Vous n'avez pas encore d'amis";

    document.getElementById('friends-container').append(emptyFriends);
  } else {
    let colors = ['bg-red', 'bg-blue', 'bg-yellow'];

    for (const friend of friends) {

      const divFriend = document.createElement('div');
      divFriend.className = 'card relative overflow-hidden w-1/3:m mb-4 rounded-xl flex flex-col justify-end p-2.5';

      divFriend.classList.add(colors[Math.floor(Math.random() * colors.length)]);

      const friendName = document.createElement('span');
      friendName.className = 'text-white font-bold text-xs capitalize';
      friendName.textContent = friend.Name;

      divFriend.append(friendName);

      document.getElementById('friends-container').append(divFriend);
    }
  }
}

function createHistoricalSection(historical) {
  console.log(historical);
  if (historical.length === 0) {
    const emptyHistory = document.createElement('p');
    emptyHistory.className = 'text-center text-sm text-black py-5';
    emptyHistory.textContent = "Vous n'avez pas encore d'historique de vos parties."

    document.getElementById('history-container').append(emptyHistory);
  } else {
    const divContainer = document.createElement('div');
    divContainer.className = 'card-container overflow-x-scroll flex pr-8';

    for (const history of historical) {
      const divCard = document.createElement('div');
      divCard.className = 'card bg-spy flex flex-col rounded-xl py-2 px-3 mr-4 relative overflow-hidden';

      const spanDate = document.createElement('span');
      spanDate.className = 'date font-bold text-lg text-white leading-5';

      const spanGameTitle = document.createElement('span');
      spanGameTitle.className = 'title text-white font-bold text-sm mt-3';

      const spanJoueurs = document.createElement('span');
      spanJoueurs.className = 'players text-white font-regular text-xs';

      divCard.append(spanDate, spanGameTitle, spanJoueurs);
      divContainer.append(divCard);
    }

    /*<div className="card bg-spy flex flex-col rounded-xl py-2 px-3 mr-4 relative overflow-hidden">
                        <span className="date font-bold text-lg text-white leading-5">
                            17<br>
                            janv
                        </span>
      <span className="title text-white font-bold text-sm mt-3">
                            L'infiltré
                        </span>
      <span className="players text-white font-regular text-xs ">
                            6 joueurs
                        </span>
    </div>*/
  }
}