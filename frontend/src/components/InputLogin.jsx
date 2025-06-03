import { useState } from "react";

export default function InputLogin({ label, name, type = "text", value, onChange, required }) {
  const [isFocused, setIsFocused] = useState(false);
  const showFloatingLabel = isFocused || value.length > 0;

  return (
    <div className="relative mb-4 ">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        className="w-full pt-5 pb-2 px-4 rounded-2xl bg-purple-100 text-purple-700 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-transparent"
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 ease-in-out text-purple-700 font-semibold
          ${showFloatingLabel ? "top-2 text-xs" : "top-4 text-sm"}`}
      >
        {label}
      </label>
    </div>
  );
}

