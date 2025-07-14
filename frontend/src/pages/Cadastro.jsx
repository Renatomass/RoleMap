import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LogoMarca from "../components/LogoMarca";
import WhiteContainer from "../components/WhiteContainer";
import { useUser } from "../context/UseContext";
import { api } from "../services/api";
import { log, error } from "../utils/logger";
import Toast from "../components/Toast";
import EmailVerificationPopup from "../components/EmailVerificationPopup";

export default function Cadastro() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [toastMsg, setToastMsg] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const verificarCodigo = async (codigo) => {
    try {
      const resp = await api.post("/usuarios/verificar-codigo", {
        email: form.email,
        codigo,
      });
      const { usuario, token } = resp.data;
      setUser({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token,
      });
      navigate("/UserSala");
    } catch (err) {
      error("Erro na verificação:", err);
      if (err.response) {
        setToastMsg(err.response.data.erro || "Código inválido");
      } else {
        setToastMsg("Erro na verificação");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/cadastro", form);
      setMostrarPopup(true);
    } catch (err) {
      error("Erro bruto no cadastro:", err);

      if (err.response) {
        log("Erro da API:", err.response.data);
        setToastMsg(err.response.data.erro || "Erro ao cadastrar (API).");
      } else {
        setToastMsg("Erro ao cadastrar (sem resposta do servidor).");
      }
    }
  };

  return (
    <PageWrapper>
      <LogoMarca />
      <WhiteContainer>
        <h2 className="text-black text-xl font-bold -mt-4 mb-2 text-center">
          Criar Conta
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl mt-2.5 bg-purple-100 text-purple-700 text-sm font-pdr focus:outline-0"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-sm font-pdr focus:outline-0"
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-sm font-pdr focus:outline-0"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-bold rounded-2xl text-lg cursor-pointer"
          >
            Cadastrar
          </button>
          <div className="text-center text-sm font-semibold text-gray-500 -mt-1 -mb-1">
            OU
          </div>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="w-full p-2 bg-btn-cadastro hover:bg-purple-700 text-white font-[Poppins] font-bold rounded-2xl text-lg cursor-pointer transition-all"
          >
            Já tem conta? Voltar
          </button>
        </form>
      </WhiteContainer>
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      )}
      {mostrarPopup && (
        <EmailVerificationPopup
          onConfirm={verificarCodigo}
          onClose={() => setMostrarPopup(false)}
        />
      )}
    </PageWrapper>
  );
}
