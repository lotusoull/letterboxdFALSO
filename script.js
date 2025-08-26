document.addEventListener("DOMContentLoaded", function () {
    const btnAuth = document.getElementById("btnAuth");
    const toggleText = document.getElementById("toggleText");
    const authTitle = document.getElementById("auth-title");
    const mensagem = document.getElementById("mensagem");

    let isLogin = true; // Começa em modo login

    function atualizarInterface() {
        if (isLogin) {
            authTitle.textContent = "🔐 Login";
            btnAuth.textContent = "Entrar";
            toggleText.innerHTML = `Não tem conta? <a href="#" id="toggleLink">Registrar</a>`;
            // Remove campo confirmação de senha, se existir
            const confSenha = document.getElementById("senhaConfirma");
            if (confSenha) confSenha.remove();
        } else {
            authTitle.textContent = "📝 Registro";
            btnAuth.textContent = "Registrar";
            toggleText.innerHTML = `Já tem conta? <a href="#" id="toggleLink">Login</a>`;
            // Adiciona campo confirmação de senha se não existir
            if (!document.getElementById("senhaConfirma")) {
                const inputSenha = document.getElementById("senha");
                const inputConfirma = document.createElement("input");
                inputConfirma.type = "password";
                inputConfirma.id = "senhaConfirma";
                inputConfirma.placeholder = "Confirme sua senha";
                inputConfirma.style.marginTop = "10px";
                inputSenha.insertAdjacentElement('afterend', inputConfirma);
            }
        }

        // Atualiza o evento do link após mudar o conteúdo
        document.getElementById("toggleLink").addEventListener("click", function (e) {
            e.preventDefault();
            isLogin = !isLogin;
            mensagem.textContent = "";
            limparCampos();
            atualizarInterface();
        });
    }

    function limparCampos() {
        document.getElementById("usuario").value = "";
        document.getElementById("senha").value = "";
        const confSenha = document.getElementById("senhaConfirma");
        if (confSenha) confSenha.value = "";
    }

    atualizarInterface(); // Inicializa

    btnAuth.addEventListener("click", function () {
        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value.trim();

        if (!usuario || !senha) {
            mensagem.textContent = "⚠️ Preencha todos os campos.";
            mensagem.style.color = "orange";
            return;
        }

        if (isLogin) {
            // Lógica de login
            const userSalvo = localStorage.getItem("usuario");
            const senhaSalva = localStorage.getItem("senha");

            if (usuario === userSalvo && senha === senhaSalva) {
                mensagem.textContent = "✅ Login bem-sucedido!";
                mensagem.style.color = "lightgreen";
                limparCampos();
            } else {
                mensagem.textContent = "❌ Usuário ou senha incorretos.";
                mensagem.style.color = "red";
            }
        } else {
            // Lógica de registro (precisa validar confirmação)
            const senhaConfirma = document.getElementById("senhaConfirma").value.trim();
            if (!senhaConfirma) {
                mensagem.textContent = "⚠️ Confirme sua senha.";
                mensagem.style.color = "orange";
                return;
            }

            if (senha !== senhaConfirma) {
                mensagem.textContent = "❌ As senhas não coincidem.";
                mensagem.style.color = "red";
                return;
            }

            localStorage.setItem("usuario", usuario);
            localStorage.setItem("senha", senha);
            mensagem.textContent = "✅ Conta registrada com sucesso! Agora faça login.";
            mensagem.style.color = "lightblue";

            // Voltar para modo login
            isLogin = true;
            limparCampos();
            atualizarInterface();
        }
    });
});
