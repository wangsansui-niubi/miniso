define(["jquery","jquery-cookie"],function($){
  

    function download(){
      $(function(){
        goods_msg()
        sc_num()
        var product_id = valueByName(location.search,"product_id");
        // alert(product_id);
        $.ajax({
          type:"get",
          url:"../data/goods.json",
          success:function(arr){
            var goodsMsg = arr.find(item =>item.id == product_id);
            // console.log(goodsMsg);
            var node = $(`
            <div class="main">
              <div class="main-left">
                <div class="small">
                  <img src="${goodsMsg.img}" alt="">
                  <div class="mark"></div>
                </div>
                <div class="big">
                  <img src="${goodsMsg.img}" alt="">
                </div>
              </div>
              <div class="main-right">
                <h1>${goodsMsg.desc}</h1>
                <p>${goodsMsg.desc2}</p>
                <div class="x-row">
                  <div class="price">
                    <span>售价</span>
                    <div>￥${goodsMsg.price}</div>
                  </div>
                  <div class="serve">
                    <span>服务</span>
                    <ul>
                      <li>30天无忧退换货</li>
                      <li>48小时退款</li>
                      <li>满79元包邮</li>
                      <li>优品全球甄选</li>
                    </ul>
                  </div>
                </div>
                <div class="choose">
                  <div class="selectNum">
                    <h2>数量</h2>
                    <div class="count">
                      <span class="reduce">-</span>
                      <input type="text" value="1">
                      <span class="plus">+</span>
                    </div>
                  </div>
                </div>
                <div class="buttonBox">
                  <button class="buy">立即购买</button>
                  <button class="toCar" id="${goodsMsg.id}"><img src="http://m.miniso.cn/public/app/siteyx/statics/static/images/cart2.png" alt="">加入购物车</button>
                  <button class="collect">收藏</button>
                </div>
              </div>
            </div>
            `).insertAfter($(".whiteBox .nav"))
  
  
            //放大镜
            node.find($(".small"))
            .mouseenter(function(){
              $(".mark,.big").show();
            })
            .mouseleave(function(){
              $(".mark,.big").hide();
            })
            .mousemove(function(ev){
              var l = ev.pageX - $(this).offset().left - 75;
              var t = ev.pageY - $(this).offset().top - 75;
      
              l = Math.max(0,l)
              l = Math.min(250,l)
              t = Math.max(0,t)
              t = Math.min(250,t)
      
              node.find($(".mark")).css({
                left:l,
                top:t
              })
      
              node.find($(".big img")).css({
                left:-2 * l,
                top:-2 * t
              })
            })
          },
          error:function(msg){
            console.log(msg);
          }
        })

        //给加入购物车按钮添加点击
        //设置cookie  json数据，id num  [{id:1,num:1},{id:2,num:2}]
        $(".whiteBox").on("click",".toCar",function(){
          var id = this.id;
          //判断是否是第一次添加
          var first = $.cookie("goods") == null? true : false;
          if(first){
            $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
              expires:7
            })
          }else{
            //不是第一次，判断之前是否添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            var same = false; //假设没有相同的数据
            for(var i = 0; i < cookieArr.length; i++){
              if(cookieArr[i].id == id){
                same = true; 
                break;
              }
            }
            same? cookieArr[i].num++ : cookieArr.push({id:id,num:1})

            //将数据重新存入cookie
            $.cookie("goods",JSON.stringify(cookieArr),{
              expires:7
            })
          }
          goods_msg()
          sc_num()
        })

        //给购物车添加效果
        $(".cart").mouseenter(function(){
          $(".buycar").show()
        })
        $(".buycar").mouseleave(function(){
          $(".buycar").hide()
        })
      })

      //给购物车的删除按钮添加点击
      $(".boxTop .list").on("click",".delect",function(){
        var id = $(this).closest("li").remove().attr("id");
        //删除页面上的节点  从cookie中删除数据
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0;i < cookieArr.length;i++){
          if(cookieArr[i].id == id){
            cookieArr.splice(i,1);
            break;
          }
        }
        if(cookieArr.length){
          $.cookie("goods",JSON.stringify(cookieArr),{
            expires:7
          })
        }else{
          $.cookie("goods",null);
        }
        // $(".boxBottom .total .addnum").html(`共&nbsp;${cookieArr[i].num}&nbsp;件商品`)
        sc_num();
      })
      //加载右侧的购物车里的数据
      function goods_msg(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
          return;
        }
        //下载所有的商品数据
        $.ajax({
          url:"../data/goods.json",
          success:function(arr){
            var cookieArr = JSON.parse(cookieStr);
            var newArr = [];
            for(var i = 0; i < arr.length; i++){
              for(var j = 0; j < cookieArr.length; j++){
                if(cookieArr[j].id == arr[i].id){
                   arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }
            //通过newArr 处理数据，将数据添加到页面上
            var str = ``;
            var addprice = 0; 
            for(var i = 0; i < newArr.length; i++){
              str += `
              <li id="${newArr[i].id}">
                <div class="imgBox">
                  <img src="${newArr[i].img}" alt="">
                </div>
                <div class="title">
                  <a href="">${newArr[i].desc}</a>
                  <p>数量:&nbsp;x&nbsp;${newArr[i].num}</p>
                </div>
                <div class="price">￥${newArr[i].price}</div>
                <div class="delect">X</div>
              </li>
              `;

                addprice += parseInt(newArr[i].price * newArr[i].num)
                
              
            }
            $(".headerBottom .x-main .top .buycar .boxTop .list").html(str);
            $(".boxBottom .total .addprice span").html(`￥${addprice}`)
          },
          error:function(msg){
            console.log(msg)
          }
        })
      }
       //处理数量
       function sc_num(){
        var cookieStr = $.cookie("goods");
        var sum = 0;
        if(cookieStr){
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0; i < cookieArr.length; i++){
            sum += cookieArr[i].num;
          }
        }
        $(".top .goods_num").html(sum);
        $(".boxBottom .total .addnum").html(`共&nbsp;${sum}&nbsp;件商品`)
      }

    }
    
    //获取要加载的商品的数据
    //?name1=value1&name2=value2&name3=value3
    function valueByName(search,name){
      var start = search.indexOf(name + "=");
      if(start == -1){
        return null
      }else{
        var end = search.indexOf("&",start);
        if(end == -1){
          end = search.length;
        }

        var str = search.substring(start,end);
        var arr = str.split("=");
        return arr[1];
      }
    }

  
  return {
    download:download
  }
})