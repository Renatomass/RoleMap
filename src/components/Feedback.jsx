export default function Feedback({ nome, msg }) {
  const letra = nome?.[0]?.toUpperCase() || "A";

  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-white text-purple-800 font-bold text-lg flex items-center justify-center rounded-full shadow-md">
        {letra}
      </div>
      <p className="text-white text-xs mt-1">{nome}</p>
      <p className="text-white text-sm mt-1 italic">“{msg}”</p>
    </div>
  );
}
