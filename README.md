![Logo of the project](https://media-exp1.licdn.com/dms/image/C4D0BAQF_BghrcOwvkw/company-logo_200_200/0?e=2159024400&v=beta&t=Nch-cwma-F5kmNXbbWJeG_Di3-fg9WPJBMTOQ_M2NWY)

# Desafio de Engenharia Grupo Zap
> [Link para visualizar o desafio](https://eng-zap-challenge-javascript-ten.vercel.app)

Esse desafio foi desenvolvido em Next.js, React, Css Modules. O projeto foi construído como Static Site Generation, porque o conteúdo não mudava. Com isso, o intuito foi otimizar a renderização de gerando o HTML uma única vez ao invés de renderizá-lo em todas as requisições.

## Instalação / Getting started

Para rodar o projeto é super simples:

```shell
npm install
npm start
```

Esses comandos iniciam Next.js no modo de desenvolvimento.

### Requerimentos para rodar o projeto

Ter instalado na sua máquina Node.js 12.0 ou posterior


## Developing

O projeto foi arquitetado com a seguinte estrutura:

- Todas as rotas do projeto estão na pasta *pages*, onde é consumida api disponibilizada para esse desafio.

- Na pasta *portals* existem arquivos com a extensão .md que possuem as informações dos dois portais do Grupo Zap: O Zap Imóveis e o Viva Real. Desses dois arquivos são gerados dados em formato de .json para construir a página inicial do projeto.

- Na pasta *lib* está uma biblioteca simples que consulta a api, manipula os dados retornados e disponibiliza as informações para as rotas que estão na pasta *pages*. Todas as regras de negócio do desafio estão nesse arquivo.

### Building

O projeto foi deployado pela plataforma da vercel.
Para gerar o build, basta executar o seguinte comando.

```shell
npm run build
```

Ao rodar esse comando, uma pasta chamada *.next* será gerada com todos os scripts e arquivos estáticos.


## Features

Nesse projeto é possível:

* Separar as consultas dos imóveis que são do Viva Real e do Zap Imóveis
* Visualizar a lista de imóveis com paginação e galeria de fotos
* Entrar na página de detalhe com galeria de fotos e descrição de cada imóvel.
