<?php
    // 指定允许其他域名访问  
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST,GET,OPTIONS'); 
    header('Access-Control-Request-Headers:accept, content-type');
    $page = isset($_POST["page"]) ? $_POST["page"] : 1;
    $limit = isset($_POST["limit"]) ? $_POST["limit"] : 100;
    $order = isset($_POST["order"]) ? $_POST["order"] : '';
    $type = isset($_POST["type"]) ? $_POST["type"] : 'beiqin';
    include 'DBHelper.php';
    $sql = 'select SQL_CALC_FOUND_ROWS * from product';
    if($order){
        $sql .= ' order by ';
        $sql .= $order;
    }
    $sql .= ' limit ';
    $sql .= $page - 1;
    $sql .= ', ';
    $sql .= $limit;
   
    $sql .= ';select FOUND_ROWS() as rowsCount;';

    $result = multi_query_oop($sql);
    echo $result;
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>