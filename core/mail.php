<?php
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['phone'].'</p>';
$message .= '<p>Email: '.$_POST['email'].'</p>';
$message .= '<p>Клиент: '.$_POST['name'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id => $count){
    $message .= $json[$id] ['name'].'---------';
    $message .= $count.'-----';
    $message .= $count * $json[$id]['cost'];
    $message .='<br>';
    $sum = $sum + $count * $json[$id]['cost'];
}
$message .='Итоговая сумма: '.$sum;
print_r($message);

$to = 'rubinnaw@gmail.com'.',';
$to .= $_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head></html><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset = uft-8' . "\r\n";

$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>',$headers);


if ($m) {echo 1;} else {echo 0;}




//https://www.youtube.com/watch?v=ZKH7kIRyURY
//https://dmitryweiner.github.io/lectures/Deploy.html#/