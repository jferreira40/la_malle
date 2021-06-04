window.addEventListener("DOMContentLoaded", (event) => {
  initializeFriendsGroupPage()
  getAllFriends();
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
    console.log(friendsGroup);

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
      getGroupDetails();
    });

    document.getElementById('groups-container').append(divGroup);
  }
}

function initializeSelectFriends(friends) {
  console.log(friends)

  for (const friend of friends) {
    const li = document.createElement('li');
    li.className = 'text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9';
    li.id = 'listbox-option-0';

    const friendName = document.createElement('span');
    friendName.className = 'font-medium block';
    friendName.textContent = friend.Name;
    friendName.id = friend.Id;

    li.append(friendName);
    li.addEventListener('click', () => {
      event.preventDefault();
      replaceNameSelect(friend.Id, friend.Name);
    });
    document.getElementById('friends-values').append(li);
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

function addFriendsToGroup() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/addfriendtogroup.php', {
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

function prepareFriends() {
  const childs = document.getElementById('chips').children;

  let friendsIdTab = [];

  for (const child of childs) {
    friendsIdTab.push(child.id);
  }

  return friendsIdTab;
}

function editGroup() {
  const friends = prepareFriends();

  return new Promise(() => {
    fetch('https://la-malle.app/api/addfriendtogroup.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        groupId: document.getElementById('group-id').value,
        friends: friends
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
        idgroup: document.getElementById('group-id').value
      })
    }).then(response => {
      if (response.status === 200)
        location.reload();
    })
  })
}

function getAllFriends() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/getfriends.php', {
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
          initializeSelectFriends(data);
        })
    })
  })
}


function getGroupDetails() {
  return new Promise(() => {
    fetch('https://la-malle.app/api/getfriendsgroup.php', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        id: localStorage.getItem('id'),
        groupid: document.getElementById('group-id').value
      })
    }).then(response => {
      if (response.status === 200)
        response.json().then(data => {
          console.log('groupe details', data);
          initializeChips(data);
        })
    })
  })
}

function initializeChips(groupDetails) {
  document.getElementById('chips').innerHTML = '';
  for (const groupDetail of groupDetails) {
    const chip = document.createElement('div');
    chip.className = 'chip bg-lightGray px-6 rounded-full w-max text-xs text-darkBlue py-1 font-medium items-center inline-flex mx-2 mb-2';
    chip.textContent = groupDetail.Name;
    chip.id = groupDetail.Id;

    const span = document.createElement('span');
    span.className = 'cross';

    chip.appendChild(span);

    document.getElementById('chips').append(chip);
  }
}

function createChip() {
  const name = document.getElementById('selected').innerText;
  console.log(name);
  const chip = document.createElement('div');
  chip.className = 'chip bg-lightGray px-6 rounded-full w-max text-xs text-darkBlue py-1 font-medium flex items-center';
  chip.textContent = name;
  chip.id = document.getElementById('selected').dataset.value;

  const span = document.createElement('span');
  span.className = 'cross';

  chip.appendChild(span);

  document.getElementById('chips').append(chip);
}

function replaceNameSelect(id, name) {
  document.getElementById('selected').textContent = name;
  document.getElementById('selected').dataset.value = id;
}

function toggleValues() {
  let containerDisplay = document.getElementById('friends-values');

  if (containerDisplay.style.display === 'block') {
    containerDisplay.style.display = 'none'
  } else {
    containerDisplay.style.display = 'block';
  }
}

