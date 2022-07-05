$(document).ready(function () {
    get_mygallery();

})

function get_mygallery() {
    var token = localStorage.getItem("access_token")
    let user_id;
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/mygallery/",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let title = response[i]['title']
                let img_url = response[i]['img_url']
                let user = response[i]['user']
                let article_id = response[i]['id']
                if (localStorage.getItem("payload") != null) {
                    if ((user_id == user)) {
                        temp_myg = `<div class="feed_box">
                    <div class="feed">
                    <img src="${img_url}" width="300" height="300" onclick="get_comment(${article_id},${img_url},${title})">
                    </div>
                <div class="feed_title">${title}</div>
                <div class="button_box">
                    <a><button class="delete_button" onclick="delete_mygallery(${article_id})">delete</button></a>
                </div>
                </div>
                </div>`} else { temp_myg = `<div> 1 </div>` }
                } else { temp_myg = `<div> 2 </div>` }

                $('#mygallery_painting').append(temp_myg);
            }
        }
    })
}

function delete_mygallery(article_id) {
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:8000/article/mygallery/" + article_id,
        data: {},
        success: function (response) {
            alert('삭제 완료')
            window.location.reload();
        }
    })
}