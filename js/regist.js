define(["jquery"],function($){
  function registSend(){
    $("#registBtn").click(function(){
      $.ajax({
        type:"post",
        url:"./php/regist.php",
        data:{
          phonenumber:$(".pb .number").val(),
          password:$(".pw .password").val(),
          repassword:$(".repw .repassword").val(),
          createtime:(new Date()).getTime()
        },
        success:function(result){
          var obj = JSON.parse(result);
          if(obj.code){
            $(".signInBox .err-msg").attr("class","err-msg err-msg-danger")
          }else{
            $(".signInBox .err-msg").attr("class","err-msg err-msg-success")
          }
          $(".signInBox").find($(".err-msg")).show().html(obj.msg)
        },
        error:function(msg){
          console.log(msg)
        }
      })
    })
  }
  return {
    registSend:registSend
  }
})