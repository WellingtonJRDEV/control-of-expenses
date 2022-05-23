let logar = document.querySelector('#logar')
let usuario = document.querySelector('#userName')
let labelUsuario = document.querySelector('#labelUserName')

let senha = document.querySelector('#password')
let labelSenha = document.querySelector('#labelPassword')

let msgError = document.querySelector('#msgError')

logar.addEventListener('click', () => {
  let listarUser = []

  let userValid = {
    nome: '',
    user: '',
    senha: ''
  }

  listarUser = JSON.parse(localStorage.getItem('listUsuarios'))

  listarUser.forEach(item => {
    if (usuario.value == item.userCad && senha.value == item.passwordCad) {
      userValid.nome = item.nameCad
      userValid.user = item.userCad
      userValid.senha = item.passwordCad
    }
  })

  if (
    usuario.value === userValid.user &&
    senha.value === userValid.senha &&
    usuario.value &&
    senha.value
  ) {
    window.location.href = '../pages/main.html'

    let token =
      Math.random().toString(16).substring(2) +
      Math.random().toString(16).substring(2)

    localStorage.setItem('token', token)

    localStorage.setItem('userLogado', JSON.stringify(userValid))
  } else {
    labelUsuario.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    labelSenha.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos!'
    usuario.focus()
  }
})
