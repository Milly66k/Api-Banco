const bancoDeDados = require('../bancodedados')
let  { contas, identificadorConta, saques, banco, depositos, transferencias } = require('../bancodedados')

const listarContaBancaria = (req, res) => {
    return res.status(200).json(contas)
}

const criarUmaConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome) {
        return res.status(400).json({ "mensagem": 'O nome é obrigatorio.'})
    }
    if (!cpf) {
        return res.status(400).json({ "mensagem": 'O cpf é obrigatorio.'})
    }
    if (!data_nascimento) {
        return res.status(400).json({ "mensagem": 'A data nascimento é obrigatoria.'})
    }
    if (!telefone) {
        return res.status(400).json({ "mensagem": 'O telefone é obrigatorio.'})
    }
    if (!email) {
        return res.status(400).json({ "mensagem": 'O email é obrigatorio.'})
    }
    if (!senha) {
        return res.status(400).json({ "mensagem": 'A senha é obrigatoria.'})
    }

    const acharCpf = contas.find((conta) => {
        return conta.usuario.cpf === String(cpf)
    })

    const acharEmail = contas.find((conta) => {
        return conta.usuario.email === String(email)
    })

    if(acharCpf  || acharEmail){
        return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
    }

    const novaConta = {
        numero: String(identificadorConta),
        saldo: 0 ,
        usuario: {
            nome ,
            cpf ,
            data_nascimento ,
            telefone ,
            email,
            senha
        }
    }

    identificadorConta++

    contas.push(novaConta)

    return res.status(201).json()
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body
    const {numeroConta} = req.params

    if (!nome) {
        return res.status(400).json({ "mensagem": 'O nome é obrigatorio.'})
    }
    if (!cpf) {
        return res.status(400).json({ "mensagem": 'O cpf é obrigatorio.'})
    }
    if (!data_nascimento) {
        return res.status(400).json({ "mensagem": 'A data nascimento é obrigatoria.'})
    }
    if (!telefone) {
        return res.status(400).json({ "mensagem": 'O telefone é obrigatorio.'})
    }
    if (!email) {
        return res.status(400).json({ "mensagem": 'O email é obrigatorio.'})
    }
    if (!senha) {
        return res.status(400).json({ "mensagem": 'A senha é obrigatoria.'})
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === String(numeroConta)
    })

    if(!contaEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta não foi encontrada'})
    }

    const acharCpf = contas.find((conta) => {
        return conta.usuario.cpf === String(cpf)
    })

    const acharEmail = contas.find((conta) => {
        return conta.usuario.email === String(email)
    })

    if(acharCpf  || acharEmail){
        return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
    }

    contaEncontrada.usuario.nome = nome
    contaEncontrada.usuario.cpf = cpf
    contaEncontrada.usuario.data_nascimento = data_nascimento
    contaEncontrada.usuario.telefone = telefone
    contaEncontrada.usuario.email = email
    contaEncontrada.usuario.senha = senha


    return res.status(204).json()
}

const deletarConta = (req, res) => {
    let { numeroConta } = req.params

    const contaIndex = contas.findIndex((conta) => conta.numero === String(numeroConta))

    if (contaIndex === -1) {
        return res.status(404).json({ "mensagem": 'A Conta não foi encontrada' })
    }

    if (contas[contaIndex].saldo > 0) {
        return res.status(404).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" })
    }

    contas.splice(contaIndex, 1)

    console.log(contas);

    return res.status(204).json()
}

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha ) {
        return res.status(400).json({"mensagem": "O número da conta e a senha são obrigatórios!" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero == Number(numero_conta)
    })

    if(!contaEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta não foi encontrado'})
    }
    
    if(senha !== contaEncontrada.usuario.senha){
        return res.status(400).json({ "mensagem": "A senha informada é inválida!"})
    }

    const saldoDaConta = contaEncontrada.saldo

    return res.status(200).json(saldoDaConta)
}

const extratoConta = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha ) {
        return res.status(400).json({"mensagem": "O número da conta e a senha são obrigatórios!" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero == Number(numero_conta)
    })

    if(!contaEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta não foi encontrado'})
    }
    
    if(senha !== contaEncontrada.usuario.senha){
        return res.status(400).json({ "mensagem": "A senha informada é inválida!"})
    }

    const extratoSaque = saques.filter((conta) => {
        return conta.numero_conta === String(numero_conta)
    })

    const extratoDeposito = depositos.filter((conta) => {
        return conta.numero_conta === String(numero_conta)
    })

    const extratoTranferenciaEnviada = transferencias.filter((conta) => {
        return conta.numero_conta_origem === String(numero_conta)
    })

    const extratoTranferenciaRecebida = transferencias.filter((conta) => {
        return conta.numero_conta_destino === String(numero_conta)
    })

    const extrato =  {
        saques: extratoSaque,
        depositos: extratoDeposito,
        transferenciasEnviadas: extratoTranferenciaEnviada,
        transferenciasRecebidas: extratoTranferenciaRecebida
    }

    return res.status(200).json(extrato)

}

module.exports = {
    listarContaBancaria,
    criarUmaConta,
    atualizarUsuario, 
    deletarConta,
    saldo,
    extratoConta
}