"use client";
import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {!!label && (
        <label htmlFor={props.id} className="text-gray-500 ml-2">
          {label}
        </label>
      )}
      <div
        className={`bg-[#F9FAFB] rounded-2xl w-full h-[52px] p-2 ${
          !!error ? "border-red-500 border" : "border-gray-400"
        }`}
      >
        <input
          {...props}
          className="border-none outline-none h-full w-full bg-[#F9FAFB] px-3"
        />
      </div>
      {!!error && (
        <p
          data-testid={`${props.id}-error`}
          className="text-red-500 ml-2 text-[16px]"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
