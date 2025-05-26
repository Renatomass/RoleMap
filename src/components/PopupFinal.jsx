export default function PopupFinal() {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-xl animate-bounce">
        <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Rolê confirmado!</h2>
        <p className="text-gray-700">Partiu aproveitar com a galera! 🕺</p>
      </div>
    </div>
  );
}
