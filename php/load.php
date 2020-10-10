<?php
   header("Content-type:text/html;charset=utf-8");
  //  var_dump($_POST)
  //模拟官方的返回，生成对应的内容
  $responseData = array("code" =>0,"msg" => "");

  //取出数据
  $phonenumber = $_POST['phonenumber'];
  $password = $_POST['password'];

  //初步判断
  if(!$phonenumber){
    $responseData['code'] = 1;
    $responseData['msg'] = "手机号不能为空";
    echo json_encode($responseData);
    exit;
  }

  if(!$password){
    $responseData['code'] = 2;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
  }

  //验证数据库是否有同名用户
  $link = mysql_connect("127.0.0.1","root","123456");

  if(!$link){
    $responseData['code'] = 4;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }

  mysql_set_charset("utf8");

  mysql_select_db("miniso");

  $password = md5(md5($password)."miniso");

  $sql = "SELECT * FROM users WHERE phonenumber = '{$phonenumber}' AND password = '{$password}'";

  $res = mysql_query($sql);

  $row = mysql_fetch_assoc($res);

  if($row){
    $responseData['msg'] = "登陆成功";
    echo json_encode($responseData);
  }else{
    $responseData['code'] = 5;
    $responseData['msg'] = "用户名或密码错误";
    echo json_encode($responseData);
    exit;
  }

  mysql_close($link);
?>