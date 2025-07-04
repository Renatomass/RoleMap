# 🎉 RolêMap

Aplicativo para encontrar o melhor rolê com amigos, baseado nas preferências do grupo, votação e sugestões inteligentes.

---

## 🚀 Tecnologias Utilizadas

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Router DOM](https://reactrouter.com/)
* [Express](https://expressjs.com/)
* [Socket.io](https://socket.io/)
* [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)
* [JWT](https://jwt.io/) + [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 📁 Estrutura de Pastas

```
AppRoleMap/
├── backend/                # Servidor Node.js com Express + Sequelize
│   ├── controllers/        # Lógicas das rotas
│   ├── routes/             # Endpoints da API
│   └── server.js           # API e WebSockets com socket.io
│
├── frontend/               # Aplicação React com Vite
│   ├── assets/             # Imagens e ícones
│   ├── components/         # Componentes reutilizáveis
│   ├── context/            # Contexto global (useUser)
│   ├── pages/              # Telas principais
│   ├── routes/             # Sistema de rotas
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Entrada React DOM
```

---

## 🌐 Rotas Principais

| Rota              | Página       | Função                                       |
| ----------------- | ------------ | -------------------------------------------- |
| `/`               | Splash       | Tela de boas-vindas                          |
| `/apresentacao`   | Apresentacao | Explica como funciona                        |
| `/home`           | Home         | Tela de login e escolha de modo              |
| `/Cadastro`       | Cadastro     | Tela de criação de conta                     |
| `/UserSala`       | UserSala     | Tela inicial do usuário logado               |
| `/TipoRole`       | TipoRole     | Escolha de preferências do rolê              |
| `/sala/convidado` | EntrarSala   | Tela para convidado inserir código           |
| `/CodeRoom`       | CodeRoom     | Exibe o código da sala gerada pelo host      |
| `/preferencias`   | Preferencias | Ajustes adicionais de preferências           |
| `/espera`         | SalaEspera   | Tela de espera com contagem de participantes |
| `/esperando`      | Esperando    | (Alternativa) Esperando participantes        |
| `/resultado`      | Resultado    | Sugestão do rolê + sistema de votação        |
| `/final`          | Final        | Confirmação do local escolhido               |

---

## 🧑‍💻 Como rodar o projeto localmente

```
# Clonar o repositório
https://github.com/Renatomass/RoleMap.git
cd RoleMap

# Instalar e rodar o backend
cd backend
npm install
node server.js

# Em outro terminal, rodar o frontend
cd ../frontend
npm install
npm run dev
```

---

## 🔧 Variáveis de Ambiente

1. crie o arquivo `.env` na raiz do projeto:

2. Preencha os valores das variáveis exigidas:

   ```
   GOOGLE_API_KEY=seu_token_google
   GEMINI_API_KEY=seu_token_gemini
   JWT_SECRET=segredo_da_jwt
   DB_USERNAME=usuario
   DB_PASSWORD=senha
   DB_NAME=banco
   DB_DIALECT=mysql
   DB_HOST=localhost
   ```

## 🧠 Como contribuir (colaboradores da equipe)

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Renatomass/RoleMap.git
   ```
2. **Crie uma nova branch com seu nome ou funcionalidade**

   ```bash
   git checkout -b feat/nome-da-funcionalidade
   ```
3. **Edite apenas os arquivos da sua parte**
4. **Adicione, commite e envie seu código**

   ```bash
   git add .
   git commit -m "feat: minha funcionalidade"
   git push origin feat/nome-da-funcionalidade
   ```
5. **Abra um Pull Request para `develop`**

---

## 🧾 Convenção de Branches

* `main`: versão estável em produção
* `develop`: versão de desenvolvimento integrada
* `backend`: alterações específicas do servidor
* `frontend`: alterações específicas do client
* `feat/`: novas funcionalidades (ex: `feat/votacao`)
* `fix/`: correções de bugs
* `refactor/`: refatorações

---

## ✨ Status atual do projeto

* [x] Setup com Vite + React
* [x] TailwindCSS instalado e funcionando
* [x] React Router configurado com todas as rotas
* [x] Splash.jsx estilizada com Tailwind
* [x] Login e Cadastro funcionando com Context API
* [x] Estrutura separada de frontend/backend com Socket.io
* [x] Integração com banco de dados em andamento
* [x] Sugestão de rolê e sistema de votação

---

## 📌 Observações

* Mantenha sua branch sincronizada com `develop`:

  ```bash
  git pull origin develop --rebase
  ```
* Faça commits pequenos e objetivos
* Evite conflitos modificando apenas o que for sua responsabilidade
* Backend usa ESModules (`type: "module"`)

---