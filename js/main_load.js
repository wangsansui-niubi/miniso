console.log("加载成功");
require.config({
  paths:{
    "jquery":"jquery-1.11.3",
    "load":"load"
  }
})

require(["load"],function(load){
  load.loginGet()
})