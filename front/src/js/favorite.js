
function addFavorite(id) {
    return new Promise(() => {
        fetch('https://la-malle.app/api/addfavoritegame.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                id: localStorage.getItem('id'),
                gameid: id
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    return true
                })
            } else {
                return false
            }
        })
    })
}

function removeFavorite(id) {
    return new Promise(() => {
        fetch('https://la-malle.app/api/removegamefavorite.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                id: localStorage.getItem('id'),
                gameid: id
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    return true
                })
            } else {
                return false
            }
        })
    })
}
