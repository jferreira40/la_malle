window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('inscription').onsubmit = () => {
    inscription(event);
  }
});

function displayInscription() {
  window.location = 'inscription.html';
}

function inscription(event) {
  event.preventDefault();
  const mdp = document.getElementById('mdp').value;
  const repeat = document.getElementById('repeatemdp').value;

  console.log(mdp);
  console.log(repeat)
  if(mdp === repeat) {
    const form = document.getElementById("inscription");
    const formData = new FormData(form);

    console.log(formData);
    /*fetch("http://34.105.145.42/api/register.php", {
      method: "POST",
      body: formData
    })*/
  }
}
