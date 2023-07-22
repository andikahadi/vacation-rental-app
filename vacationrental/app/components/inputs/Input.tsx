import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  priceMode?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  priceMode,
  required,
  register,
  errors,
}) => {
  return (
    <div
      className="
        w-full 
        relative
      "
    >
      {priceMode && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-3
          pt-6
          font-light
          border-[1px]
          transition
          rounded-sm
          outline-none
          disabled:opacity-60
          disabled:cursor-not-allowed
          ${priceMode ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-orange-600" : "border-neutral-300"}
          ${errors[id] ? "focus:border-orange-600" : "focus:border-black"}
          ${errors[id] ? "bg-rose-50" : "bg-white"}
        `}
      />
      <label
        className={`
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-4
          top-5
          z-10
          origin-[0]
          ${priceMode ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-5
          pb-2
          
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
