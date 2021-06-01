window.addEventListener("DOMContentLoaded", (event) => {
  initializeFriendsGroupPage();
});

function initializeFriendsGroupPage() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/getfriendsgroupes.php', {
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
          console.log('data',data)
          createFriendsGroupSection(data);
        })
    })
  })
}

function createFriendsGroupSection(friendsGroup) {
  console.log(friendsGroup)
  let colors = ['bg-red', 'bg-blue', 'bg-yellow'];

  for (const group of friendsGroup) {

    const divFriend = document.createElement('div');
    divFriend.className = 'card relative overflow-hidden w-full mb-4 rounded-xl flex flex-col h-20 justify-end p-2.5';

    divFriend.classList.add(colors[Math.floor(Math.random() * colors.length)]);

    const friendName = document.createElement('span');
    friendName.className = 'text-white font-bold text-xs capitalize';
    friendName.textContent = group.Name;

    divFriend.append(friendName);
    divFriend.addEventListener("click", () => {
      event.preventDefault();
      openModal('modal-edit', group)
    });

    document.getElementById('friends-container').append(divFriend);
  }
}

function openModal(id, group) {
  document.getElementById(id).style.display = 'block';
  if (id === 'modal-edit') {
    document.getElementById('old-name').value = group.Name;
    document.getElementById('friend-id').value = group.Id;
  }
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function addGroup() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/addfriendsgroup.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        name: document.getElementById('name').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}

/*function editFriend() {
  //TODO edit api
  return new Promise(() => {
    fetch('https://la-malle.app/api/getData.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        friendid: document.getElementById('friend-id').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}

function removeFriend() {
  // TODO remove api
  return new Promise(() => {
    fetch('https://la-malle.app/api/getData.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        friendid: document.getElementById('friend-id').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}*/