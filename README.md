# Documentação do Sistema de Distribuição de Cartas com PokéAPI

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
- **Banco de Dados:** 
- **API Externa:** PokéAPI

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


#### **1. Consulta de Pokémons de um jogador**
**`GET /jogadores/{id}/pokemons`**


**Resposta:**
```json
{
  "id": 1,
  "nome": "Ash Ketchum",
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
#### **2. Distribuição de cartas para um jogador**
**`PUT /jogadores/{id}/pokemons`**

**Resposta:**
```json
{
  "id": 1,
  "nome": "Ash Ketchum",
  "pokemons": [
    {
      "id": 25,
      "nome": "Pikachu"
    },
    {
      "id": 6,
      "nome": "Charizard"
    },
    {
      "id": 150,
      "nome": "Mewtwo"
    },
    {
      "id": 131,
      "nome": "Lapras"
    },
    {
      "id": 94,
      "nome": "Gengar"
    }
  ]
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
