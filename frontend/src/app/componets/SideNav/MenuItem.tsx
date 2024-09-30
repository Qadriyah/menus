import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SubmenuItem from "./SubmenuItem";
import { MenuItemType } from "@/types/entities";
import { useAppSelector } from "@/lib/hooks";

type IProps = {
  menuItem: MenuItemType;
};

const MenuItem: React.FC<IProps> = ({ menuItem }) => {
  const pathname = usePathname();
  const drawer = useAppSelector((state) => state.drawer);

  return (
    <div
      className={`rounded-2xl py-5 hover:bg-[#1D2939] ${
        pathname?.includes(menuItem.link) ? "bg-[#1D2939]" : ""
      }`}
    >
      <Link
        href={menuItem.link}
        className={`flex items-center gap-5 cursor-pointer px-3 hover:text-white menu-item ${
          pathname?.includes(menuItem.link) ? "text-white" : ""
        }`}
      >
        <div className="flex-shrink-0 w-[26px] h-[26px]">{menuItem.icon}</div>
        <p className={`duration-300 ${!drawer.open && "scale-0"}`}>
          {menuItem.title}
        </p>
      </Link>
      {menuItem.submenus.length > 0 && pathname?.includes(menuItem.link) ? (
        <div className="flex flex-col gap-2 mt-5 duration-300">
          {menuItem.submenus.map((submenu) => (
            <SubmenuItem key={submenu.id} submenu={submenu} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MenuItem;
