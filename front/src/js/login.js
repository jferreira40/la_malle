if (window.localStorage.getItem('seeSteps') !== 'true' || window.localStorage.getItem('seeSteps') === null)
    window.location = 'steps.html';

function displayInscription() {
    window.location = 'inscription.html';
}

function onSubmitLogin() {

    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('mdp').value
    }

    return new Promise(() => {
        fetch("https://la-malle.app/api/login.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if(response.status === 200) {
                    response.json().then(data => {
                        localStorage.setItem('jwt', data['jwt']);
                        localStorage.setItem('user', data['User']);
                        localStorage.setItem('id', data['Id']);
                        window.location.href = '/'
                    });

                } else {
                    response.json().then(data => {
                        document.getElementById('message').textContent = data.message;
                        document.getElementById('error').style.display = 'block';
                        setTimeout(function(){
                            document.getElementById('error').style.display = 'none';
                        },5000);
                    });
                }
            })
    })

}
