export default function SliderFiltro({ label, icon, min = 0, max = 50, step = 1, value, onChange }) {
  
  const renderIconLabel = () => {
    const val = Number(value);
    if (label === "Classificação") {
      return "⭐".repeat(val);
    } else if (label === "Preço") {
      return "$".repeat(val + 1); // 
    } else if (label === "Distância") {
      return `${val} km`;
    }
    return icon;
  };
  
  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-xs bg-white p-4 rounded-xl text-purple-700">
      <div className="flex items-center justify-between w-full text-sm font-semibold">
        <span>{label}</span>
        <span className="text-right text-yellow-400 font-bold">{renderIconLabel()}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full accent-purple-500 border-0 cursor-grabbing"
      />
    </div>
  );
}
