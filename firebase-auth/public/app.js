//obtém uma instância do objeto provider (Google Auth)
var provider = new firebase.auth.GoogleAuthProvider();
var user;

// //cria referências para os elementos HTML
const txtEmail = window.document.getElementById('txtEmail');
const txtPassword = window.document.getElementById('txtPassword');
const btnEmailLogin = window.document.getElementById('btnEmailLogin');
const btnCreateAccount = window.document.getElementById('btnCreateAccount');
// const btnLogout = window.document.getElementById('btnLogout');

//email user sign-in event
btnEmailLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            user = result;
            window.document.getElementById('msg').innerHTML = 'Seja bem vindo(a), ' + result.user.email;
            window.document.getElementById('txtEmail').value = '';
            window.document.getElementById('txtPassword').value = '';
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.errorMessage;
            window.console.log('Email Sign-in Error: ' + errorCode + '--' + errorMessage);
            const erroLoginMsg = 'Email ou senha inválidos';
            window.document.getElementById('msg').innerHTML = erroLoginMsg;
        });
});

//create 'email login' user account event
btnCreateAccount.addEventListener('click', e => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            var welcomeMsg = 'Obrigado por registrar-se ' + result.user.email +
                '! Agora você pode fazer log in no sistema! ';
            window.console.log(result);
            window.console.log(welcomeMsg);
            window.document.getElementById('msg').innerHTML = welcomeMsg;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.console.log('Error: ' + errorCode + '- - ' + errorMessage);
            // window.document.getElementById('msg').innerHTML = 'Error: ' + errorCode + '- - ' + errorMessage;
            const errorCreateAccountMsg = 'Email inválido ou senha muito curta.';
            window.document.getElementById('msg').innerHTML = errorCreateAccountMsg;
        });
});


//Google account Log in
btnLogin.addEventListener('click', e => {
    firebase.auth().signInWithPopup(provider).then(result => {
        user = result.user;
        //log user into
        const welcomeMsg = 'Seja bem vindo, ' + user.displayName;
        window.document.getElementById('msg').innerHTML = welcomeMsg;
        window.console.log('Our logged in user: ' + JSON.stringify(user));
    }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.console.log('Error: ' + errorCode + '- - ' + errorMessage);
    });
});

btnLogout.addEventListener('click', e => {
    if (user) {
        firebase.auth().signOut().then(function (result) {
            const byebyeMsg = 'Obrigado pela visita! ' + 'Volte sempre!';
            window.document.getElementById('msg').innerHTML = byebyeMsg;
            user = null;
        }).catch(error => {
            //ann error happened
            var errorCode = error.code;
            var errorMessage = error.message;
            window.console.log('Error: ' + errorCode + '- - ' + errorMessage);
        });
    };
});

