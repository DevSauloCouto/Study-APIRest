# Game-API docs

## `POST /auth`
Endpoint responsável por prover a autenticação de um usuário no sistema.
### Parameters
--- 
"email": Email do usuário cadastrado.

"pass": Senha do usuário cadastrado com seu respectivo email.
#### Exemplo:
```
{
    "email": "slcouto12@gmail.com",
    "pass": "12345"
}
```
Esses dados devem ser passados para a requisição POST via JSON.
### Responses
---
#### `Not Authorized 401` - Essa resposta ocorre por 2 motivos: campos de autenticação não preenchidos; credenciais de email e senha inválidas; 
#### Observe os exemplos:
```
{
    "message": "Por favor, preencha todos os campos!"
}
------------------------------------------------------
{
    "error": "Credentials Invalid"
}
```
#### `Error Internal Server 500` - Essa resposta ocorre se acontecer alguma falha no servidor no momento de assinar o token.
#### `OK 200` - Essa resposta ocorre se as credenciais de autenticação forem válidas, ele retorna um token JWT Bearer e com isso, um usuário consegue ter acesso as outras rotas da API que são protegidas. 
#### Observe os exemplos:
```
{
    "message": "User Logged Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkzNzQ3NDc5NzI5ODIyMDkxMDIiLCJuYW1lIjoic2F1bG9jb3V0byIsImVtYWlsIjoic2xjb3V0bzEyQGdtYWlsLmNvbSIsImlhdCI6MTcwNDIwNTE3NCwiZXhwIjoxNzA0MjkxNTc0fQ.vBByWA9fOOSkXmUs5AWx5lGRuUzCQ645ftPw3icipPc"
}
```

## `GET /games`
Endpoint responsável por retornar todos os dados de games cadastrados no banco de dados.
### Parameters
---
N/A
### Responses
---
#### `OK 200` - Essa resposta retorna a listagem de todos os games cadastrados no banco de dados.
#### Observe os exemplos:
```
{
    "jsonGames": [
        {
            "id": "48476257",
            "name": "God of War",
            "year": 2012,
            "price": 25
        },
        {
            "id": "27226282",
            "name": "PES 2020",
            "year": 2019,
            "price": 35
        },
        {
            "id": "9737972",
            "name": "Call Of Duty - Warfare",
            "year": 2018,
            "price": 30
        },
        {
            "id": "981272491",
            "name": "Minecraft",
            "year": 2015,
            "price": 40
        }
    ]
}
```
#### `Not Authorized 401` - Essa resposta ocorre se acontecer alguma falha no momento da autenticação, seja por motivos de token inválido, credenciais inválidas ou erro interno do servidor.
#### Observe os exemplos:
```
{
    "error": "Token Invalid - Access Not Authorized"
}
```

## `GET /game/:id`
Endpoint responsável por retornar informações de um game específico cadastrado no banco de dados, a API faz a consulta do dado com base no ":id" passado na URL.
### Parameters
---
id - passado na URL
#### Exemplo:
```
http://localhost:4343/game/981272491
```
### Responses
---
#### `Not Authorized 401` - Essa resposta ocorre se acontecer alguma falha no momento da autenticação, seja por motivos de token inválido, credenciais inválidas ou erro interno do servidor.
#### Observe os exemplos:
```
{
    "error": "Token Invalid - Access Not Authorized"
}
```
#### `Not Found 404` - Essa resposta ocorre se o parâmetro ':id' passado na URL não for igual com algum dado que possui o registro no campo 'id' da tabela de games do banco de dados.
#### Observe os exemplos:
```
{
    "message": "Not Found Game"
}
```
#### `OK 200` - Essa resposta ocorre se o parâmetro ':id' passado na URL for igual a algum dado que possua um registro no campo 'id' da tabela de games do banco de dados.
#### Observe os exemplos:
```
{
    "id": "981272491",
    "name": "Minecraft",
    "year": 2015,
    "price": 40
}
```

## `POST /game`
Endpoint responsável por cadastrar informações de um game no banco de dados.
### Parameters
---

### Responses
--- 
