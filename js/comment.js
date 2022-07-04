$(function() {
    modal_html = makeModal('Detail', '1000', '1000', $('#include_comment').html());
    console.log(modal_html);
    $('#include_comment').empty();
    $('#include_comment').append(modal_html);
});


function get_comment(article_id,img,title) {
   $.ajax({
       type: "GET",
       url: "http://127.0.0.1:8000/article/comment/"+article_id,
       data: {},
       success: function (response) {
           console.log(response)
           let img_url = img
           let title_name = title
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
               let writer_id = response[i]['user']
               let content = response[i]['content']
               let created_at = response[i]['created_at']
               let temp_cm = `
               <div class="media-body" id="comment_box" style="margin-top:10px;margin-bottom:5px;">
                 <p class="mt-0">${content}</p><span>    작성자 ID:${writer_id}    </span> <span> - ${created_at}</span>
               </div><div style="width:100%;height:1px;background-color:grey;"></div>`;
               $('#detail-box').append(temp_cm);
            // window.location.href = '/article/comment/'+article_id
       }}
   })
}

function post_comment() {
    let comment = $('#my-comment').val()
    let form_data = new FormData()

    form_data.append("comment", comment)
    console.log(form_data)

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/comment/1/",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response)
            alert(response["result"])
            if (response["result"] == '댓글 작성 완료!') {
                window.location.href = '/'
            } else {
                window.location.href = '/'
            }
        }
    });
 }