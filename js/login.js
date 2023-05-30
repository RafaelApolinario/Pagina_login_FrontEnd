document.addEventListener('DOMContentLoaded', () => {

    const emailLocalStorage = localStorage.getItem('email')

    const emailSessionStorge = sessionStorage.getItem('email')


    console.log(emailLocalStorage)
    console.log(emailSessionStorge)

    if (emailLocalStorage || emailSessionStorge) {
        window.location.href = 'recados.html'
    }

})

const formElement = document.querySelector('#form-login')
//capturei o formulario
formElement.addEventListener('submit', async (evento) => {//adicionei um evento de click submit
    evento.preventDefault();// evitar reload da pagina
//capturei os inputs
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('password');
    const permanecerConectado = document.getElementById('lembrar').checked
    
console.log(permanecerConectado);
//armazenei os valores gerado pela função com parametros do valores de input
    const emailVazio = validaInputVazio(inputEmail.value);
    const senhaVazio = validaInputVazio(inputSenha.value);

// validei se estava vazio
    if (!emailVazio || !senhaVazio) { 
        alert("Preencha os campos corretamente");
        return
    }
//objeto para receber valores
    const dadosUsuario = {
        email: inputEmail.value,
        senha: inputSenha.value,
    }
console.log(dadosUsuario);

const deuBom = await login(dadosUsuario, permanecerConectado)
    
    if(deuBom){
        inputEmail.value = ''
        inputSenha.value= ''
        window.location.href = 'recados.html'
    }else{
        inputSenha.value = ''
    }


});

function validaInputVazio(valorInput){
    if (valorInput === ""){
        return false;
    }
    return true;
}

async function login(dadosUsuario, permanecerConectado) {
    try {
        const resposta = await apiConfig.post('/login', dadosUsuario)
    console.log(resposta);
    if (permanecerConectado) {
        
        localStorage.setItem('email', resposta.data.email)
    } else {
        
        sessionStorage.setItem('email', resposta.data.email)
    }

    return true


} catch (erro) {
    console.log(erro);
    alert(`${erro.response.message}`)
    return false
}
}    