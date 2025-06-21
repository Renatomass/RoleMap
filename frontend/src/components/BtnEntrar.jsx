export default function BtnEntrar({type = "button"}) {
  return (
    <button 
    type={type}
    className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-bold mt-1 rounded-2xl text-lg cursor-pointer"
    >Entrar</button>
  );
}
