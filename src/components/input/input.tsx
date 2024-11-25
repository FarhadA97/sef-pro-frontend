import React, { ReactNode, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  leftIcon,
  rightIcon,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 ${className}`}
    >
      {leftIcon && (
        <div className="mr-2 text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent text-gray-700"
        {...props}
      />
      {rightIcon && (
        <div className="ml-2 text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
};
