let count = 1;

function nextStep() {
    if (count != 3) {
        document.getElementById(`step${count + 1}`).style.display = "block";
        document.getElementById(`step${count}`).style.display = "none";


        let body = document.getElementsByTagName('body')[0];

        body.classList.remove(`step${count}`);

        count++;

        body.classList.add(`step${count}`);
    } else {
        localStorage.setItem('seeSteps', 'true');
        window.location = "connexion.html";
    }
}

function clickPass() {
    localStorage.setItem('seeSteps', 'true');
    window.location = "connexion.html";
}