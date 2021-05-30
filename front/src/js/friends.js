window.addEventListener("DOMContentLoaded", (event) => {
  initializeFriendsPage();
});

function initializeFriendsPage() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/getfriends.php', {
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
          createFriendsSection(data);
        })
    })
  })
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
