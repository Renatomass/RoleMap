# 🎉 RolêMap

Aplicativo para encontrar o melhor rolê com amigos, baseado nas preferências do grupo, votação e sugestões inteligentes.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)

---

## 📁 Estrutura de Pastas

```
src/
├── assets/              # Imagens e ícones
├── components/          # Componentes reutilizáveis (botões, inputs, cards)
├── pages/               # Páginas da aplicação
├── routes/              # Sistema de rotas centralizado
├── App.jsx              # Entrada principal do app
└── main.jsx             # Bootstrap do React + Tailwind
```

---

## 🌐 Rotas Principais

| Rota              | Página                       | Função                                 |
|-------------------|------------------------------|----------------------------------------|
| \`/\`             | Splash                       | Tela de boas-vindas                    |
| \`/home\`         | Home                         | Escolha de modo (host/convidado...)   |
| \`/criar\`        | CriarSala                    | Criar nova sala (host)                 |
| \`/sala/:codigo\` | EntrarSala                   | Convidado insere o código da sala      |
| \`/preferencias\` | Preferencias                 | Seleciona gostos do usuário            |
| \`/esperando\`    | Esperando                    | Aguarda todos entrarem                 |
| \`/resultado\`    | Resultado                    | Sugestão do rolê + votação             |
| \`/final\`        | Final                        | Confirmação do local escolhido         |

---

## 🧑‍💻 Como rodar o projeto localmente

```
# Clonar o repositório
git clone https://github.com/Renatomass/RoleMap.git
cd RoleMap

# Instalar dependências
npm install

# Iniciar o servidor local
npm run dev
```
---

## 🧠 Como contribuir (colaboradores da equipe)

1. **Clone o repositório**
    ```
   git clone https://github.com/Renatomass/RoleMap.git
   ```

2. **Crie uma nova branch com seu nome ou funcionalidade**
   ```
   git checkout -b feat/nome-da-funcionalidade
   ```

3. **Edite apenas os arquivos da sua parte**
   - Por exemplo: se você é responsável pela página `Preferencias`, edite só `src/pages/Preferencias.jsx` e seus componentes relacionados.

4. **Adicione, commite e envie seu código**
   ```
   git add .
   git commit -m "feat: tela de Preferencias"
   git push origin feat/nome-da-funcionalidade
   ```

5. **Abra um Pull Request no GitHub para a branch \`main\` ou \`develop\`**

---

## 🧾 Convenção de Branches

- `main`: versão estável em produção
- `develop`: versão de desenvolvimento integrada
- `feat/`: novas funcionalidades (\`feat/splash-screen\`)
- `fix/`: correções de bugs (\`fix/votacao-botao\`)
- `refactor/`: melhorias de código sem mudança de comportamento

---

## ✨ Status atual do projeto

- [x] Setup com Vite + React
- [x] TailwindCSS instalado e funcionando
- [x] React Router configurado com todas as rotas
- [x] Splash.jsx estilizada com Tailwind
- [ ] Demais páginas em progresso...

---

## 📌 Observações

- Sempre mantenha seu branch atualizado com `main`:
  ```
  git pull origin main --rebase
  ```
- Evite conflitos editando arquivos que não são sua responsabilidade
- Para deploy futuro, usaremos Vercel ou Netlify

---

## 💬 Dúvidas ou sugestões?

Fale com [@Renatomass](https://github.com/Renatomass)
