import { useEffect, useState } from "react";
import bgImage from "../assets/bg.svg";
import BtnVoltar from "./BtnVoltar";
import BtnUser from   "./BtnUser";
import { useUser } from "../context/UseContext";

export default function PageWrapper({ children }) {
  const [show, setShow] = useState(false);
    const { user } = useUser();


  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="min-h-screen px-4 py-8 text-white flex items-center justify-center font-pdr"
    >
        <BtnVoltar/>
        {user && <BtnUser/>}
      <div
        className={`
          transition-all duration-500 ease-in-out transform
          ${show ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}
