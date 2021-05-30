window.addEventListener("DOMContentLoaded", (event) => {
    initializeProfil().then(r => {
        console.log('r', r)
    });
});

function initializeProfil() {
    return new Promise(() => {
        fetch('https://la-malle.app/api/getuser.php', {
            method: 'GET',
        }).then( response => {
            response.json().then(data => console.log(data));
        })
    })
}