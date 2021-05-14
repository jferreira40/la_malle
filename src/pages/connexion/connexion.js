function displayInscription() {
  window.location = 'inscription.html';
}

function inscription(){
  const form = document.getElementById("inscription");
  const formData = new FormData(form);
  console.log(formData);
}
