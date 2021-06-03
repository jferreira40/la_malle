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
          createHistory(data);
        })
    })
  })
}

function createHistory(historical) {
  if (historical.length === 0) {
    const emptyHistory = document.createElement('p');
    emptyHistory.className = 'text-center text-sm text-black py-5';
    emptyHistory.textContent = "Vous n'avez pas encore d'historique de vos parties.";

    document.getElementById('history-container').append(emptyHistory);
  } else {

    for (const history of historical) {

      const divContainer = document.createElement('div');
      divContainer.className = 'game overflow-hidden relative rounded-xl h-20 mb-3';

      if (history.game === "L'infiltré") {
        divContainer.classList.add('infiltre', 'bg-spy');
      }

      if (history.game === 'Le loup du village') {
        divContainer.classList.add('le-loup', 'bg-wolf');
      }

      if (history.game === 'Le survivant') {
        divContainer.classList.add('survivant', 'bg-survive');
      }

      const divWrapper = document.createElement('div');
      divWrapper.className = 'relative wrapper flex justify-between h-full px-3 pb-3 pt-4';

      const divDate = document.createElement('div');
      divDate.className = 'date flex flex-col items-center justify-center text-white font-bold';

      const date = new Date(history.date).toLocaleString('fr-fr', {month: 'short', day: 'numeric', year: 'numeric'});
      const day = date.substr(0, 2);
      const month = date.substr(2, date.length-7);
      const year = date.substr(date.length-4, date.length);

      const spanDay = document.createElement('span');
      spanDay.className = 'jour text-lg leading-5';
      spanDay.textContent = day

      const spanMonth = document.createElement('span');
      spanMonth.className = 'mois text-sm leading-5';
      spanMonth.textContent = month;

      const spanYear = document.createElement('span');
      spanYear.className = 'annee text-sm leading-5';
      spanYear.textContent = year;

      divDate.append(spanDay, spanMonth, spanYear);

      const divScore = document.createElement('div');
      divScore.className = 'date flex flex-col items-center justify-center text-white font-bold';


      const spanWinner = document.createElement('span');
      spanWinner.className = 'winner capitalize';
      spanWinner.textContent = history.Name;


      const spanPlayers = document.createElement('span');
      spanPlayers.className = 'players';
      if (history.count === '1') {
        spanPlayers.textContent = history.count + ' joueur';
      } else {
        spanPlayers.textContent = history.count + ' joueurs';
      }

      divScore.append(spanWinner, spanPlayers);

      const divTitle = document.createElement('div');
      divTitle.className = 'title self-end w-22 text-right';

      const title = document.createElement('h3');
      title.className = 'text-white font-bold text-sm';
      title.textContent = history.game;

      divTitle.append(title);
      divWrapper.append(divDate, divScore, divTitle);
      divContainer.append(divWrapper);

      document.getElementById('history-container').append(divContainer);
    }
  }
}
