import PageWrapper from "../components/PageWrapper";
import Timer from "../components/Timer";
import CardLocal from "../components/CardLocal";
import MsgInput from "../components/MsgInput";
import Feedback from "../components/Feedback";
import BtnUser from '../components/BtnUser';


export default function ResultadoRole() {
  const amigos = [
    { nome: "João", msg: "Cuida!" },
    { nome: "Maria", msg: "Paia demais!" },
    { nome: "Paulo", msg: "Sei não hein..." },
    { nome: "Julia", msg: "Partiu!" },
  ];

  return (
    <PageWrapper>
      <BtnUser/>
      <Timer tempo="00:18" />
      <div className="flex flex-col-1 lg:flex-row gap-8 justify-center items-center w-full mt-4 px-4">
        <CardLocal
          nome="Bistrô Solar"
          imagem="src/assets/restaurante.jpg"
          nota={4.5}
          distancia="1,5km"
        />

        <div className="bg-[#2c1257] rounded-3xl p-6 w-full max-w-lg text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">O que você achou?</h2>
          <MsgInput />
          <div className="flex justify-around mt-6">
            {amigos.map((amigo, i) => (
              <Feedback key={i} nome={amigo.nome} msg={amigo.msg} />
            ))}
          </div>
        </div>      
      </div>
    </PageWrapper>
  );
}
