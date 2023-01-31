import React from "react";

const FormField = ({
  handleChange,
  label,
  name,
  type,
  placeholder,
  value,
  isSuprisedMe,
  handleSuprisedMe,
}) => {
  return (
    <div>
      <div className="flex gap-2 mb-2 items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}{" "}
        </label>
        {isSuprisedMe && (
          <button
            type="button"
            onClick={handleSuprisedMe}
            className="bg-[#ECECF1] text-black text-xs font-semibold px-2 py-1 rounded-[5px] "
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
        border-gray-300
        text-gray-900
        rounded-lg
        focus:ring-[#4649ff]
        focus:border-[#4649ff]
        outline:none
        w-full
        p-3
        block
        mt-4
        bg-gray-50"
        required
      />
    </div>
  );
};

export default FormField;
