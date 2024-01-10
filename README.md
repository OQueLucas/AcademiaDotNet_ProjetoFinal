# 🩺 Consultório - Academia DotNET Projeto Final

![C#](https://img.shields.io/badge/c%23-%23239120.svg?logo=C-sharp&logoColor=white) ![Dot Net 6.0](https://img.shields.io/badge/6.0-blueviolet?logo=.net&logoColor=white)
![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?logo=microsoft%20sql%20server&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)

Projeto final da Academia dotNET #5: Sistema de atendimento e gerenciamento de consulta de medicas.

## Video do projeto

[Video do projeto - https://youtu.be/Aii16mcNKCM](https://youtu.be/Aii16mcNKCM)

<table>
  <tr>
    <td>Tabela</td>
    <td>Visualizar</td>
    <td>Novo</td>
    <td>Editar</td>
  </tr>
  <tr>
    <td>Paciente</td>
    <td>

  ![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/2ef4eac5-26b4-42aa-8783-1e9cc9795a82)
    </td>
    <td>
  ![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/6542f85b-9512-4c49-8a6e-26ad3a54aee6)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/e72d2173-91fa-46aa-9cf3-91b07fd42f91)
    </td>
  </tr>
  <tr>
    <td>Medico</td>
    <td>

![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/d46aae1b-7fd7-42c1-8578-83f82aad63d9)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/b7c70760-2cc1-42fe-a562-cec4f222b866)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/d2e30d02-e54d-464d-b108-092fa9a47d35)
    </td>
  </tr>
  <tr>
    <td>Sintoma</td>

  <td>

  ![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/b6d71b7c-92cf-4565-8751-5b2c5597086f)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/565e0823-cf03-4007-8c83-5329950db971)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/9cb26b2b-4c1b-4bcc-a7a2-9ddc3fa7cb30)
    </td>
  </tr>
  <tr>
    <td>Consulta</td>

  <td>

  ![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/8abc3543-5071-4a66-90b8-2545fa46d4cc)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/8ed36b4b-22d3-48f3-89cd-9076ed1291ff)
    </td>
    <td>
![image](https://github.com/OQueLucas/AcademiaDotNet_ProjetoFinal/assets/36959868/202bc987-6e44-442d-a9e4-ea00adca47d7)
    </td>
  </tr>
</table>

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

- Auth:
  - Autenticação e registro de usuários;

- Admin:
  - Atribuição de regras e listagem de usuários;

Para melhor organização e para a possibilidade de crescimento do código, foi utilizado:

- Padrão de services/repositories, com injeção de dependência.
- ViewModels para visualização, criação e edição.
  - Mapper para as ViewModels.

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

- Roles:
  - Lista de sintomas do sistema;

- Usuários:
  - Lista de usuários cadastrados;
  - Cadastro e manipulação de regras para usuários.

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
- `AutoMapper`
- `JWT`
- `Identity`

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
      npm install
    
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
