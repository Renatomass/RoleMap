const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
logger.log("🔐 Middleware de autenticação carregado");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.log("✅ Token validado com sucesso");
    req.usuario = decoded;
    next();
  } catch (err) {
    logger.error("❌ Token inválido:", err.message);
    return res.status(401).json({ erro: 'Token inválido' });
  }
};
