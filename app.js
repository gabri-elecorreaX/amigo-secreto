let amigos = [];

// Carregar lista do localStorage ao iniciar
function carregarLista() {
  const dados = localStorage.getItem("amigos");
  if (dados) {
    amigos = JSON.parse(dados);
    atualizarLista();
  }
}

function salvarLista() {
  localStorage.setItem("amigos", JSON.stringify(amigos));
}

function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim();

  if (nome === "") {
    mostrarMensagem("Por favor, insira um nome.", "erro");
    return;
  }

  if (amigos.includes(nome)) {
    mostrarMensagem("Esse nome já foi adicionado.", "erro");
    return;
  }

  amigos.push(nome);
  input.value = "";
  salvarLista();
  atualizarLista();
  mostrarMensagem(`Amigo "${nome}" adicionado com sucesso!`, "sucesso");
}

function atualizarLista() {
  const lista = document.getElementById('listaAmigos');
  lista.innerHTML = "";

  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = amigo;

    // Botão de remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = "❌";
    btnRemover.className = "remove-btn";
    btnRemover.addEventListener("click", () => {
      amigos.splice(index, 1);
      salvarLista();
      atualizarLista();
      mostrarMensagem(`Amigo "${amigo}" removido.`, "sucesso");
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

//  Função de sorteio atualizado
function sortearAmigo() {
  if (amigos.length < 2) {
    mostrarMensagem("Adicione pelo menos dois amigos!", "erro");
    return;
  }

  // Embaralha a lista
  let sorteio = [...amigos];
  for (let i = sorteio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
  }

  // Garante que ninguém tire a si mesmo
  for (let i = 0; i < amigos.length; i++) {
    if (amigos[i] === sorteio[i]) {
      const j = (i + 1) % amigos.length;
      [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }
  }

  // Área de resultado
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = "<h3>Resultado do sorteio:</h3>";

  // Cria botões para cada pessoa
  amigos.forEach((amigo, i) => {
    const btnVer = document.createElement("button");
    btnVer.textContent = `Ver sorteio de ${amigo}`;
    btnVer.className = "button-draw sorteio-btn";

    btnVer.addEventListener("click", () => {
      const box = document.createElement("div");
      box.className = "resultado-box fade-in";
      box.innerHTML = `<p><strong>${amigo}</strong> tirou <strong>${sorteio[i]}</strong> 🎁</p>`;
      resultado.appendChild(box);
      btnVer.disabled = true; // desativa botão depois de usado
    });

    resultado.appendChild(btnVer);
  });

  mostrarMensagem("Sorteio realizado com sucesso!", "sucesso");
}

function resetar() {
  amigos = [];
  salvarLista();
  document.getElementById('listaAmigos').innerHTML = "";
  document.getElementById('resultado').innerHTML = "";
  document.getElementById('amigo').value = "";
  mostrarMensagem("Lista resetada.", "sucesso");
}

function embaralharLista() {
  if (amigos.length === 0) {
    mostrarMensagem("A lista está vazia. Adicione nomes antes de embaralhar.", "erro");
    return;
  }

  // Algoritmo Fisher Yates
  for (let i = amigos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
  }

  atualizarLista();
  salvarLista();
  mostrarMensagem("Lista embaralhada com sucesso!", "sucesso");
}

function mostrarMensagem(msg, tipo) {
  const mensagemDiv = document.getElementById('mensagem');
  mensagemDiv.textContent = msg;
  mensagemDiv.className = `mensagem ${tipo}`;

  setTimeout(() => {
    mensagemDiv.textContent = "";
    mensagemDiv.className = "mensagem";
  }, 3000);
}

// Eventos
document.querySelector(".button-add").addEventListener("click", adicionarAmigo);
document.getElementById("sortear").addEventListener("click", sortearAmigo);
document.getElementById("resetar").addEventListener("click", resetar);
document.getElementById("embaralhar").addEventListener("click", embaralharLista);
document.getElementById("amigo").addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarAmigo();
});

carregarLista();
