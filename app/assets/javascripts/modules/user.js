$(function(){
  function buildHTML(user) {
    if (user.length !== 0 ) {
      let html = `<div class="ChatMember clearfix">
                    <p class="ChatMember__name">${user.name}</p>
                    <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`;
      return html;
    } else {
      let html = `<div class="ChatMember clearfix">
                    <p class="ChatMember__name">ユーザーが見つかりません</p>
                  </div>`;
      return html;
    }
  }

  function addGroupUser(data) {
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${data['userName']}</p>
                  <input name="group[user_ids][]" type="hidden" value="${data['userId']}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>`;
    $(".ChatMembers").append(html);
  }

  // チャットメンバー追加のインクリメンタルサーチ
  $("#UserSearch__field").on("keyup", function() {
    let input = $(this).val();
    let added_user_ids = $(".ChatMember input").map(function(){
      return $(this).val();
    }).get();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input, user_ids: added_user_ids},
      dataType: "json"
    })
    .done(function(users){
      $("#UserSearchResult").empty();
      if (users.length !== 0 ) {
        users.forEach(function(user){
          let html = buildHTML(user);
          $("#UserSearchResult").append(html);
        })
      } else if (input.length == 0) {
        return false;
      } else {
        let html = buildHTML(users);
        $("#UserSearchResult").append(html);
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    })
  });

  // ユーザー検索の結果から選択したユーザーをチャットメンバーに追加する
  $("#UserSearchResult").on("click", ".ChatMember__add", function(){
    const data = $(this).data();
    $(this).parent().remove();
    addGroupUser(data);
  });
  // 削除ボタンを押すと、チャットメンバーが削除される
  $(".ChatMembers").on("click", ".ChatMember__remove", function(){
    $(this).parent().remove();
  });
});