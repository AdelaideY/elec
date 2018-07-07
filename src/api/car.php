<?php

	// include "format.php";

	// $sql = "select * from student";

	// $result = query($sql);
	// echo json_encode($result, JSON_UNESCAPED_UNICODE);
	//判断当前 email 是否已存在数据表中
	// $sql = format("select * from gz1610 where email='{0}' and password='{1}'", $_POST["email"], $_POST["password"]);
	function connect_oop(){
        // 配置参数
        $servername = 'localhost';
        $username = 'root';
        $password = 'root';
        $database = 'elec';

        //连接数据库
        $conn = new mysqli($servername,$username,$password,$database);

        // 检测连接
        if($conn->connect_error){
            die('连接失败'.$conn->connect_error);
        }

        $conn->set_charset('utf8');
        return $conn;
    }
	$checked = $_POST["checked"];
	$id = $_POST["id"];
	$sql = "update product set checked='$checked'  where id='$id'";
	function query_oop($sql){
        $jsonData = array();
        $conn = connect_oop();
        $result = $conn->query($sql);
        $conn->close();//关闭连接
        return $result;
    }
	$result = query_oop($sql);
	// echo json_encode($result, JSON_UNESCAPED_UNICODE);
	//当前 email 不存在，执行插入操作
	if(result){
		echo "{state: true, message: '修改成功'}";
	} else {
		echo "{state: false, message: '修改失败'}";
	}
?>