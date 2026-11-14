# Artefact Task Manager

Gosto muito de escrever projetos para processos seletivos não apenas para cumprir os requisitos do teste, mas também para me desafiar, em linha com os desafios da fase atual da minha carreira.

Foi feito não só como um projeto de teste, mas também como uma recordação das normas e dos padrões de código utilizados em um projeto de estudo baseado no livro *Cangaceiro JavaScript*, do professor Flávio Almeida. A motivação para a arquitetura e para o estilo de escrita partiu de um projeto que fiz há cerca de quatro anos: [https://github.com/claudiodeolli/Vilm](https://github.com/claudiodeolli/Vilm).

O Vilm surgiu como um estudo no qual eu queria chegar a um resultado próximo ao de um framework, usando apenas JavaScript puro, com Web Components e rotas pelo servidor. Aproveitando o gancho do projeto do Task Manager, defini como objetivo replicar esse estilo de escrita de código de que gosto tanto e que, com os tempos ágeis, acabei deixando de lado por um tempo, além de ser um desafio de clonagem de características pessoais e de fidelidade que uma IA consegue entregar.

Não conhecia o tRPC até então, então este projeto também foi uma porta de entrada para essa biblioteca.

O projeto mantém alguns padrões antigos de nomeação de variáveis, utiliza os princípios SOLID e KISS, possui testes E2E e tem uma UI/UX inspirada no site da Artefact.

A escrita é simples e enxuta, com arquivos separados e seguindo a stack recomendada.

O projeto é bem simples, então não acho que haja algum detalhe muito especial a comentar.

Disponível no seguinte link: [https://artefact-task-manager-2zq0.onrender.com/](https://artefact-task-manager-2zq0.onrender.com/)

O Render foi usado apenas pela gratuidade e pela facilidade de deploy.

## Como rodar

### Pré-requisitos

* **Node.js 22 LTS** (o projeto exige a versão 20 ou superior)
* **npm** (incluído na instalação do Node.js)
* **Git** para clonar o repositório

Clone o projeto e entre na pasta:

```bash
git clone https://github.com/claudiodeolli/artefact-task-manager.git
cd artefact-task-manager
```

Instale as dependências:

```bash
npm install
```

Para rodar em desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

Para gerar o build de produção e iniciar o servidor logo após:

```bash
npm run build
npm run start
```

O servidor também usa a porta `3000` por padrão.
