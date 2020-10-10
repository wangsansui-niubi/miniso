console.log("加载成功");

require.config({
  paths:{
    jquery:"jquery-1.11.3",
    "jquery-cookie":"jquery.cookie",
    goods:"goods"
  },
  shim:{
    "jquery-cookie":["jquery"]
  }
})
require(["goods"],function(goods){
  goods.download()
})