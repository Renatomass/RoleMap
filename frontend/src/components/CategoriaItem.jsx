export default function CategoriaItem({ icon, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-none flex flex-col items-center justify-center w-[140px] h-[140px] sm:w-48 sm:h-48 rounded-2xl transition-all shadow-md cursor-pointer 
        ${selected ? "border-4 bg-white border-teal-300 scale-110" : "bg-white"}`}
    >
      <img
        src={icon}
        alt="categoria"
        className={`w-20 h-20 object-contain ${selected ? "opacity-100" : "opacity-70"}`}
      />
    </button>
  );
}
