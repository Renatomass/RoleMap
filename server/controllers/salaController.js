import gerarCodigo from "../utils/gerarCodigo.js";

export const criarSala = (req, res) => {
  const codigo = gerarCodigo();
  console.log(`🎉 Sala criada com código: ${codigo}`);
  res.json({ codigo });
};
