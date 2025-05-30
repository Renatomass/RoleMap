export default function Feedback({ nome, msg }) {
  const letra = nome?.[0]?.toUpperCase() || "A";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-12 bg-[#f6e2fddd] text-purple-800 font-bold text-lg flex items-center justify-center rounded-full shadow-md">
        <p className="absolute left-8 bottom-8">💭</p>
        {letra}  
      </div>
      <p className="text-white text-sm mt-1 italic">{msg}</p>
    </div>
  );
}
