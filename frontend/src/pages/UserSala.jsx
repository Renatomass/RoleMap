import { useNavigate, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LogoMarca from "../components/LogoMarca";
import BtnCriarRole from "../components/BtnCriarRole";
import BtnConvidado from "../components/BtnConvidado";
import { useUser } from "../context/UseContext";
import { useState } from "react";
import Toast from "../components/Toast";

export default function UserSala() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
    const [toastMsg, setToastMsg] = useState("");

  const handleLogout = () => {
      logout();
      setToastMsg("Logout realizado");
      setTimeout(() => {
        navigate("/Home");
      }, 1000); 
  }
    return (
      <PageWrapper>
        <div className="flex flex-col justify-center" >
          <LogoMarca className="flex flex-col mb-10" />
          <h2 className="text-whiten text-center text-xl font-bold">Bem-vindo(a), {user?.nome || "usuário"}!</h2>
          <Link to="/TipoRole">
            <BtnCriarRole/>
          </Link>
          <Link to="/sala/convidado">
            <BtnConvidado />
          </Link>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-400 hover:bg-red-500 text-white px-2 py-2 rounded-2xl font-bold cursor-pointer"
          >
            Sair da conta
          </button>
        </div>
        {toastMsg && (
          <Toast message={toastMsg} onClose={() => setToastMsg("")} />
        )}
      </PageWrapper>
    );
}
