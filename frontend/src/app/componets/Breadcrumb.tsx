import React from "react";
import Image from "next/image";

type IProps = {
  icon: string;
  routes: string[];
};

const Breadcrumb: React.FC<IProps> = ({ icon, routes }) => {
  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0">
        <Image src={icon} width={24} height={24} alt="icon" />
      </div>
      {routes.map((route) => (
        <div key={route} className="flex gap-2">
          <p>/</p>
          <p key={route}>{route}</p>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
