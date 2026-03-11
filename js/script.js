// Validação simples de formulário
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const inputs = form.querySelectorAll("input[required]");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          alert(`O campo ${input.name} é obrigatório!`);
          valid = false;
        }
      });

      if (!valid) e.preventDefault();
    });
  });
});
