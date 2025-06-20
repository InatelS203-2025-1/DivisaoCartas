# Documentação do Sistema de Distribuição de Cartas com PokéAPI

## Stack usada

Linguagem: Typescript
Banco de dados: SQLite
Mensageria: RabbitMQ


## Visão Geral
O sistema de distribuição de cartas utiliza a [PokéAPI](https://pokeapi.co/) para selecionar cinco Pokémons aleatórios e atribuí-los a cada jogador cadastrado na plataforma. O processo ocorre automaticamente no momento do cadastro do jogador, garantindo que ele não receba Pokémons repetidos. No entanto, o mesmo Pokémon pode ser distribuído para diferentes jogadores. 

A aplicação também disponibiliza uma interface para consulta dessas informações por outras aplicações.

---

## Funcionalidades
- Seleção automática de cinco Pokémons aleatórios por jogador
- Garantia de que um jogador não receba Pokémons repetidos
- Disponibilidade de Pokémons para múltiplos jogadores
- API para consulta das informações
- Registrar troca de cartas
- Registrar logs de alterações

---

## Tecnologias Utilizadas
- **Back-end:** TypeScript
- **Banco de Dados:** SQLITE
- **API Externa:** PokéAPI

---

## Padrão Arquitetural
- **SOA** Service Oriented Architecture
    O projeto se foca em serviços e não se beneficia em fornecer views para seus clientes.
- **MOM** Message Oriented Middleware
    O projeto também usa comunicação assíncrona para distribuir cartas a novos jogadores, toda vez que um novo jogador é registrado no broker do RabbitMQ, o sistema reage distribuindo as cartas ao jogador e salvando no banco de dados.

---
## Design Patterns
- **Observer** Aplicado na comunicação assíncrona com o RabbitMQ, permitindo que, sempre que um novo jogador é cadastrado, uma mensagem seja automaticamente enviada para outros serviços interessados. Esse padrão garante o desacoplamento entre quem emite o evento (cadastro) e quem consome (serviços que recebem as mensagens).
- **Singleton** Empregado nos repositories e controllers para garantir que exista apenas uma única instância desses objetos durante toda a execução da aplicação. Isso otimiza o uso de recursos, além de garantir um ponto de acesso global e consistente para essas classes.
- **Repository** Responsável por abstrair a comunicação com o banco de dados, isolando a lógica de acesso aos dados da lógica de negócios. Esse padrão facilita a manutenção, testes e possíveis trocas de tecnologias de persistência no futuro.

---
## Fluxo de Funcionamento
   
1. **Seleção de Pokémons**
   - A aplicação consulta a PokéAPI para obter um conjunto aleatório de Pokémons.
   - Verifica se o jogador já recebeu algum dos Pokémons sorteados.
   - Caso haja repetição, uma nova seleção é feita até que os cinco Pokémons sejam únicos.
   
2. **Armazenamento no banco de dados**
   - Os Pokémons selecionados são registrados no banco de dados e associados ao jogador.
   
3. **Disponibilização da API**
   - Uma API REST permite consultas sobre os jogadores e seus respectivos Pokémons.
   
---

## Estrutura da API

### **Endpoints**

#### **1. Criar um novo jogador**
**`POST /users`**
**Request Body**
```json
{
  "nome": "João"
}
```
**Resposta:**
```json
{
  "id": 1,
  "nome": "João"
}
```

#### **2. Listar todos os jogadores**
**`GET /users`**

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "joão"
  },
  {
    "id": 2,
    "nome": "Maria"
  }
]

```

#### **3. Consulta de Pokémons de um jogador**
**`GET /users/{id}/cards`**


**Resposta:**
```json
{
  "id": 1,
  "nome": "João",
  "pokemons": [
    {
      "id": 25,
      "nome": "Pikachu"
    },
    {
      "id": 6,
      "nome": "Charizard"
    }
  ]
}
```
#### **4. Registrar uma troca de cartas entre jogadores**
**`PUT /users/trade`**
**Request Body:**
```json
{
  "idJogador1": 1,
  "idJogador2": 2,
  "idCartaJogador1": 25,
  "idCartaJogador2": 7
}
```
**Resposta (Sucesso):**
```json
{
  "mensagem": "Troca realizada com sucesso!"
}
```
---
## Regras de Negócio
- Um jogador recebe cinco Pokémons aleatórios no momento do cadastro.
- Um jogador não pode ter Pokémons repetidos.
- O mesmo Pokémon pode ser distribuído para diferentes jogadores.
- A API deve permitir consultas eficientes sobre jogadores e seus Pokémons.

---

## Considerações Finais
Este sistema automatiza a distribuição de Pokémons para jogadores cadastrados, garantindo unicidade dentro de cada conta e permitindo consultas via API. Ele pode ser expandido para suportar novos recursos, como trocas entre jogadores e batalhas.
