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

  $("#UserSearch__field").on("keyup", function() {
    let input = $(this).val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
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
});