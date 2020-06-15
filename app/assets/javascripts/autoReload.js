$(function(){

  function buildHTML(message){
    if (message.image_url) {
      let html = `<div class="MainChatList" data-message-id=${message.id}>
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
      let html = `<div class="MainChatList" data-message-id=${message.id}>
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
  // 一定時間ごとに最新のメッセージを非同期通信で取得する関数を定義
 let reloadMessages = function() {
  let last_message_id = $('.MainChatList:last').data("message-id");
  $.ajax({
   type: 'GET',
   url: 'api/messages',
   data: { id: last_message_id },
   dataType: 'json'
  })
  .done(function(messages){
    if (messages.length !== 0) {
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $(".MainChatField").appent(insertHTML);
      $(".MainChatField").animate({ scrollTop: $(".MainChatField")[0].scrollHeight});
    }
  })
  .fail(function(){
    alert("error");
  });
 };
 // 一定時間ごとに最新のメッセージを非同期通信で取得する処理
 setInterval(reloadMessages, 7000);
});