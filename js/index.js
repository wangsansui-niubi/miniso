define(["jquery","jquery-cookie"],function($){
  function body(){
    $(function(){

      //加载数据
      $.ajax({
        url:"./data/index.json",
        success:function(arr){
          for(var i = 0;i < arr.length;i++){
            var node = $(`
              <div class="goodsBox">
                <div class="goods">
                  <div class="nav">
                    <h2>${arr[i].h2}</h2>
                    <ul>

                    </ul>
                    <a href="">查看更多&nbsp;></a>
                  </div>
                  <div class="banner">
                    <a href=""><img src="${arr[i].topimg}" alt=""></a>
                  </div>
                  <div class="goodslist">
                    
                  </div>
                </div>
              </div>
                
            `)
            node.appendTo($(".goodsList"))
            var navArr = arr[i].nav
            var str = ``
            for(var k = 0; k < navArr.length; k++){
              str +=`
              <li><a href="">${navArr[k]}</a></li>
              `
            }
            node.find(".nav ul").html(str);
            var childsArr = arr[i].childs
            var str1 = ``
            for(var j = 0; j < childsArr.length;j++){
              str1 +=
              `
              <div class="item">
                <div class="imgBox"><a href="goods.html?product_id=${childsArr[j].id}" id = "${childsArr[j].id}"><img src="${childsArr[j].img}" alt=""></a></div>
                <a href="goods.html?product_id=${childsArr[j].id}" id="title">${childsArr[j].desc}</a>
                <span class="price">${childsArr[j].price}</span>
              </div>
              
              `
            }
            node.find(".goodslist").html(str1)
          } 
           

        },
        error:function(msg){
          console.log(msg)
        }
      })

      var oBtns = $(".ban").find("ol li");
      var oUl = $(".ban").find("ul");
      var tabBtns = $(".ban").find(".tabBtn span");
      var iNow = 0;

      autoPlay()

      $(".ban").mouseenter(function(){
        clearInterval(timer);
      })

      $(".ban").mouseleave(function(){
        autoPlay()
      })
      oBtns.click(function(){
        iNow = $(this).index();				
        tab();
      })
      tabBtns.eq(0).click (function(){
        iNow--;
        tab();
      })
      function autoPlay(){
        timer = setInterval(function(){
          iNow++;
          tab();
        },2000)
      }

      function tab(){
        oBtns.removeClass("active").eq(iNow).addClass("active");
        oUl.animate({left:iNow * -1090},500,function(){
          if(iNow == oBtns.size()){
            iNow = 0;
            oUl.css("left",0)
          }
        })
        if(iNow == oBtns.size()){
          oBtns.eq(0).addClass("active");
        }
      }
    })
  }
  return {
    body:body
  }
})