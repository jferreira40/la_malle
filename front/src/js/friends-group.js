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
          createFriendsGroupSection(data);
        })
    })
  })
}

function createFriendsGroupSection(friendsGroup) {
  let colors = ['bg-red', 'bg-blue', 'bg-yellow'];

  for (const group of friendsGroup) {

    const divGroup = document.createElement('div');
    divGroup.className = 'card relative overflow-hidden w-full mb-4 rounded-xl flex flex-col h-20 justify-end p-2.5';

    divGroup.classList.add(colors[Math.floor(Math.random() * colors.length)]);

    const groupName = document.createElement('span');
    groupName.className = 'text-white font-bold text-xs capitalize';
    groupName.textContent = group.Name;

    divGroup.append(groupName);
    divGroup.addEventListener("click", () => {
      event.preventDefault();
      openModal('modal-edit', group)
    });

    document.getElementById('groups-container').append(divGroup);
  }
}

function openModal(id, group) {
  document.getElementById(id).style.display = 'block';
  if (id === 'modal-edit') {
    document.getElementById(id).style.display = 'flex';
    document.getElementById('groupName').textContent = group.Name;
    document.getElementById('group-id').value = group.Id;
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

function editGroup() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/setgroup.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        groupid: document.getElementById('friend-id').value,
        newname: document.getElementById('old-name').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}

function removeGroup() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/removegroup.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        idgroup:document.getElementById('group-id').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}
