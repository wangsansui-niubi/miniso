<?php
  header("Content-type:text/html;charset=utf-8");
  // var_dump($_POST);
  //模拟官方的返回，生成对应的内容
  $responseData = array("code" => 0, "msg" => "");

  $phonenumber = $_POST['phonenumber'];
  $password = $_POST['password'];
  $repassword = $_POST['repassword'];
  $createtime = $_POST['createtime'];

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

  if($password !== $repassword){
    $responseData['code'] = 3;
    $responseData['msg'] = "两次密码输入不一致";
    echo json_encode($responseData);
    exit;
  }

  $link = mysql_connect("127.0.0.1","root","123456");

  if(!$link){
    $responseData['code'] = 4;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }

  mysql_set_charset("utf8");

  mysql_select_db("miniso");

$sql = "SELECT * FROM users WHERE phonenumber = '{$phonenumber}'";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);
if($row){
  $responseData['code'] = 5;
  $responseData['msg'] = "该手机号已被注册";
  echo json_encode($responseData);
  exit;
}

$password = md5(md5($password)."miniso");

//注册
$sql2 = "INSERT INTO users(phonenumber,password,createtime) VALUES('{$phonenumber}','{$password}','{$createtime}')";

$res = mysql_query($sql2);

if(!$res){
  $responseData['code'] = 6;
  $responseData['msg'] = "注册失败";
  echo json_encode($responseData);
  exit;
}

$responseData['msg'] = "注册成功";
echo json_encode($responseData);

mysql_close($link);
?>