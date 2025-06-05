function gerarCodigo(tamanho = 6) {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < tamanho; i++) {
    codigo += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  return `ROLE${codigo.slice(0, 3)}`;
}

module.exports = gerarCodigo;
