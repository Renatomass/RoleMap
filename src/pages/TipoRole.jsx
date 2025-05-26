import { useState } from "react";
import { useUser } from "../context/UseContext";
import { GeradorCod } from "../utils/GeradorCod";
import { useNavigate } from "react-router-dom";
import img01 from "../assets/cerveja.svg";
import img02 from "../assets/dance.svg";
import img03 from "../assets/drink.svg";
import img04 from "../assets/pizza.svg";
import img05 from "../assets/sushi.svg";
import CategoriaItem from "../components/CategoriaItem";
import PageWrapper from "../components/PageWrapper";
import BtnUser from "../components/BtnUser";
import SliderFiltro from "../components/SliderFilter";
import InputText from "../components/InputText";
import BtnPrincipal from "../components/BtnPrincipal";

export default function TipoRole() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [distancia, setDistancia] = useState(30);
  const [preco, setPreco] = useState(2);
  const [nota, setNota] = useState(4);
  const [keywords, setKeywords] = useState("");
  const [nomeRole, setNomeRole] = useState("");
  const { setCodigoSala } = useUser();
  const categorias = [img01, img02, img03, img04, img05];
  const navigate = useNavigate();

  const aleatorizarFiltros = () => {
    const categoriaAleatoria = Math.floor(Math.random() * categorias.length);
    const distanciaAleatoria = Math.floor(Math.random() * 101); // 0 a 100
    const precoAleatorio = Math.floor(Math.random() * 4); // 0 a 3 (como $ até $$$$)
    const notaAleatoria = Math.floor(Math.random() * 6); // 0 a 5 estrelas
    const palavras = [
      "rolê top",
      "balada",
      "gastronomia",
      "aventura",
      "relax",
      "drinks",
      "food",
      "bar",
    ];
    const keywordAleatoria =
      palavras[Math.floor(Math.random() * palavras.length)];
    const nomes = [
      "Noitada aleatória",
      "Rolê maluco",
      "Bora ver no que dá",
      "Desafio do rolê",
      "Rolê Misterioso",
    ];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

    setCategoriaSelecionada(categoriaAleatoria);
    setDistancia(distanciaAleatoria);
    setPreco(precoAleatorio);
    setNota(notaAleatoria);
    setKeywords(keywordAleatoria);
    setNomeRole(nomeAleatorio);
  };

  const handleCriarRole = () => {
  const codigoSimulado = "ROLE123"; 
  setCodigoSala(codigoSimulado);
  navigate("/CodeRoom");
};

  return (
    <PageWrapper>
      <BtnUser />
      <div className="relative">
        <h1 className="w-full mt-12 mb-12 text-5xl font-bold text-center font-pdr">
          Tipo de Rolê:
        </h1>
        <div className="flex gap-4 justify-center flex-wrap my-6 sm: flex-col-1">
          {categorias.map((icon, index) => (
            <CategoriaItem
              key={index}
              icon={icon}
              selected={categoriaSelecionada === index}
              onClick={() => setCategoriaSelecionada(index)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-between">
          <SliderFiltro
            label="Distância"
            icon={<span className="text-xl">📍</span>}
            value={distancia}
            min={0}
            max={50}
            step={5}
            onChange={(e) => setDistancia(Number(e.target.value))}
          />
          <SliderFiltro
            label="Preço"
            icon={<span className="text-xl">$</span>}
            value={preco}
            min={0}
            max={3}
            step={1}
            onChange={(e) => setPreco(e.target.value)}
          />
          <SliderFiltro
            label="Classificação"
            icon={<span className="text-yellow-400">⭐</span>}
            value={nota}
            min={0}
            max={5}
            step={1}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>
        <div className="grid grid-col-1 w-full sm:grid-cols-2 gap-4 my-4">
          <InputText
            label="Palavras-chave"
            placeholder="Inserir palavras-chave"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <InputText
            label="Nome do Rolê"
            placeholder="Ex: Noitada com os cria"
            value={nomeRole}
            onChange={(e) => setNomeRole(e.target.value)}
          />
        </div>
        <div className="grid grid-row sm:grid-cols-2 gap-4 my-4">
          <BtnPrincipal
            Stylo="w-full p-2 bg-btn-cadastro hover:bg-purple-700 text-white font-[Poppins] font-bold mt-1 rounded-2xl text-lg cursor-pointer transition-all"
            onClick={aleatorizarFiltros}
          >
            Supreenda-me
          </BtnPrincipal>

          <BtnPrincipal
            full
            Stylo="p-2 bg-teal-300 hover:bg-teal-400 text-white font-[Poppins] font-bold mt-1 rounded-2xl text-lg cursor-pointer transition-all"
            onClick={handleCriarRole}
          >
            Gerar código do rolê
          </BtnPrincipal>
        </div>
      </div>
    </PageWrapper>
  );
}
