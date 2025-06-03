import { useState } from "react";

export default function MsgInput() {
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    if (e.target.value.length <= 15) {
      setMensagem(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-bold pl-4 text-white mb-1 block">Sua opinião (máx. 15 caracteres):</label>
      <input
        type="text"
        value={mensagem}
        onChange={handleChange}
        placeholder="Ex: partiu!"
        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none"
      />
      <p className="text-xs text-white/70 mt-1 text-right">{mensagem.length}/15</p>
    </div>
  );
}
