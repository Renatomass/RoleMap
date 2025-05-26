export default function CategoriaItem({ icon, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex md:flex-col-1 items-center justify-center w-20 h-20 md:w-50 md:h-50 rounded-2xl transition-all shadow-md cursor-pointer 
        ${selected ? "border-4 bg-white border-teal-300 scale-110" : "bg-white"}`}>
      <img
        src={icon}
        alt="categoria"
        className={`w-10 h-30 md:w-30  md:h-30 object-contain ${selected ? "opacity-100" : "opacity-70"}`}/></button>
  );
}
