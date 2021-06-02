if (window.localStorage.getItem('jwt') === null){
    window.location = '/connexion.html';
}


function disconect (){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    window.location.href = '/'
}