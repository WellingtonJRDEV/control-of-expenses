let nome = document.querySelector('#name')
let labelNome = document.querySelector('#labelName')
let validaNome = false

let usuario = document.querySelector('#userName')
let labelUsuario = document.querySelector('#labelUserName')
let validaUsuario = false

let senha = document.querySelector('#password')
let labelSenha = document.querySelector('#labelPassword')
let validaSenha = false

let confirmSenha = document.querySelector('#confirmPassword')
let labelConfirmSenha = document.querySelector('#labelConfirmPassword')
let validaConfirmaSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *precisa ter mais de 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validaNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validaNome = true
  }
})

usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 3) {
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *precisa ter mais de 4 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validaUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validaUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if (senha.value.length <= 3) {
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *precisa ter mais de 3 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validaSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validaSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if (confirmSenha.value !== senha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML =
      'Confirma senha *precisa ter mais de 3 caracteres'
    confirmSenha.setAttribute('style', 'border-color: red')
    validaConfirmaSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirma senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validaConfirmaSenha = true
  }
})

function cadastrar() {
  if (validaNome && validaSenha && validaUsuario && validaConfirmaSenha) {
    let listaUsuarios = JSON.parse(localStorage.getItem('listUsuarios') || '[]')

    listaUsuarios.push({
      nameCad: nome.value,
      userCad: usuario.value,
      passwordCad: senha.value,
      transactionsCad: []
    })

    localStorage.setItem('listUsuarios', JSON.stringify(listaUsuarios))

    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = 'Cadastrando usuário...'
    msgError.innerHTML = ''
    msgError.setAttribute('style', 'display: none')

    setInterval(() => {
      window.location.href = './assets/pages/login.html'
    }, 3000)
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Preencha os campos corretmente antes de cadastrar!'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}
