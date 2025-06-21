import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseContext";
import PageWrapper from "../components/PageWrapper";
import LogoMarca from "../components/LogoMarca";
import WhiteContainer from "../components/WhiteContainer";
import BtnEntrar from "../components/BtnEntrar";
import BtnCadastreSe from "../components/BtnCadastre-se";
import BtnEntrarCodigo from "../components/BtnEntrarCodigo";
import InputLogin from "../components/InputLogin";
import ApelidoPopup from "../components/ApelidoPopup";
import { api } from "../services/api"; 

export default function Home() {
  const { user,setUser } = useUser();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [apelido, setApelido] = useState("");
  const [erroApelido, setErroApelido] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAnimar, setPopupAnimar] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
        const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("usuarios/login", {
        senha: form.senha,
        email: form.email,
      });
      const { usuario, token } = response.data;
      setUser({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token: token,
      });

       
      navigate("/UserSala");

    } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    alert(error.response?.data?.erro || "Erro ao fazer login. Tente novamente.");

    }
   
  };

  const handleApelidoConfirmar = () => {
    if (apelido.trim()) {
      setUser((prev) => ({ ...prev, apelido }));
      navigate("/sala/convidado");
    } else {
      setErroApelido(true);
      setTimeout(() => setErroApelido(false), 500);
    }
  };

  useEffect(() =>{
    if (user?.email && user?.senha)
    { navigate ("/UserSala");}
  }, [user, navigate]);

  return (
    <PageWrapper>
      <LogoMarca />
      <WhiteContainer>
        <form onSubmit={handleSubmit}>
          <InputLogin
            label="Email"
            name= "email"
            type="email"
            value={form.email}
            required
            onChange={handleChange}
            placeholder="Digite seu email"
            
          />
          <InputLogin
            label="Senha"
            name= "senha"
            type="password"
            value={form.senha}
            required
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          <BtnEntrar type="submit"/>
        </form>
        <p className="text-black font-medium text-xs text-center mt-1">OU</p>
        <Link to="/Cadastro">
          <BtnCadastreSe />
        </Link>
        <BtnEntrarCodigo
          onClick={() => {
            setShowPopup(true);
            setPopupAnimar(true);
          }}
        />
      </WhiteContainer>
      {showPopup && (
        <ApelidoPopup
          apelido={apelido}
          setApelido={setApelido}
          animar={popupAnimar}
          onConfirmar={handleApelidoConfirmar}
          onCancelar={() => {
            setPopupAnimar(false);
            setTimeout(() => {
              setShowPopup(false);
              setApelido("");
              setErroApelido(false);
            }, 200);
          }}
          erro={erroApelido}
        />
      )}
    </PageWrapper>
  );
}
