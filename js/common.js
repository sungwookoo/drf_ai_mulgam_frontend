/***
modal로 둘러 쌓인 html을 리턴
title : 모달의 id의 일부로 사용 될 문자열
width : 모달의 width
height : 모달의 height
html : 모달로 둘러쌀 html


#### example #####

<script>
$(function() {
    modal_html = makeModal('WhyClick', '1000', '1000', $('#whyclick').html());
    console.log(modal_html);
    $('#whyclick').empty();
    $('#whyclick').append(modal_html);
});
</script>

<body>
    <a data-bs-toggle="modal" data-bs-target="#whyclickModal">
        some html...
    </a>
</body>

$('#include_signup').load("signup.html", function () {
    model_html = makeModal('Signup', '800', '600', $('#include_signup').html());
    $('#include_signup').empty()
    $('#include_signup').append(model_html)
});

***/

function makeModal(title, width, height, html) {
    id = title.toLowerCase();
    id.replace(" ","");
    return `<div class="modal fade" id="`+id+`Modal" tabindex="-1" aria-labelledby="`+id+`ModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="height:`+height+`px; max-width:none; width:`+width+`px; ">
            <div class="modal-content" style="height:100%">
                <div class="modal-header">
                    <h5 class="modal-title" style="font-family: Jua" id="`+id+`ModalLabel">`+title+`</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">`
                + html +               
                `</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `
}