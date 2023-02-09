function validarCadastrarUsuario() {
    var erro = 0;
    var formato = /\S+@\S+\.\S+/;
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');
    var erro_nome = document.getElementById('erro_nome');
    var erro_email = document.getElementById('erro_email');
    var erro_senha = document.getElementById('erro_senha');

    if (nome.value == "") {
        nome.classList.add("is-invalid");
        erro_nome.innerHTML = "Informe o seu nome.";
        erro++;
    } else if (nome.value.length < 3 || nome.value.lenth > 250) {
        nome.classList.add("is-invalid");
        erro_nome.innerHTML = "O minímo de caracteres são 3 e o máximo são 250.";
        erro++;
    } else {
        nome.classList.remove("is-invalid");
        nome.classList.add("is-valid");
    }

    if (email.value == "") {
        email.classList.add("is-invalid");
        erro_email.innerHTML = "Informe o seu email.";
        erro++;
    } else if (formato.test(email.value) == false) {
        email.classList.add("is-invalid");
        erro_email.innerHTML = "Informe um email válido.";
        erro++;
    } else if (email.value.length < 3 || email.value.lenth > 250) {
        email.classList.add("is-invalid");
        erro_email.innerHTML = "O mínimo de caracteres são 3 e o máximo são 250.";
        erro++;
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    if (senha.value == "") {
        senha.classList.add("is-invalid");
        erro_senha.innerHTML = "Informe a sua senha.";
        erro++;
    } else if (senha.value.length < 8 || senha.value.length > 15) {
        senha.classList.add("is-invalid");
        erro_senha.innerHTML = "Sua senha deve ter de 8 a 15 caracteres.";
        erro++;
    } else {
        senha.classList.remove("is-invalid");
        senha.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formCadastrarUsuario').submit();
    }

}

function validarLoginUsuario() {
    var erro = 0;
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');
    var erro_email = document.getElementById('erro_email');
    var erro_senha = document.getElementById('erro_senha');

    if (email.value == "") {
        email.classList.add("is-invalid");
        erro_email.innerHTML = "Informe o seu email.";
        erro++;
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    if (senha.value == "") {
        senha.classList.add("is-invalid");
        erro_senha.innerHTML = "Informe a sua senha.";
        erro++;
    } else {
        senha.classList.remove("is-invalid");
        senha.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formLoginUsuario').submit();
    }

}

function validarTarefa() {
    var erro = 0;
    var titulo = document.getElementById('titulo');
    var descricao = document.getElementById('descricao');
    var data = document.getElementById('data');
    var hora = document.getElementById('hora');
    var erro_titulo = document.getElementById('erro_titulo');
    var erro_descricao = document.getElementById('erro_descricao');
    var erro_data = document.getElementById('erro_data');
    var erro_hora = document.getElementById('erro_hora');

    if (titulo.value == "") {
        titulo.classList.add("is-invalid");
        erro_titulo.innerHTML = "Informe um título.";
        erro++;
    } else if (titulo.value.length < 3 || titulo.value.lenth > 250) {
        titulo.classList.add("is-invalid");
        erro_titulo.innerHTML = "O minímo de caracteres são 3 e o máximo são 250.";
        erro++;
    } else {
        titulo.classList.remove("is-invalid");
        titulo.classList.add("is-valid");
    }

    if (descricao.value == "") {
        descricao.classList.add("is-invalid");
        erro_descricao.innerHTML = "Informe uma descrição.";
        erro++;
    } else if (descricao.value.length < 3 || descricao.value.lenth > 250) {
        descricao.classList.add("is-invalid");
        erro_descricao.innerHTML = "O mínimo de caracteres são 3 e o máximo são 250.";
        erro++;
    } else {
        descricao.classList.remove("is-invalid");
        descricao.classList.add("is-valid");
    }

    if (data.value == "") {
        data.classList.add("is-invalid");
        erro_data.innerHTML = "Informe uma data.";
        erro++;
    } else {
        data.classList.remove("is-invalid");
        data.classList.add("is-valid");
    }

    if (hora.value == "") {
        hora.classList.add("is-invalid");
        erro_hora.innerHTML = "Informe uma hora.";
        erro++;
    } else {
        hora.classList.remove("is-invalid");
        hora.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formTarefa').submit();
    }

}


function validarFiltro() {
    var erro = 0;
    var filtro = document.getElementById('filtro');

    if (filtro.value == "") {
        filtro.classList.add("is-invalid");
        erro++;
    } else {
        filtro.classList.remove("is-invalid");
        filtro.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formFiltro').submit();
    }

}

function validarEditarPerfil() {
    var erro = 0;
    var nome = document.getElementById('nome');
    var erro_nome = document.getElementById('erro_nome');

    if (nome.value == "") {
        nome.classList.add("is-invalid");
        erro_nome.innerHTML = "Informe o seu nome.";
        erro++;
    } else if (nome.value.length < 3 || nome.value.lenth > 250) {
        nome.classList.add("is-invalid");
        erro_nome.innerHTML = "O minímo de caracteres são 3 e o máximo são 250.";
        erro++;
    } else {
        nome.classList.remove("is-invalid");
        nome.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formEditarConta').submit();
    }

}

function validarEditarSenha() {
    var erro = 0;
    var senha = document.getElementById('senha');
    var erro_senha = document.getElementById('erro_senha');

    if (senha.value == "") {
        senha.classList.add("is-invalid");
        erro_senha.innerHTML = "Informe a sua senha.";
        erro++;
    } else if (senha.value.length < 8 || senha.value.length > 15) {
        senha.classList.add("is-invalid");
        erro_senha.innerHTML = "Sua senha deve ter de 8 a 15 caracteres.";
        erro++;
    } else {
        senha.classList.remove("is-invalid");
        senha.classList.add("is-valid");
    }

    if (erro == 0) {
        document.getElementById('formEditarSenha').submit();
    }

}