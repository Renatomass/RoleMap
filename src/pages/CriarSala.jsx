export default function CriarSala() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-500 text-white text-2xl">
      <Link to="/src/routes/AppRoutes.jsx">
          <button
            className="w-full p-2 bg-teal-300 hover:bg-teal-400 text-white font-[Poppins] font-bold mt-3 rounded-2xl text-lg cursor-pointer"
            type="button"
          >
            Entrar
          </button>
        </Link>
    </div>
  );
}
