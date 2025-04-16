<?php

include '../bd/bd.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $query = "SELECT * FROM users where id=" . $_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
        exit(); // Agrega esta línea para salir después de enviar la respuesta JSON
    } else {
        $query = "SELECT * FROM users";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());
        exit(); // Agrega esta línea para salir después de enviar la respuesta JSON
    }
}

if ($_POST['METHOD'] == 'POST') {
    unset($_POST['METHOD']);
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $user_role = $_POST['user_role'];
    $email = $_POST['email'];
    $clue = $_POST['clue'];
    $is_activate = $_POST['is_activate'];
    
    $query = "INSERT INTO users(first_name, last_name, user_role, email, clue, is_activate) 
              VALUES ('$first_name', '$last_name', '$user_role', '$email', '$clue', '$is_activate')";
    
    $queryAutoIncrement = "SELECT MAX(id) as id FROM users";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_POST['METHOD'] == 'PUT') {
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $user_role = $_POST['user_role'];
    $email = $_POST['email'];
    $clue = $_POST['clue'];
    $is_activate = $_POST['is_activate'];

    $query = "UPDATE users SET first_name='$first_name', last_name='$last_name', user_role='$user_role', 
              email='$email', clue='$clue', is_activate='$is_activate' WHERE id='$id'";
              
    $resultado = metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    $query = "DELETE FROM users WHERE id='$id'";
    $resultado = metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>