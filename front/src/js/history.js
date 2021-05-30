window.addEventListener("DOMContentLoaded", (event) => {
    initializeHistory().then(r => {
        console.log('r', r)
    });
});


function initializeHistory(){
    console.log('id', localStorage.getItem('id'))
    return new Promise(() => {
        fetch('https://la-malle.app/api/gethistory.php', {
            method: 'POST',
            headers: {
                "Authorization" : "Bearer <JWT>"
            },
            body: {
                id: localStorage.getItem('id')
            }
        }).then( response => {
            response.json().then(data => console.log(data))
        })
    })
}