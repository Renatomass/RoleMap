export default function InputSenha() {
  return (
    <>
      <label className="block text-base font-extrabold mt-3 mb-2 text-black">
        Senha
      </label>
      <input
        className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-xs font-medium flex"
        type="password"
        placeholder="Senha"
      />
    </>
  );
}
