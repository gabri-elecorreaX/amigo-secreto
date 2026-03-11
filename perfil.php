<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Editar Perfil</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main>
    <section class="dashboard">
      <h1>Editar Perfil</h1>
      <form action="atualizar_perfil.php" method="post">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value="<?php echo $_SESSION['usuario']; ?>" required>

        <label for="senha">Nova Senha:</label>
        <input type="password" id="senha" name="senha" required>

        <button type="submit">Salvar Alterações</button>
      </form>
    </section>
  </main>
</body>
</html>
