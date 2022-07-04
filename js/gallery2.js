$(document).ready(function () {
    get_gallery2();
})

function get_gallery2() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/gallery2/",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++){
                let title = response[i]['title']
                let img_url = response[i]['img_url']
                let article_id = response[i]['id']
                let temp_g2 = `<div class="feed_box">
                <a><div class="feed"><img src="${img_url}" width="300" height="300"></div></a>
                <div class="feed_title">${title}</div>
                <div class="button_box">
                    <a><button class="put_button" onclick="put_gallery2(${article_id})">edit</button></a>
                    <a><button class="delete_button" onclick="delete_gallery2(${article_id})">delete</button></a>
                </div>
            </div>`
                $('#gallery2_painting').append(temp_g2);
        }}
    })
}

function post_gallery2() {
    let title = $('#title').val()
    let file1 = $('#file1')[0].files[0]
    let file2 = $('#file2')[0].files[0]
    let form_data = new FormData()

    form_data.append("title", title)
    form_data.append("file1", file1)
    form_data.append("file2", file2)

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/gallery2/",
        data: form_data,
        dataType: "json",
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

function put_gallery2(article_id) {
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:8000/article/gallery2/"+article_id,
        data: {},
        success: function (response) {
            alert('업데이트 완료')
            window.location.href = '/'
            }
    })
}

function delete_gallery2(article_id) {
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:8000/article/gallery2/"+article_id,
        data: {},
        success: function (response) {
            alert('삭제 완료')
            window.location.href = '/'
            }
    })
}