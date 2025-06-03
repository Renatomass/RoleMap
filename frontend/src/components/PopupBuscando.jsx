import logo from "../assets/LOGO.svg";

export default function PopupBuscando({ mostrar }) {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#2c1257] p-10 rounded-3xl shadow-lg flex flex-col items-center gap-6 animate-fade-in">
        <img src={logo} alt="Logo App" className="w-20 h-20" />
        <p className="text-white text-xl font-bold animate-pulse">Buscando o rolê perfeito...</p>
      </div>
    </div>
  );
}
