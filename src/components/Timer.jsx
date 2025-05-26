export default function Timer({ tempo = "00:30" }) {
  return (
    <div className="flex relative  justify-center items-center w-full gap-2.5 -mt-6 mb-8 text-white">
      <h1 className="text-2xl font-bold tracking-tight">Tempo para votar:</h1>
      <span className="text-3xl font-extrabold bg-white text-purple-700 px-6 py-2 rounded-2xl shadow-md">
        {tempo}
      </span>
    </div>
  );
}
