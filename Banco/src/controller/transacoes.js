let  { contas, identificadorConta, saques, banco, depositos, transferencias } = require('../bancodedados')

const depositar =(req, res) => {
    const { numero_conta, valor  } = req.body
    
    if (!numero_conta || !valor) {
        return res.status(400).json({"mensagem": "O número da conta e o valor são obrigatórios!" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    console.log(contaEncontrada);

    if(!contaEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta não foi encontrado'})
    }

    if(valor <= 0){
        return res.status(404).json({  "mensagem": 'Valor tem que ser maior que zero'})
    }

    contaEncontrada.saldo += Number(valor)
    const data = new Date()

    const registroDeDeposito = {
        data,
        numero_conta ,
        valor
    }

    depositos.push(registroDeDeposito)

    return res.status(201).json()
} 

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha ) {
        return res.status(400).json({"mensagem": "O número da conta, senha e o valor são obrigatórios!" })
    }

    if(valor <= 0){
        return res.status(404).json({  "mensagem": 'Valor Não pode ser menor do que zero.'})
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === String(numero_conta)
    })

    if(!contaEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta não foi encontrado'})
    }

    if(senha !== contaEncontrada.usuario.senha){
        return res.status(400).json({ "mensagem": "A senha informada é inválida!"})
    }

    if(contaEncontrada.saldo < valor){
        return res.status(400).json({ "mensagem": "Você Não possui saldo Suficiente."})
    }

    contaEncontrada.saldo -= Number(valor)
    const data = new Date()

    const registroDesaque = {
        data,
        numero_conta ,
        valor
    }

    saques.push(registroDesaque)

    return res.status(201).json()
}

const transferir = (req, res) => {
    let { numero_conta_origem, numero_conta_destino, valor, senha } =  req.body

    if(!numero_conta_origem){
        return res.status(400).json({"mensagem": "A conta de Origem Não foi informada!" })
    }

    if(!numero_conta_destino){
        return res.status(400).json({"mensagem": "A conta de Destino Não foi informada!" })
    }

    if(!valor){
        return res.status(400).json({"mensagem": "O Valor Não foi Informado!" })
    }

    if(!senha){
        return res.status(400).json({"mensagem": "A Senha não foi informada" })
    }

    if(valor <= 0){
        return res.status(404).json({  "mensagem": 'Valor Não pode ser menor do que zero.'})
    }

    const contaOrigemEncontrada = contas.find((conta) => {
        return conta.numero === String(numero_conta_origem)
    })

    if(!contaOrigemEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta De Origem não foi encontrado'})
    }

    const contaDestinoEncontrada = contas.find((conta) => {
        return conta.numero === String(numero_conta_destino)
    })

    if(!contaDestinoEncontrada){
        return res.status(404).json({  "mensagem": 'A Conta De Destino não foi encontrado'})
    }

    if(senha !== contaOrigemEncontrada.usuario.senha){
        return res.status(400).json({ "mensagem": "A senha informada é inválida!"})
    }

    if(contaOrigemEncontrada.saldo < valor){
        return res.status(400).json({ "mensagem": "Você Não possui saldo Suficiente."})
    }

    contaOrigemEncontrada.saldo -= Number(valor)
    contaDestinoEncontrada.saldo += Number(valor)

    const registroDetransferencia= {
        data: new Date() ,
        numero_conta_origem ,
        numero_conta_destino,
        valor
    }

    transferencias.push(registroDetransferencia)

    return res.status(200).json()
}

module.exports = {
    depositar,
    sacar,
    transferir
}