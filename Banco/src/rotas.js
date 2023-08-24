const express = require('express')
const intermediario = require('./intermediario/intermediarios')
const contas = require('./controller/acaoConta')
const transacoes = require('./controller/transacoes')

const rotas = express()

rotas.get('/contas', intermediario.verificarSenha , contas.listarContaBancaria)
rotas.post('/contas', contas.criarUmaConta)
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuario )
rotas.delete('/contas/:numeroConta', contas.deletarConta)
rotas.get('/contas/saldo', contas.saldo)
rotas.get('/contas/extrato', contas.extratoConta)


rotas.post('/transacoes/depositar', transacoes.depositar)
rotas.post('/transacoes/sacar', transacoes.sacar)
rotas.post('/transacoes/transferir', transacoes.transferir)

module.exports = rotas
