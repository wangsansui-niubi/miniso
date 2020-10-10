console.log("加载成功")

require.config({
  paths:{
    "jquery":"jquery-1.11.3",
    "regist":"regist"
  }
})

require(["regist"],function(regist){
  regist.registSend();
})