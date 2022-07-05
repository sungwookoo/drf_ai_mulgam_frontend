backend_base_url = "http://3.34.48.116:8000"
// backend_base_url = "http://127.0.0.1:8000"
// frontend_base_url = "http://127.0.0.1:5500"

$(document).ready(function () {
});

function getUserInfo(user_id) {
    $.ajax({
        type: "POST",
        url: `${backend_base_url}/user/api/userinfo/`,
        data: { user_id: user_id },
        success: function (response) {
            $('#a_mypage').text(response['username'] + " 님");
            console.log(response['username']);
        }
    });
}

window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    getUserInfo(payload.user_id)

    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)) {
        // $('#a_login').hide()
        // $('#a_signup').hide()
    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    "refresh": localStorage.getItem("refresh_token")
                })
            }
            );
            return response.json();
        };


        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken(`${backend_base_url}/user/api/token/refresh/`).then((data) => {
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            const refreshToken = data.refresh;
            localStorage.setItem("access_token", accessToken);

            const base64Url = data.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            localStorage.setItem("payload", jsonPayload);
            localStorage.setItem("refresh_token", refreshToken);
            console.log("성공!! : " + accessToken);
        });
    }
};

function email_check(email) {

    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return reg.test(email);

}

async function handleSignup() {
    let username = document.getElementById("signup_username").value;
    let password = document.getElementById('signup_password').value;
    let email = document.getElementById('signup_email').value;
    let fullname = document.getElementById('signup_fullname').value;

    const signupData = {
        username: document.getElementById("signup_username").value,
        password: document.getElementById('signup_password').value,
        email: document.getElementById('signup_email').value,
        fullname: document.getElementById('signup_fullname').value,
    }

    console.log(signupData);
    if ((signupData['username'] == '') || (signupData['username'].length < 4)) {
        alert('username 형식이 잘못되었습니다. 4자 이상')
        return false;
    }
    if ((signupData['email'] == '') || (!email_check(signupData['email']))) {
        alert('이메일 형식이 잘못되었습니다.')
        return false;
    }


    if ((signupData['password'] == '') || (signupData['password'].length < 8)) {
        alert('비밀번호 형식이 잘못되었습니다.. 8자 이상')
        return false;
    }
    if (signupData['fullname'] == '') {
        alert('fullname 형식이 잘못되었습니다.')
        return false;
    }


    const response = await fetch(`${backend_base_url}/user/api/signup/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )

    response_json = await response.json()


    if (response.status == 200) {
        // window.location.replace(`${frontend_base_url}/home.html`);
        alert('회원가입되었습니다.')
        $('#signupModal').modal('hide');
    } else {
        alert(response.status)
    }
}


async function handleLogin() {
    if (document.getElementById("login_username").value == '' || document.getElementById('login_password').value == '') {
        alert('입력되지 않은 필드가 존재합니다.')
        return false;
    }

    const loginData = {
        username: document.getElementById("login_username").value,
        password: document.getElementById('login_password').value
    }

    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    });

    response_json = await response.json()

    if (response.status == 200) {
        alert("로그인 되었습니다.")
        localStorage.setItem("access_token", response_json.access)
        localStorage.setItem("refresh_token", response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        location.reload();
        // window.location.replace(`${frontend_base_url}/`);
    } else {
        alert('존재하지 않는 사용자명 또는 잘못된 패스워드입니다.')
        // alert(response.status)
    }
}


async function handleLogout() {
    let bearer = 'Bearer ' + localStorage.getItem('access_token');
    const token_data = {
        refresh_token: localStorage.getItem('refresh_token')
    }
    console.log(bearer);
    const response = await fetch(`${backend_base_url}/user/api/logout/`, {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': bearer
        },
        method: 'POST',
        body: JSON.stringify(token_data)
    });
    if (response.status == 200) {
        localStorage.removeItem('payload');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert("로그아웃 되었습니다.")

        location.reload();
        // window.location.replace(`${frontend_base_url}/`);
        // changeNavAuth();
    } else {
        alert(response.status)
    }
}


async function checkAuth() {

}