import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LogoMarca from "../components/LogoMarca";
import BtnCriarRole from "../components/BtnCriarRole";
import BtnConvidado from "../components/BtnConvidado";

export default function UserSala() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center" >
        <LogoMarca className="flex flex-col mb-10" />
        <Link to="/TipoRole">
          <BtnCriarRole/>
        </Link>
        <Link to="/sala/convidado">
          <BtnConvidado />
        </Link>
      </div>
    </PageWrapper>
  );
}
