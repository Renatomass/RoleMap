import { useUser } from "../context/UseContext";
import { useNavigate } from "react-router-dom";
export default function BtnUser(){
    const navigate = useNavigate();
    const { user } = useUser();

    const nome = user?.apelido || user?.email?.split("@")[0] || "convidado";
    const nomeUser = nome.charAt(0).toUpperCase() + nome.slice(1);

    return (
        <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
            <button onClick={() => navigate(-1)} 
                className="text-white text-xl font-bold cursor-pointer "> ⬅ </button>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <span className="text-lg font-bold">
                            {nomeUser}</span>
        </div>
    );
}