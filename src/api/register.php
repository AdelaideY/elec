<?php
	include 'DBHelper.php';
	
	$pwd = $_POST["pwd"];
	$name = $_POST["name"];
	//判断当前 email 是否已存在数据表中
	$emailCheck = "select * from user where `name` ='$name'";
	$result = query($emailCheck);
	echo $result;
	//当前 email 不存在，执行插入操作
	if(count($result) < 1){
		$sql = "insert into user(name, pwd) values('$name', '$pwd')";
		// echo $sql;
		$excute = excute($sql);
		if($excute){
			echo "{state: true,message:}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: '账号 已被注册！！！'}";
	}
?>