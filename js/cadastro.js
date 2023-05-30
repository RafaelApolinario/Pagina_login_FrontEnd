const formElement = document.querySelector('#form-login')
//capturei o formulario
formElement.addEventListener('submit', async (evento) => {//adicionei um evento de click submit
    evento.preventDefault();// evitar reload da pagina
//capturei os inputs
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('password');
    const inputRepassword = document.getElementById('repassword');
//armazenei os valores gerado pela função com parametros do valores de input
    const emailVazio = validaInputVazio(inputEmail.value);
    const senhaVazio = validaInputVazio(inputSenha.value);
    const repasswordVazio = validaInputVazio(inputRepassword.value);
// validei se estava vazio
    if (!emailVazio || !senhaVazio || !repasswordVazio) { 
        alert("Preencha os campos corretamente");
        return
    }
//validei se a senha se repete
    if (!validaSenha(inputSenha.value, inputRepassword.value)){
        alert("As senhas não coincidem");
        return
    }
//objeto para receber valores
    const novoUsuario = {
        email: inputEmail.value,
        senha: inputSenha.value,
    }


    const deuBom = await cadastrarUsuario(novoUsuario);


    if (deuBom) {
        inputEmail.value = ''
        inputSenha.value = ''
        inputRepassword.value = ''

        window.location.href = 'login.html'
    }
});

function validaInputVazio(valorInput){
    if (valorInput === ""){
        return false;
    }
    return true;
}

function validaSenha(senha, repsenha){
    if (senha !== repsenha){
        return false;
}
    return true;
}
//função que faz conexão com o endereço da API e insere a rota solicitada
async function cadastrarUsuario(novoUsuario){
    try {
        const resposta = await apiConfig.post('/criarusuario', novoUsuario)
        
        alert(resposta.message)
        
        console.log(resposta);
        return true;
    } catch(erro) {
        alert(`${erro.response}`)
        console.log(erro);
        return false
    }
}