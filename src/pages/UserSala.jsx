import { Link } from "react-router-dom";
import PageWrapper from '../components/PageWrapper';
import LogoMarca from '../components/LogoMarca';
import BtnUser from '../components/BtnUser';
import BtnCriarRole from '../components/BtnCriarRole';
import BtnConvidado from '../components/BtnConvidado';

export default function UserSala () {
  return (
    <PageWrapper>
        <BtnUser/>
          <div className="z-10 text-center mb-10"><LogoMarca/></div>
        <Link to= "/TipoRole"><BtnCriarRole/></Link>
        <Link to="/sala/convidado"><BtnConvidado/></Link>
    </PageWrapper>
  );
}
