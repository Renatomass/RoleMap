import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function BtnAcessCode(){
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate();
    
    const handleEntrar = () => {
        if (codigo) navigate(`/sala/:${codigo}`);
    };
    return (
        <div className="flex flex-col gap-4">
            <input 
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Digite o código"
                className=""/>
            <button
                className="bg-teal-400 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
                onClick={handleEntrar}>
                Entrar com Código
            </button>
        </div>

    );
}