import { Link } from "react-router-dom";
import { useState } from "react";
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

export default function Home() {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [apelido, setApelido] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupAnimar, setPopupAnimar] = useState(false);
  const [erroApelido, setErroApelido] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && senha) {
      setUser({ email });
      navigate("/UserSala");
    }
  };

  const handleApelidoConfirmar = () => {
    if (apelido.trim()) {
      setUser ((prev) => ({...prev, apelido, }));
      navigate("/sala/convidado");
    } else {
      setErroApelido(true);
      setTimeout (() => setErroApelido(false), 500);
    }
  };

  return (
    <PageWrapper>
      <LogoMarca/> 
        <WhiteContainer>
          <InputLogin 
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"      
          />
          <InputLogin 
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"      
          />
            <BtnEntrar onClick={handleLogin} />
              <p className="text-black font-medium text-xs text-center mt-1">OU</p>
            <Link to="/Cadastro"><BtnCadastreSe/></Link>
            <BtnEntrarCodigo onClick={() => {setShowPopup(true); setPopupAnimar(true);}}/>
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
                  setErroApelido(false);}, 200);
              }} erro={erroApelido}/>
        )}
    </PageWrapper>
  );
}
