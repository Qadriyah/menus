import React, { ButtonHTMLAttributes } from "react";
import { BtnThemeType, buttonColors } from "../Button";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  theme: BtnThemeType;
};

const SmallButton: React.FC<IProps> = ({ icon, theme, ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-full text-white flex justify-center items-center w-[30px] h-[30px] ${buttonColors[theme]}`}
    >
      {icon}
    </button>
  );
};

export default SmallButton;
