export default function InputEmail() {
  return (
        <>
        <label className="block text-base font-extrabold mt-1 mb-2 text-black z-1">
            Email
          </label>
        <input
        className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-xs font-pdr"
        type="email"
         placeholder="Email"
        />
        </>
  );
}
