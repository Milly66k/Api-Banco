const { saques } = require("../bancodedados")

const verificarSenha = (req, res, next) => {
    const { senha_banco } = req.query

    if(!senha_banco){
        return res.status(401).json({ "mensagem": "Senha Não informada"})
    }

    if(senha_banco === "Cubos123Bank"){
        next()
    }

    if(senha_banco !== 'Cubos123Bank'){
        return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!"})
    }

}


module.exports = {
    verificarSenha
}