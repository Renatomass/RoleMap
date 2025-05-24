// DemoPage.tsx
import { useEffect, useState } from "react";

const DemoPage = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      {step === 0 && <h1 className="text-3xl">“E se escolher o rolê não fosse um problema?”</h1>}
      {step === 1 && <h1 className="text-3xl">🎯 Crie uma sala e convide os amigos</h1>}
      {step === 2 && <h1 className="text-3xl">👥 Preferências definidas, tudo pronto</h1>}
      {step === 3 && <h1 className="text-3xl">🧠 Algoritmo sugeriu um lugar</h1>}
      {step === 4 && <h1 className="text-3xl">🗳️ Votação em tempo real...</h1>}
      {step === 5 && <h1 className="text-3xl text-green-400">🏁 Decisão tomada. Partiu!</h1>}
      {step === 6 && (
        <button
          onClick={() => setStep(0)}
          className="mt-6 px-4 py-2 bg-white text-black rounded-xl"
        >
          Ver de novo
        </button>
      )}
    </div>
  );
};

export default DemoPage;
