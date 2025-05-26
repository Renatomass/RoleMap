import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const slides = [
  {
    titulo: "🎯 Crie uma sala",
    texto: "Comece um rolê do zero e convide seus amigos.",
    img: "./public/assets/001.png",
  },
  {
    titulo: "⚙️ Defina as preferências",
    texto: "Escolha categoria, distância, preço e mais.",
    img: "../public/assets/02.png",
  },
  {
    titulo: "🧠 O algoritmo sugere",
    texto: "Com base nas escolhas, o app encontra o rolê ideal.",
    img: "../public/assets/03.png",
  },
  {
    titulo: "🗳️ Votem em grupo",
    texto: "Todos votam. Se a maioria topar... partiu!",
    img: "../public/assets/04.png",
  },
];

export default function Apresentacao() {

  const [atual, setAtual] = useState(0);

  const avancar = () => setAtual((prev) => (prev + 1) % slides.length);
  const voltar = () => setAtual((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <PageWrapper>
      <div className="w-full max-w-md mx-auto text-center px-6 py-10 text-white font-pdr">
        <img src={slides[atual].img} alt="" className="w-full h-90 object-contain mb-6 shadow-2xl rounded-4xl " />
        <h2 className="text-3xl font-bold mb-2">{slides[atual].titulo}</h2>
        <p className="text-2xl text-white/80">{slides[atual].texto}</p>

        <div className="flex justify-between items-center mt-6">
          <button onClick={voltar} className="text-sm px-4 py-2 bg-white/10 rounded-xl font-pdr font-bold cursor-pointer">⬅️ Voltar</button>
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i === atual ? "bg-teal-300" : "bg-white/20"}`}
              />
            ))}
          </div>
          <button onClick={avancar} className="text-sm px-4 py-2 bg-white/10 rounded-xl font-pdr font-bold cursor-pointer">Próximo ➡️</button>
        </div>
      </div>
    </PageWrapper>
  );
}
