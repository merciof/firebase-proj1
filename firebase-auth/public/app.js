var provider =  new firebase.auth.GoogleAuthProvider();
const btnLogin = window.document.getElementById('btnLogin');
const btnLogout = window.document.getElementById('btnLogout');
var user;

btnLogin.addEventListener('click', e => {
    firebase.auth().signInWithPopup(provider).then(result => {
        user = result.user; 
        //log user into
        window.console.log('Our logged in user: ' + JSON.stringify(user));

    }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.console.log('Error: ' + errorCode + '- - ' + errorMessage);
    })
});

btnLogout.addEventListener('click', e => {
    if(user) {
        firebase.auth().signOut().then(function(){
            user = null;
            window.console.log('successfull sign-out');
        }).catch(error => {
            //ann error happened
            window.console.log('error in sign-out');
        })
    }
})

