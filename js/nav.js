$(function () {
    $('#include_login').load("login.html", function () {
        model_html = makeModal('Login', '400', '550', $('#include_login').html());
        $('#include_login').empty()
        $('#include_login').append(model_html)
    });

    $('#include_signup').load("signup.html", function () {
        model_html = makeModal('Signup', '400', '635', $('#include_signup').html());
        $('#include_signup').empty()
        $('#include_signup').append(model_html)
    });

    modal_html = makeModal('WhyClick', '600', '700', $('#whyclick').html());
    $('#whyclick').empty()
    $('#whyclick').append(modal_html)
});

function showSignup() {
    $('#loginModal').modal('hide');
    $('#signupModal').modal('show');
}

function showLogin() {
    $('#signupModal').modal('hide');
    $('#loginModal').modal('show');
}

