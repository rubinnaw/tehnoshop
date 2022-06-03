<?php
$servername = "localhost";
$username = "mysql";
$password = "mysql";
$dbname = "tehnoshop";

function connect(){
    $conn = mysqli_connect("localhost", "root", "root", "tehnoshop");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectOneGoods(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM goods WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGoods(){
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $descr = $_POST['gdescr'];
    $ordr = $_POST['gordr'];
    $img = $_POST['gimg'];
    $sql = "UPDATE goods SET name = '$name', cost = '$cost', description= '$descr', ordr = '$ordr', img = '$img' WHERE id='$id' ";
    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
    }
    mysqli_close($conn);
}