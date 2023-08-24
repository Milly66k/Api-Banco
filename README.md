

1 - Listar Contas:
GET /contas?senha_banco=Cubos123Bank
Nessa rota, verifico se a senha do banco foi passada na URL. Se não for enviada, informo que a senha não foi informada. Se for informada e estiver errada, aviso "senha inválida". Se estiver correta, listo as contas existentes.

2 - Criar Conta Bancária:
POST /contas
Aqui, crio uma nova conta. No corpo da requisição, espero receber nome, CPF, data de nascimento, telefone, e-mail e senha. Se algum campo não for informado, aviso que está faltando. Depois verifico se o e-mail e CPF já existem no banco de dados. A conta criada começa com saldo 0 e seu número de identificação é incrementado automaticamente para evitar repetições. Em caso de sucesso, retorno o status code 201.

3 - Atualizar Usuário da Conta Bancária:
PUT /contas/:numeroConta/usuario
Nessa rota, atualizo os dados de um usuário. Verifico se todos os campos necessários foram passados no corpo da requisição e se a conta informada existe. Em seguida, verifico se o CPF e o e-mail já não estão em uso por outro usuário. Se não estiverem, faço as alterações necessárias.

4 - Excluir Conta:
DELETE /contas/:numeroConta
Nessa rota, deleto uma conta. Primeiro, verifico se o número da conta foi passado na URL e se a conta existe. Só é possível deletar se o saldo for zero. Em caso de sucesso, a conta é deletada.

5 - Depositar:
POST /transacoes/depositar
Nessa rota, realizo um depósito e registro a transação. Verifico se o número da conta e o valor do depósito foram informados. Depois, checo se a conta existe e se o valor do depósito é positivo. Em caso positivo, adiciono o valor ao saldo da conta e registro a transação.

6 - Sacar:
POST /transacoes/sacar
Aqui, realizo um saque e registro a transação. Verifico se o número da conta, o valor do saque e a senha foram informados. Em seguida, verifico se a conta existe, se a senha está correta, se o valor não é negativo e se há saldo suficiente. Se tudo estiver certo, realizo o saque e registro a transação.

7 - Transferir:
POST /transacoes/transferir
Nessa rota, faço uma transferência entre contas e registro a transação. Verifico se os campos necessários foram passados no corpo da requisição e se as contas existem. Checo a senha da conta de origem, o saldo disponível e se o valor não é negativo. Realizo a transferência e registro a transação.

8 - Saldo:
GET /contas/saldo?numero_conta=123&senha=123
Nessa rota, verifico o saldo da conta do cliente. Checo se o número da conta e a senha foram passados na URL, se a conta existe e se a senha está correta. Se tudo estiver certo, exibo o saldo na tela.

9 - Extrato:
GET /contas/extrato?numero_conta=123&senha=123
Nessa rota, exibo o extrato da conta. Verifico se o número da conta e a senha foram passados na URL, se a conta existe e se a senha está correta. Se tudo estiver certo, listo saques, depósitos e transferências.