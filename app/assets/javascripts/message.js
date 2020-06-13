$(function(){
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
 });
});