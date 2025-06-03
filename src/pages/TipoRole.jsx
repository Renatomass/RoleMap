import { useState } from "react";
import { useUser } from "../context/UseContext";
import { useNavigate } from "react-router-dom";
import img01 from "../assets/cerveja.svg";
import img02 from "../assets/dance.svg";
import img03 from "../assets/drink.svg";
import img04 from "../assets/pizza.svg";
import img05 from "../assets/sushi.svg";
import CategoriaItem from "../components/CategoriaItem";
import PageWrapper from "../components/PageWrapper";
import SliderFiltro from "../components/SliderFilter";
import InputText from "../components/InputText";
import BtnPrincipal from "../components/BtnPrincipal";
import socket from "../services/sockets";
import { api } from "../services/api";

export default function TipoRole() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [distancia, setDistancia] = useState(30);
  const [preco, setPreco] = useState(2);
  const [nota, setNota] = useState(4);
  const [keywords, setKeywords] = useState("");
  const { setCodigoSala, setNomeRole, nomeRole, user } = useUser();
  const navigate = useNavigate();

  const categorias = [img01, img02, img03, img04, img05];

  const aleatorizarFiltros = () => {
    const categoriaAleatoria = Math.floor(Math.random() * categorias.length);
    const distanciaAleatoria = Math.floor(Math.random() * 51);
    const precoAleatorio = Math.floor(Math.random() * 4);
    const notaAleatoria = Math.floor(Math.random() * 6);
    const palavras = [
      "rolê top", "balada", "gastronomia", "aventura",
      "relax", "drinks", "food", "bar"
    ];
    const nomes = [
      "Noitada aleatória", "Rolê maluco", "Bora ver no que dá",
      "Desafio do rolê", "Rolê Misterioso"
    ];
    const keywordAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

    setCategoriaSelecionada(categoriaAleatoria);
    setDistancia(distanciaAleatoria);
    setPreco(precoAleatorio);
    setNota(notaAleatoria);
    setKeywords(keywordAleatoria);
    setNomeRole(nomeAleatorio);
  };

  const handleCriarRole = async () => {
    try {
      const nomeFinal = nomeRole.trim() || "Rolê sem nome";
      const response = await api.post("/criar-sala", {
        nome: nomeFinal,
      });

      const { codigo, nome } = response.data;

      setCodigoSala(codigo);
      setNomeRole(nome);

      // Se não houver nome no contexto, peça um via prompt
      const apelido = user?.nome || prompt("Digite seu nome para entrar na sala:");
      socket.emit("entrar_na_sala", {
        codigo,
        apelido: apelido || "Anfitrião",
      });

      navigate("/CodeRoom");
    } catch (error) {
      console.log("Erro ao criar sala:", error);
    }
  };

  return (
    <PageWrapper>
      <div className="relative">
        <h1 className="w-full mt-12 mb-12 text-5xl font-bold text-center font-pdr">
          Tipo de Rolê:
        </h1>

        <div className="flex gap-4 justify-center flex-wrap my-6">
          {categorias.map((icon, index) => (
            <CategoriaItem
              key={index}
              icon={icon}
              selected={categoriaSelecionada === index}
              onClick={() => setCategoriaSelecionada(index)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
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
            onChange={(e) => setPreco(Number(e.target.value))}
          />
          <SliderFiltro
            label="Classificação"
            icon={<span className="text-yellow-400">⭐</span>}
            value={nota}
            min={0}
            max={5}
            step={1}
            onChange={(e) => setNota(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
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
