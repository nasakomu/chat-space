$(function(){
  function buildHTML(message){
    if (message.image_url) {
      let html = `<div class="MainChatList">
                    <div class="MainChatList__nameField">
                      <p class="MainChatList__name">${message.user_name}</p>
                      <p class="MainChatList__timeStamp">${message.created_at}</p>
                    </div>
                    <div class="MainChatList__messageBox">
                      <p class="MainChatList__message">${message.content}</p>
                      <img src="${message.image_url}" class="MainChatList__image">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="MainChatList">
                    <div class="MainChatList__nameField">
                      <p class="MainChatList__name">${message.user_name}</p>
                      <p class="MainChatList__timeStamp">${message.created_at}</p>
                    </div>
                    <div class="MainChatList__messageBox">
                      <p class="MainChatList__message">${message.content}</p>
                    </div>
                  </div>`
      return html;
    }
  }

 $('.MainMessageForm').on('submit',function(e){
   e.preventDefault();
   let formData = new FormData(this);
   let url = $(this).attr('action');
   $.ajax({
    type: "POST",
    url: url,
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
   })
   .done(function(message){
     let html = buildHTML(message);
     $(".MainChatField").append(html);
     $(".MainMessageForm")[0].reset();
     $(".MainChatField").animate({ scrollTop: $(".MainChatField")[0].scrollHeight});
   })
   .fail(function() {
     alert("メッセージ送信に失敗しました");
   })
   .always(function() {
     $(".MainMessageForm__SendBtn").attr("disabled", false);
   });
 });
});