export default function BtnEntrarCodigo({onClick}) {
  return (
    <button onClick={onClick} className="w-full p-2 bg-btn-yellow hover:bg-yellow-500 text-white font-bold mt-3 rounded-2xl text-lg cursor-pointer transition-all"
    type="button">Entrar com código</button>
  );
}