if (window.localStorage.getItem('user') === null)
  window.location = './src/pages/connection/login.html';

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('name').textContent = localStorage.getItem('user');
  initializeHome();
});


function initializeHome() {
  // TODO Remove id 12
  return new Promise(() => {
    fetch('https://la-malle.app/api/home.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: 12
        //localStorage.getItem('id')
      })
    }).then(response => {
      if (response.status === 200)
        response.json().then(data => {
          console.log(data)
          createFavoritesSection(data.favorites);
          createFriendsSection(data.friends)
        })
    })
  })
}

function createFavoritesSection(favorites) {
  for (const favoritesKey of favorites) {

    const divGame = document.createElement('div');
    divGame.className = 'game overflow-hidden relative rounded-xl h-36 mb-3';

    const linkGame = document.createElement('a');
    const divWrapper = document.createElement('div');
    divWrapper.className = 'wrapper flex flex-col justify-between items-end h-full pr-4 pb-3 pt-4';

    const span = document.createElement('span');
    span.className = 'starred on';

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

function createFriendsSection(friends) {

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
