$(function() {
    modal_html = makeModal('Detail', '1000', '1000', $('#include_comment').html());
    console.log(modal_html);
    $('#include_comment').empty();
    $('#include_comment').append(modal_html);
});


function get_comment(article_id,img,title) {
    // let user_id;
    // if (localStorage.getItem("payload") != null) {
    //   const payload = JSON.parse(localStorage.getItem("payload"));
    //   user_id = payload.user_id;
    // }
    var token = localStorage.getItem("access_token")
   $.ajax({
       type: "GET",
       url: "http://127.0.0.1:8000/article/comment/"+article_id,
       beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
       data: {},
       success: function (response) {
           console.log(response)
           let img_url = img
           let title_name = title
           $('#detail-box').empty()
           let temp_dt = `<class="mt-3 form-floating">
           <img src=${img_url} style="margin-left:40%">
           <h5 style="margin-left:40%"> 제목 : ${title_name}</h5>
           <textarea class="form-control" cols="30" rows="5" id='my-comment' name='my-comment' placeholder="댓글을 작성 해 주세요"
           style="resize:none;"></textarea>
            <button class="mt-3 mb-3 w-100 btn btn-lg btn-secondary" type="button" onclick="post_comment(${article_id})">
                등록
            </button>`
           $('#detail-box').append(temp_dt)
           for (let i = 0; i < response.length; i++){
               let user = response[i]['user']
               let content = response[i]['content']
               let created_at = response[i]['created_at']
               let comment_id = response[i]['id']
               console.log(comment_id)
               let temp_cm = `
               <div style="width:100%;height:1px;background-color:grey;"></div>
               <div class="media-body" id="comment_box" style="margin-top:10px;margin-bottom:5px;">
                 <p class="mt-0" id="target-comment">${content}</p><span>작성자 :${user} / </span> <span> - ${created_at}</span>
               </div>`;
               $('#detail-box').append(temp_cm);
            //    let temp_button=`<div style="float: right; margin-right:5px;">
            //                       <a onclick="put_comment(${comment_id})">
            //                         <span class="badge bg-danger" style="background-color: #00B4CC!important;">수정</span>
            //                       </a>
            //                     </div>
            //                     <div style="float: right" id="delete_box">
            //                     <a onclick="delte_comment(${comment_id})">
            //                       <span class="badge bg-danger" style="background-color: #FF4E10!important;">삭제</span>
            //                     </a>
            //                   </div>`

            //    if (localStorage.getItem("payload") != null) {
            //     if ((user_id == user)) {
            //         $('#comment_box').append(temp_button);
            //     }
            // }
       }}
   })
}

function post_comment(article_id) {
    let content = $('#my-comment').val()
    var formData = new FormData();
    formData.append('content',content)
    // 데이터 전송 
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/comment/"+article_id,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response)
            alert(response["result"])
            if (response["result"] == '댓글 작성 완료!') {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    });
}

// function put_comment(comment_id) {
//     console.log(comment_id)
//     // let content = $('#target-comment'+comment_id).val()
//     // let temp_ct = `<textarea class="form-control" cols="30" rows="5" id='my-comment' name='my-comment' placeholder="댓글을 작성 해 주세요"
//     // style="resize:none;"></textarea>
//     //  <button class="mt-3 mb-3 w-100 btn btn-lg btn-secondary" type="button" onclick="post_comment(${article_id})">
//     //      등록
//     //  </button>`
//     //  $('#detail-box').append(temp_ct)
//     //  let new_content = $('#target-comment'+comment_id).val()
//     $.ajax({
//         type: "PUT",
//         url: "http://127.0.0.1:8000/article/comment/"+comment_id,
//         data: {},
//         success: function (response) {
//             alert('업데이트 완료')
//             window.location.reload();
//         }
//     })
// }