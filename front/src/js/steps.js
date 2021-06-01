let count = 1;

function nextStep() {
    if(count != 3) {
        document.getElementById(`step${count+1}`).style.display = "block";
        document.getElementById(`step${count}`).style.display = "none";

        count++;
    } else{
        localStorage.setItem('seeSteps', 'true');
        window.location = "login.html";
    }
}

function clickPass() {
    localStorage.setItem('seeSteps', 'true');
    window.location = "login.html";
}