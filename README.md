## Sobre
Este é o backend da aplicação **Proffy**

## O que é proffy?
**Proffy** é uma plataforma onde professores e alunos do ensino médio têm a oportunidade de se encontrar com intuito de dar/ter uma aula de reforço.
Na visão de aluno é possível filtrar pelos **dias**, **horas** e **matérias** das quais você deseja dar aulas. Já o professores poderão se registrar informando estes 3 atributos citados.

## Repositórios das aplicações que integram a plataforma **Proffy**
- [Web](https://github.com/alexandrebrunodias/proffy-web)
- [Mobile](https://github.com/alexandrebrunodias/proffy-mobile)

## Material de suporte
- [Preparo do Ambiente de Desenvolvimento](https://www.notion.so/Configurando-Ambiente-NLW-98a471ad3cb6448284b8ceed31c45767)

## Linguagens, frameworks e ferramentas
-  [Node.js](https://nodejs.org/en/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Express](https://expressjs.com/)
-  [SQLite](https://www.sqlite.org/index.html)

## Executando o projeto

```sh
  # Clone o repositório
  $ git clone https://github.com/alexandrebrunodias/proffy-backend
  # Acesse o diretório da aplicação
  $ cd proffy-backend
  # Instale as dependências da aplicação
  $ yarn install
  # Execute as migrações
  $ yarn knex:migrate
  # Inicie aplicação
  $ yarn start
```