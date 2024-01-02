# 🩺 Consultório - Academia Dotnet Projeto Final

Projeto final da Academia Dotnet #5: Sistema de atendimento e gerenciamento de consulta de medicas.

## 📐 Regras de negócio

### Backend

- Cadastro de pessoas (tanto médico quanto paciente) possuem as características principais para o funcionamento do consultório, tanto para medico e paciente, onde possui informações de endereço, contato, tipo sanguíneo e pessoais.

- Paciente:
  - Cadastro das informações básicas da pessoa, mais observação.
  - Lista de consultas dos pacientes.

- Medico:
  - Cadastro das informações básicas da pessoa, mais CRM e especialização.
  - Lista de consultas marcadas dos Medicos.

- Consulta:
  - Cadastro e manipulação de consulta.
  - Listagem de consultas marcadas.
  - Adicionar e remover sintomas apresentado pelo paciente.

- Sintomas:
  - Cadastro e manipulação de tipos de sintomas para cadastrar em consulta.

Para melhor organização e para a possibilidade de crescimento do código, foi utilizado:

- Padrão de services/repositories, com injeção de dependência.
- ViewModels para visualização, criação e edição.

### Frontend

- Formulário de cadastro de pessoas (tanto médico quanto paciente) possuem as características principais para o funcionamento do consultório, tanto para medico e paciente, onde possui informações de endereço, contato, tipo sanguíneo e pessoais.

- Paciente:
  - Lista de pacientes cadastrados;
  - Cadastro das informações básicas, mais observação.

- Medico:
  - Lista de medicos cadastrados;
  - Cadastro das informações básicas, mais CRM e especialização.

- Consulta:
  - Lista de consultas marcadas;
  - Cadastro e manipulação de consulta;
  - Adicionar e remover sintomas apresentado do paciente.

- Sintomas:
  - Lista de sintomas cadastrados;
  - Cadastro e manipulação de tipos de sintomas para cadastrar em consulta.

### Pontos de melhorias

Por questão do projeto ser feito com a estratégia de MVP, foi realizado as principais funcionalidades do mesmo, porém pensando na possibilidade de ser adicionado melhorias. Segue abaixo alguns pontos que levantei como possíveis melhorias:

- Soft delete para todos os campos.

- Autenticação para medicos e pacientes acompanharem seus próprios registros (Os médicos teriam acesso aos outros registros, porém teria área focada nos registros dele).

- Página Home:
  - Medicos: onde poderão visualizar consultas que irão realizar.
  - Pacientes: onde poderão visualizar suas consultas que foi marcada.

- Tabelas e campos para manipulação de exames e alergias dos pacientes.

- Tabela de telefones, com campo de relação da pessoa e com campo de emergência para definir se é um contato de emergência da pessoa (Médico ou Paciente).

## UML

<div style="display:flex">
  <img src="https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/blob/main/Arquitetura/Escopo%20base%20-%20Hospital.jpg" title="UML escopo inicial" alt="UML do escopo inicial do projeto com tabelas simplificadas" width="40%">
  <img src="https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/blob/main/Arquitetura/Escopo%20final%20-%20Hospital.jpg" title="UML escopo final" alt="UML do escopo final do projeto com tabelas mais robustas" width="40%">
</div>

## 🔧 Recursos

### BackEnd

- `.NET 6`
- `C#`
- `Entity Framework`
- `Migration`

### Database

- `SQL Server`

### FrontEnd

- `Angular`
- `Angular Material`
- `Bootstrap`

## 🔻 Clonar Repositório

```bash
git clone git@github.com:OQueLucas/AcademiaDotNet_ProjetoFinal.git
```

## 🧑🏽‍💻 Como utilizar

- Configuração:

  - Após o download, acesse `Consultorio.API/Consultorio.API/appsettings.json` e ajuste a string de conexão (se necessário).

  - abra e execute o seguinte comando em Package Manager Console (Console de Gerenciamento de Pacote):

    ```bash
    Update-Database
    ```

  - Após realizar esse comando, seu banco deve ser criado e poderá inicializar o projeto.

  - Após o download, acesse `Consultorio.APP/src/environments/environment.ts || environment.prod.ts` e ajuste a porta (se necessário).

  - Agora só iniciar o front end:

    ```bash
    ng serve
    ```

- Utilização

  - Cadastre os Pacientes e os Medicos.
  - Cadastre os sintomas.
  - Agora poderá selecionar os pacientes e medicos cadastros no formulário de consulta.

## 👨🏻‍🦱 Author

[Lucas Queiroz](https://github.com/OQueLucas/)

## 🎁 Agradecimento

Agradeço a Atos, UFN e aos professores Fabrício, Ricardo e Alexandre, que são grandes mestres e transmitiram muito conhecimento ao longo desse processo da Academia DotNet.

E agradeço pela oportunidade de participar dessa Academia!
