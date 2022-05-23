const user = document.querySelector('#user')
const sair = document.querySelector('#sair')
const total = document.querySelector('#balance')
const receitas = document.querySelector('#income')
const despesas = document.querySelector('#expense')
const listaDespesaReceita = document.querySelector('#lista-descricao')
const descricao = document.querySelector('#descricao')
const valores = document.querySelector('#valores')
const msgErro = document.querySelector('#msgError')
const msgSucesso = document.querySelector('#msgSuccess')
const adicionar = document.querySelector('#enviar')

let userLogado = JSON.parse(localStorage.getItem('userLogado'))

if (localStorage.getItem('token') === null) {
  alert('Você precisa estar logado para acessar essa página')
  window.location.href = '../pages/login.html'
}

user.innerHTML = userLogado.nome

let localStorageTransacoes = JSON.parse(localStorage.getItem('transactions'))

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransacoes : []

const removerTransacao = ID => {
  transactions = transactions.filter(({ id }) => id !== ID)
  carregarLocalStorage()
  iniciar()
}

const adicionarItemNoDOM = ({ id, nome, montante }) => {
  const operador = montante < 0 ? '-' : '+'
  const cssClass = montante < 0 ? 'menos' : 'mais'

  const montanteSemOperador = Math.abs(montante)

  const li = document.createElement('li')

  li.classList.add('list-items')
  li.classList.add(cssClass)
  li.innerHTML = `
    <span>R$ ${operador} ${montanteSemOperador}</span>
    <p>${nome}</p>
    <button id="delete" onclick="removerTransacao(${id})">x</button>
  `
  listaDespesaReceita.append(li)
}

const carregarValores = () => {
  const valoresDasTransacoes = transactions.map(({ montante }) => montante)
  const totalValores = valoresDasTransacoes
    .reduce((acumulador, transacao) => acumulador + transacao, 0)
    .toFixed(2)
  const totalReceitas = valoresDasTransacoes
    .filter(value => value > 0)
    .reduce((operador, transacao) => operador + transacao, 0)
    .toFixed(2)
  const totalDespesas = Math.abs(
    valoresDasTransacoes
      .filter(value => value < 0)
      .reduce((operador, transacao) => operador + transacao, 0)
  ).toFixed(2)

  total.textContent = `R$ ${totalValores}`
  receitas.textContent = `R$ ${totalReceitas}`
  despesas.textContent = `R$ ${totalDespesas}`
}

const iniciar = () => {
  listaDespesaReceita.innerHTML = ''
  transactions.forEach(adicionarItemNoDOM)
  carregarValores()
}

const gerarID = () => {
  return Math.round(Math.random() * 9999)
}

const limpar = () => {
  descricao.setAttribute('style', 'color: rgb(12,76,17)')
  valores.setAttribute('style', 'color: rgb(12,76,17)')
  msgErro.innerHTML = ''
  msgErro.setAttribute('style', 'display: none')

  descricao.value = ''
  valores.value = ''
  descricao.focus()
}

iniciar()

const carregarLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

adicionar.addEventListener('click', () => {
  const nomeTransacao = descricao.value.trim()
  const valorTransacao = valores.value.trim()
  const checarEntrada = nomeTransacao === '' || valorTransacao === ''

  if (checarEntrada) {
    descricao.setAttribute('style', 'color: #ff0000')
    valores.setAttribute('style', 'color: #ff0000')
    msgErro.innerHTML =
      'Você precisa preencher todos os campos antes de adicionar uma transação'
    msgErro.setAttribute('style', 'display: block')
    return
  }

  const transacoes = {
    id: gerarID(),
    nome: nomeTransacao,
    montante: +valorTransacao
  }

  transactions.push(transacoes)
  iniciar()
  carregarLocalStorage()

  limpar()
})

sair.addEventListener('click', () => {
  let alertaSair = window.confirm(`${userLogado.nome} deseja realmente sair?`)
  if (alertaSair === false) {
    return
  }
  localStorage.removeItem('token')
  localStorage.removeItem('userLogado')
  window.location.href = '../pages/login.html'
})
