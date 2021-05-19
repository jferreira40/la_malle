let count = 1;

function displayInscription() {
    window.location = 'inscription.html';
}

function nextStep() {
    if(count != 3) {
        document.getElementById(`step${count+1}`).style.display = "block";
        document.getElementById(`step${count}`).style.display = "none";

        count++;
    } else{
        window.location = "login.html";
    }
}