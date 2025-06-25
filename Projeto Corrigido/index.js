let campoUser = $("#login");
let campoSenha = $("#senha");
let botaoMostrarSenha = $(".mostrar-senha");

function monitorarCampo(campo, placeholderOriginal, validador) {
    campo.on("input", function () {
        const valor = $(this).val().trim();

        if (validador(valor)) {
            $(this).removeClass("input-error"); // Padroniza classe de erro
            $(this).attr("placeholder", placeholderOriginal);
            $(this).next(".erro-mensagem").hide();
        }
    });
}

function validarUsuario(valor) {
    const regex = /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(\.[a-z]{2,})?)|(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/i;
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
        campoUser.attr("placeholder", campoUser.val().trim() === "" ? "Campo obrigatório" : "E-mail ou CPF inválido");
        campoUser
            .next(".erro-mensagem")
            .text(campoUser.val().trim() === "" ? "Preencha o campo de usuário." : "Digite um e-mail ou CPF válido.")
            .show();
    } else {
        campoUser.removeClass("input-error");
        campoUser.attr("placeholder", "Usuário");
        campoUser.next(".erro-mensagem").hide();
    }

    if (!senhaValidada) {
        campoSenha.addClass("input-error");
        campoSenha.attr("placeholder", campoSenha.val().trim() === "" ? "Campo obrigatório" : "Senha muito curta");
        campoSenha
            .next(".erro-mensagem")
            .text(campoSenha.val().trim() === "" ? "Preencha o campo de senha." : "A senha deve ter pelo menos 8 caracteres.")
            .show();
    } else {
        campoSenha.removeClass("input-error");
        campoSenha.attr("placeholder", "Senha");
        campoSenha.next(".erro-mensagem").hide();
    }

    if (usuarioValidado && senhaValidada) {
        const usuario = new Usuario(campoUser.val().trim(), campoSenha.val().trim());
        console.log("Usuário autenticado:", usuario);
        $(".mensagem-sucesso").fadeIn(300).delay(2000).fadeOut(400);
    }
});

botaoMostrarSenha.click(function (e) {
    e.preventDefault();

    const isPassword = campoSenha.attr("type") === "password";
    campoSenha.attr("type", isPassword ? "text" : "password");

    botaoMostrarSenha.find("span").text(isPassword ? "Ocultar Senha" : "Mostrar Senha");
    botaoMostrarSenha.find("img").attr("src", isPassword ? "./source/olho fechado.png" : "./source/olho aberto.png");
});

monitorarCampo(campoUser, "Usuário", validarUsuario);
monitorarCampo(campoSenha, "Senha", validarSenha);

class Usuario {
    constructor(login, senha) {
        this.login = login;
        this.senha = senha;
    }
}
