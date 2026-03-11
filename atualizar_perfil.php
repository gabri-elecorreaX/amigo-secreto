<?php
session_start();
include 'config/db.php'; // ajuste conforme seu arquivo de conexão

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $sql = "UPDATE usuarios SET nome='$nome', senha='$senha' WHERE nome='{$_SESSION['usuario']}'";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['usuario'] = $nome; 
        $_SESSION['mensagem'] = "Perfil atualizado com sucesso!"; // <<< mensagem salva
        header("Location: dashboard.php");
        exit;
    } else {
        $_SESSION['mensagem'] = "Erro ao atualizar perfil: " . $conn->error;
        header("Location: dashboard.php");
        exit;
    }
}
?>



