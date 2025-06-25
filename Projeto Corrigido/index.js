let campoUser = $("#login");
let campoSenha = $("#senha");
let botaoMostrarSenha = $(".mostrar-senha");

function monitorarCampo(campo, placeholderOriginal, validador) {
  campo.on("input", function () {
    const valor = $(this).val().trim();

    if (validador(valor)) {
      $(this).removeClass("erro");
      $(this).attr("placeholder", placeholderOriginal);
      $(this).next(".erro-mensagem").hide();
    }
  });
}

function validarUsuario(valor) {
  const regex =
    /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(\.[a-z]{2,})?)|(\d{3}\.\d{3}\.\d{3}-\d{2})$/i;
  return regex.test(valor);
}

function validarSenha(valor) {
  return valor.length >= 8;
}

$("form").submit(function (e) {
  e.preventDefault();

  const usuarioValidado = validarUsuario(campoUser.val().trim());
  const senhaValidada = validarSenha(campoSenha.val().trim());

  if (!usuarioValidado) {
    campoUser.addClass("input-error");
    campoUser.attr("placeholder", "Campo obrigatório");
    campoUser.next(".erro-mensagem").show();
  } else {
    campoUser.removeClass("input-error");
    campoUser.attr("placeholder", "Usuário");
    campoUser.next(".erro-mensagem").hide();
  }

  if (!senhaValidada) {
    campoSenha.addClass("input-error");
    campoSenha.attr("placeholder", "Campo obrigatório");
    campoSenha.next(".erro-mensagem").show();
  } else {
    campoSenha.removeClass("input-error");
    campoSenha.attr("placeholder", "Senha");
    campoSenha.next(".erro-mensagem").hide();
  }
});

botaoMostrarSenha.click(function (e) {
  e.preventDefault();

  const isPassword = campoSenha.attr("type") === "password";
  campoSenha.attr("type", isPassword ? "text" : "password");

  botaoMostrarSenha
    .find("span")
    .text(isPassword ? "Ocultar Senha" : "Mostrar Senha");
  botaoMostrarSenha
    .find("img")
    .attr(
      "src",
      isPassword ? "./source/olho fechado.png" : "./source/olho aberto.png"
    );
});

monitorarCampo(campoUser, "Usuário");
monitorarCampo(campoSenha, "Senha");
