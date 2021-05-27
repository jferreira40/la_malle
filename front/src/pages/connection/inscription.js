window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('inscription').onsubmit = event => onSubmitInscription(event)
});

function onSubmitInscription(event) {
    event.preventDefault();

    const password = document.getElementById("mdp");
    const repeatPassword = document.getElementById("repeatemdp");

    if (Object.is(password.value, repeatPassword.value)) {

        if (password.classList.contains('border-red')) {
            password.classList.remove('border border-red');
            repeatPassword.classList.remove('border border-red');
        }

        const formData = new FormData(event.target);

        return new Promise(() => {
            fetch("https://la-malle.app/api/register.php", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            localStorage.setItem('jwt', data['jwt']);
                            localStorage.setItem('user', data['User']);
                            localStorage.setItem('id', data['Id']);
                            window.location.href = 'http://localhost:3000'
                        });
                    } else {
                        response.json().then(data => {
                            document.getElementById('message').textContent = data.message;
                            document.getElementById('error').style.display = 'block';
                            setTimeout(function () {
                                document.getElementById('error').style.display = 'none';
                            }, 5000);
                        });
                    }
                })
        })
    } else {
        document.getElementById('message').textContent = 'Vos mots de passes doivent correspondre';
        password.classList.add('border border-red');
        repeatPassword.classList.add('border border-red');
        document.getElementById('error').style.display = 'block';
        setTimeout(function () {
            document.getElementById('error').style.display = 'none';
        }, 5000);
    }
}