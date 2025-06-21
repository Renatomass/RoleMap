import { useNavigate } from "react-router-dom";
export default function BtnVoltar(){
    const navigate = useNavigate();


    return (
        <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
            <button onClick={() => navigate(-1)} 
                className="text-white text-4xl font-bold cursor-pointer ">⬅️</button>
        </div>
    );
}