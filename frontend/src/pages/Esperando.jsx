import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Esperando() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/resultado');
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#5d2c91]">
      <div className="bg-[#402263] rounded-2xl px-10 py-16 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/LOGO.svg"
            alt="Ícone de localização"
            className="w-16 h-16"
          />
        </div>
        <p className="text-white text-xl font-semibold mb-6">
          Buscando o rolê perfeito...
        </p>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
