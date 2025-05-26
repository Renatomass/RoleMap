export default function InputLogin ({label, type = "text", value, onChange, placeholder}) {

    return(
        <div className="mb-4">
            <label className="block text-base font-extrabold -mt-2.5 mb-1 text-black z-1">
                {label}
            </label>
            <input
                className="w-full p-3 rounded-2xl bg-purple-100 text-purple-700 text-sm font-pdr focus:outline-0"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}