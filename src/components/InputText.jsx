export default function InputText({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col w-full sm:w-[520px]">
      {label && <label className="text-white w-full text-start text-base pl-4 font-semibold mb-2">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex text-start pl-5 items-center p-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none"
      />
    </div>
  );
}
