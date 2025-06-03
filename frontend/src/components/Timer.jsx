import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Timer({ tempoInicial = 30, onAlerta }) {
  const [tempo, setTempo] = useState(tempoInicial);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((prev) => {
        if (prev === 11) {
          onAlerta?.(); 
        }

        if (prev <= 1) {
          clearInterval(intervalo);
          navigate("/final?resultado=true"); 
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [navigate, onAlerta]);

  return (
    <div className="flex flex-row relative justify-end ">
      <div className="items-center z-50 bg-[#3f257c6c] rounded-full w-14 h-14 flex justify-center text-xl font-bold ring-4 ring-blue-600 text-white">
        {tempo}
      </div>
    </div>
  );
}
