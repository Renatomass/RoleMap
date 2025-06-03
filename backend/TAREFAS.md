## 👤 Dev 1 – Autenticação e Usuário - Bryan
Responsável por:

Criar userModel.js

Criar authController.js

Criar authRoutes.js

Tarefas:

Implementar register, login e profile

Criar middleware authMiddleware.js

Usar bcrypt + JWT

Testar com insomia

## 🏠 Dev 2 – Salas, Preferências e Votação - Carlos
Responsável por:

Continuar no salaController.js e salaRoutes.js

Criar models:

Sala, Preferencia, Voto

Rotas:

POST /api/sala/criar, entrar, preferencias, voto

Ajustes:

Verificar se gerarCodigo.js está sendo importado corretamente

Padronizar respostas da API (status 200, 400, etc.)

## 🌍 Dev 3 – Sockets e Localização - Emmanuel
Responsável por:

Continuar no socketHandlers.js

Criar novo model Localizacao

Emitir eventos:

participante_entrou

votacao_iniciada

atualizar_localizacao

## 👨‍💻 Dev 4 – Integrações Front-End + Back-End - Renato
Responsável por: 

Todas as chamadas com fetch ou axios

Integração com os sockets (socket.on, socket.emit)

Tratamento de erros no front

Validação de dados enviados

Testar fluxo completo entre front e back

🔐 Autenticação
 Consumir POST /api/auth/register na página de cadastro

 Consumir POST /api/auth/login na página de login

 Armazenar token JWT no context ou localStorage

 Usar token para acessar rota GET /api/auth/profile

🧠 Criação de Sala
 Consumir POST /api/sala/criar

 Emitir socket entrar_na_sala

 Salvar código da sala e redirecionar para /CodeRoom

🧭 Preferências
 Enviar nome, categoria, preço, nota, distância

 Consumir rota: POST /api/sala/preferencias

📡 Sockets
 Conectar via socket na home

 Emitir: entrar_na_sala, atualizar_preferencias, iniciar_votacao

 Ouvir: atualizar_participantes, resultado_votacao

🗳️ Votação e Resultado
 Enviar voto: POST /api/sala/votar

 Receber resultado: socket.on("resultado_votacao")