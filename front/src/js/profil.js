window.addEventListener("DOMContentLoaded", (event) => {
    initializeProfil();
    document.getElementById('firstname').addEventListener("change", function () {
        newData.newname = document.getElementById('firstname').value;
    });
    document.getElementById('lastname').addEventListener("change", function () {
        newData.newlastname = document.getElementById('lastname').value;
    });
    document.getElementById('email').addEventListener("change", function () {
        newData.newmail = document.getElementById('email').value;
    });
});

function initializeProfil() {
    return new Promise(() => {
        fetch('https://la-malle.app/api/getuser.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: localStorage.getItem('id')
            })
        }).then(response => {
            response.json().then(data => {
                document.getElementById('firstname').value = data[0].Name;
                document.getElementById('lastname').value = data[0].Lastname;
                document.getElementById('email').value = data[0].Mail;
            });
        })
    })
}

let newData = {
    newname: "",
    newlastname: "",
    newmail: ""
};



function saveProfil() {
    return new Promise(() => {
        fetch('https://la-malle.app/api/setuser.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: localStorage.getItem('id'),
                ...newData
            })
        }).then(response => {
            response.json().then(data => {
                if (data == "done" && newData.newname){
                    localStorage.setItem('user', newData.newname);
                } else {

                }
            });
        })
    })
}