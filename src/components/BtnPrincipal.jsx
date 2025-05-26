// src/components/BotaoPrincipal.jsx
export default function BtnPrincipal({ children, onClick, Stylo = "", full = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        ${Stylo}
        ${full ? "w-full" : "w-fit"}
        text-white font-bold py-3 px-6 rounded-2xl cursor-pointer
        hover:opacity-90 transition-all text-lg shadow-md
      `}
    >
      {children}
    </button>
  );
}
