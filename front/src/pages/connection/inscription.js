window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById('inscription').onsubmit = event => onSubmitInscription(event)
});

function onSubmitInscription(event) {
  event.preventDefault();

  const password = document.getElementById("mdp").value;
  const repeatPassword = document.getElementById("repeatemdp").value;

  if (Object.is(password, repeatPassword)) {
    const formData = new FormData(event.target);

    return new Promise(() => {
      fetch("https://la-malle.app/api/register.php", {
        method: "POST",
        body: formData
      })
          .then(res => {
            if (res.ok)
              console.log(res)
            else
              console.log(res.text());
          })
    })
  }
}