const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));

    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)) {
        console.log(payload.exp)
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

async function handleSignup() {

    const signupData = {
        username: document.getElementById("signup_username").value,
        password: document.getElementById('signup_password').value,
        email: document.getElementById('signup_email').value,
        fullname: document.getElementById('signup_fullname').value,
    }

    console.log(signupData);


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
        // window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
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
        // changeNavAuth();
    } else {
        alert(response.status)
    }
}


async function checkAuth() {

}