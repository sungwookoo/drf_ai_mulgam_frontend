$(document).ready(function () {
    get_mygallery();
    console.log(1)
})

function get_mygallery() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/mygallery/",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++){
                let title = response[i]['title']
                console.log(2)
                let img_url = response[i]['img_url']
                let article_id = response[i]['id']
                let temp_myg = `<div class="feed_box">
                <a><div class="feed"><img src="${img_url}" width="300" height="300"></div></a>
                <div class="feed_title">${title}</div>
                <div class="button_box">
                    <a><button class="delete_button" onclick="delete_mygallery(${article_id})">delete</button></a>
                </div>
            </div>`
                $('#mygallery_painting').append(temp_myg);
        }}
    })
}

function delete_mygallery(article_id) {
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:8000/article/mygallery/"+article_id,
        data: {},
        success: function (response) {
            alert('삭제 완료')
            window.location.href = '/'
            }
    })
}