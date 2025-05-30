export default function CategoriaItem({ icon, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-64 h-64 mt-4 mb-6 sm:w-48 sm:h-48 rounded-2xl transition-all shadow-md cursor-pointer
        ${selected ? "border-4 bg-white border-teal-300 scale-110" : "bg-white"}`}>
      <img
        src={icon}
        alt="categoria"
        className={`w-42 h-42 sm:w-28 sm:h-28 object-cover ${selected ? "opacity-100" : "opacity-70"}`}
      />
    </button>
  );
}
