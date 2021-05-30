window.addEventListener("DOMContentLoaded", (event) => {
    initializeProfil();
});

function initializeProfil() {
    return new Promise(() => {
        fetch('https://la-malle.app/api/getuser.php', {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: localStorage.getItem('id')
            })
        }).then( response => {
            response.json().then(data => {
                document.getElementById('firstname').value = data[0].Name;
                document.getElementById('email').value = data[0].Mail;
            });
        })
    })
}
