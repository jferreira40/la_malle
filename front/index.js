window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('name').textContent = localStorage.getItem('user');
});
