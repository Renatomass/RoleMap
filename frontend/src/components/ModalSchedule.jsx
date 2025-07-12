import { useState } from "react";
import { api } from "../services/api";
import { useUser } from "../context/UseContext";

export default function ModalSchedule({ place, onClose }) {
  const { user } = useUser();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const mapsLink = place?.nome
    ? `https://www.google.com/maps/search/${encodeURIComponent(place.nome)}`
    : "";

  const handleSend = async () => {
    try {
      await api.post("/sala/enviar-email", {
        email: user?.email,
        placeName: place?.nome,
        mapsLink,
        date,
        time,
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCalendar = () => {
    if (!date || !time) return;
    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const format = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const baseUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      place?.nome || "Role"
    )}&dates=${format(start)}/${format(end)}&location=${encodeURIComponent(
      mapsLink
    )}`;
    const description = ""; // Optional description
    const url = description
      ? `${baseUrl}&details=${encodeURIComponent(description)}`
      : baseUrl;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#2c125744] bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-fade-up"
      >
        <h2 className="text-xl font-bold text-purple-700 mb-4">Marcar Rolê</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-purple-300 rounded-xl px-4 py-2 mb-3 text-gray-700 cursor-pointer"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-purple-300 rounded-xl px-4 py-2 mb-4 text-gray-700 cursor-pointer"
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
          >
            Enviar e-mail
          </button>
          <button
            onClick={handleCalendar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition"
          >
            Adicionar ao calendário
          </button>
        </div>
      </div>
    </div>
  );
}
