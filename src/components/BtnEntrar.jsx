export default function BtnEntrar({onClick}) {
  return (
    <button 
    onClick={onClick}
    className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-bold mt-2 rounded-2xl text-lg cursor-pointer"
      type="button">Entrar</button>
  );
}
