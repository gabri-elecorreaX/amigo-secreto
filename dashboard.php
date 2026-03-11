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
  <title>Painel do Usuário</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main>
    <section class="dashboard">
      <h1>Olá, <?php echo $_SESSION['usuario']; ?> 👋</h1>
      <h2>Painel do Usuário</h2>
      <p>Bem-vindo à sua área restrita. Aqui você pode visualizar suas informações e gerenciar sua conta.</p>

      <!-- Mensagem de sucesso/erro -->
      <?php
      if (isset($_SESSION['mensagem'])) {
          echo "<p class='mensagem-sucesso'>" . $_SESSION['mensagem'] . "</p>";
          unset($_SESSION['mensagem']); // limpa para não repetir
      }
      ?>

      <!-- Exemplo de tabela de dados -->
      <table>
        <tr>
          <th>ID</th>
          <th>Usuário</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>1</td>
          <td><?php echo $_SESSION['usuario']; ?></td>
          <td>Ativo</td>
        </tr>
      </table>

      <!-- Botões de ação -->
      <div class="actions">
        <a href="perfil.php" class="btn">Editar Perfil</a>
        <form action="logout.php" method="post" style="display:inline;">
          <button type="submit" class="btn btn-danger">Sair</button>
        </form>
      </div>
    </section>
  </main>
</body>
</html>
