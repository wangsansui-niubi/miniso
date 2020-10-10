// const { json } = require("express")

define(["jquery"],function($){
  function loginGet(){
    $("#login").click(function(){
      $.ajax({
        type:"post",
        url:"./php/load.php",
        data:{
          phonenumber:$(".x-phone input").val(),
          password:$(".x-password input").val()
        },
        success:function(result){
          var obj = JSON.parse(result);
          if(obj.code){
            $(".border .err-msg").attr("class","err-msg err-msg-danger");
          }else{
            $(".border .err-msg").attr("class","err-msg err-msg-success");
          }
          $(".border .err-msg").show().html(obj.msg);
        },
        error:function(msg){
          console.log(msg)
        }
      })
    })
  }
  return {
    loginGet:loginGet
  }
})