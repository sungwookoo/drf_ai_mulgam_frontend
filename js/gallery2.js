$(document).ready(function () {
    get_gallery2();
})

function get_gallery2() {
    let user_id;
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/gallery2/",
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let title = response[i]['title']
                let img_url = response[i]['img_url']
                let user = response[i]['user']
                let article_id = response[i]['id']
                console.log(user)
                let temp_g2;
                if (localStorage.getItem("payload") != null) {
                    if ((user_id == user)) {
                        temp_g2 = `<div class="feed_box">
                <div class="feed">
                    <a style="float:right" class="nav-comment" data-bs-toggle="modal" data-bs-target="#detailModal">
                        <img src="${img_url}"
                            width="300" height="300" onclick="get_comment(${article_id},'${img_url}','${title}')">
                    </a>
                </div>
                <div class="feed_title">${title}</div>
                <div class="button_box"><a><button data-bs-toggle="modal" data-bs-target="#edits${i}"
                class="put_button">edit</button></a>
        <a><button class="delete_button" onclick="delete_gallery2(${article_id})">delete</button></a></div>
                </div > `} else {
                        temp_g2 = `<div class="feed_box">
                <div class="feed">
                    <a style="float:right" class="nav-comment" data-bs-toggle="modal" data-bs-target="#detailModal">
                        <img src="${img_url}"
                            width="300" height="300" onclick="get_comment(${article_id},'${img_url}','${title}')">
                    </a>
                </div>
                <div class="feed_title">${title}</div>
                <div class="button_box"></div>
                </div>`}

                } else {
                    temp_g2 = `<div class="feed_box">
                    <div class="feed">
                        <a style="float:right" class="nav-comment" data-bs-toggle="modal" data-bs-target="#detailModal">
                            <img src="${img_url}"
                                width="300" height="300" onclick="get_comment(${article_id},'${img_url}','${title}')">
                        </a>
                    </div>
                    <div class="feed_title">${title}</div>
                    <div class="button_box"></div>
                    </div>`

                }
                $('#gallery2_painting').append(temp_g2);



                let modal_g2 = `<div class="modal fade" id="edits${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="height:720px; max-width: none; width:1000px">
                    <div class="modal-content g2modal" style="height:100%">
                        <div class="modal-header">
                            Edit
                        </div>
                        <div class="modal-body">
                            <div class="put-modal">
                                <div class="put-img"><img src="${img_url}" width="500" height="500"></div>
                                <div class="put-input-box">
                                    <input id="edittitles${i}" type="text" class="put-input" placeholder="변경할 제목을 입력하세요">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button onclick="put_gallery2(${article_id},${i})" class="put-btn">Edit</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
                $('#editsmodal').append(modal_g2);

            }
        }
    }
    )
}

function post_gallery2() {
    const payload = JSON.parse(localStorage.getItem("payload"));
    let user_id = payload.user_id;
    let title = $('#title').val()
    let file1 = $('#file1')[0].files[0]
    let file2 = $('#file2')[0].files[0]
    // &&, || 
    if (file1 == undefined || file2 == undefined) {
        alert("파일을 두개 모두 선택해야합니다.");
        return false;
    }

    let form_data = new FormData()

    form_data.append("title", title)
    form_data.append("file1", file1)
    form_data.append("file2", file2)
    form_data.append("user", user_id)


    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/gallery2/",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        error: function () {
            alert("error")
            window.location.reload();
        },
        success: function () {
            alert("작품이 게시되었습니다.")
            window.location.reload();
        }
    });
}

function put_gallery2(article_id, i) {
    let title = $('#edittitles' + i).val()
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:8000/article/gallery2/" + article_id,
        data: { 'title': title },
        success: function (response) {
            alert('업데이트 완료')
            window.location.reload();
        }
    })
}

function delete_gallery2(article_id) {
    const payload = JSON.parse(localStorage.getItem("payload"));
    let user_id = payload.user_id;
    console.log(user_id);
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1:8000/article/gallery2/" + article_id,
        data: {},
        success: function (response) {
            alert('삭제 완료')
            window.location.reload();
        }
    })
}

