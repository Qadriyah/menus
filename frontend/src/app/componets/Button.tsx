import React, { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

export type BtnThemeType = "primary" | "dark" | "clear" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: BtnThemeType;
  loading?: boolean;
};

export const buttonColors: Record<string, string> = {
  primary: "bg-[#253BFF] text-white",
  dark: "bg-[#1D2939] text-white",
  clear: "bg-white text-black",
  danger: "bg-red-600 text-white",
};

const Button: React.FC<ButtonProps> = ({
  theme = "clear",
  loading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`rounded-[48px] flex justify-center items-center py-[12px] px-[24px] border border-[#D0D5DD] font-bold w-full ${buttonColors[theme]}`}
    >
      <div className="flex gap-2">
        {loading ? <Loader /> : null}
        {children}
      </div>
    </button>
  );
};

export default Button;
