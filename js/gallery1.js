$(document).ready(function () {
    get_gallery1();
})

function get_gallery1() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/gallery1/",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let title = response[i]['title']
                let img_url = response[i]['img_url']
                let article_id = response[i]['id']
                let temp_g1 = `<div class="feed_box">
                <a><div class="feed"><img src="${img_url}" width="300" height="300"></div></a>
                <div class="feed_title">${title}</div>
                <div class="button_box">
                    <a><button class="put_button" onclick="put_gallery1(${article_id})">edit</button></a>
                    <a><button class="delete_button" onclick="delete_gallery1(${article_id})">delete</button></a>
                </div>
            </div>`
                $('#gally1_painting').append(temp_g1);
            }
        }
    })
}

function post_gallery1() {
    let title = $('#title').val()
    let num = $('#num').val()
    let file = $('#file')[0].files[0]
    let form_data = new FormData()

    form_data.append("title", title)
    form_data.append("num", num)
    form_data.append("file", file)

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/gallery1/",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
            if (response["result"] == '업로드 완료!') {
                window.location.href = '/'
            } else {
                window.location.href = '/'
            }
        }
    });
}

function put_gallery1(article_id) {
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:8000/article/gallery1/" + article_id,
        data: {},
        success: function (response) {
            alert('업데이트 완료')
            window.location.href = '/'
        }
    })
}

function delete_gallery1(article_id) {
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:8000/article/gallery1/" + article_id,
        data: {},
        success: function (response) {
            alert('삭제 완료')
            window.location.href = '/'
        }
    })
}