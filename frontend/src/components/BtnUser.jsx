import { useUser } from "../context/UseContext";
import BtnVoltar from "./BtnVoltar";
export default function BtnUser(){
    const { user } = useUser();

    const nome = user?.apelido || user?.email?.split("@")[0] || " ";
    const nomeUser = nome.charAt(0).toUpperCase() + nome.slice(1);

    return (
        <>
        <BtnVoltar/>
        <div className="absolute top-5 left-20 flex items-center gap-2 z-10">
                    <div className="flex w-12 h-12 bg-gray-200 rounded-full justify-center items-center text-3xl drop-shadow-black">💀</div>
                        <span className="text-lg font-bold">
                            {nomeUser}</span>
        </div>
        </>
    );
}