"use client";
import React, { SelectHTMLAttributes } from "react";

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

const SelectInput: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {!!label && (
        <label htmlFor={props.id} className="text-gray-500 ml-2">
          {label}
        </label>
      )}
      <div
        className={`bg-[#F9FAFB] rounded-2xl w-full h-[52px] px-5 ${
          !!error ? "border-red-500 border" : "border-gray-400"
        }`}
      >
        <select
          {...props}
          className="border-none outline-none h-full w-full bg-[#F9FAFB]"
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

export default SelectInput;
