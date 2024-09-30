import React from "react";
import { SubMenuItemType } from "@/types/entities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

type IProps = {
  submenu: SubMenuItemType;
};

const SubmenuItem: React.FC<IProps> = ({ submenu }) => {
  const pathname = usePathname();
  const drawer = useAppSelector((state) => state.drawer);

  return (
    <Link
      href={submenu.link}
      className={`cursor-pointer px-3 py-[12px] hover:bg-[#9FF443] hover:font-bold hover:rounded-2xl hover:text-black ${
        pathname?.substring(pathname?.lastIndexOf("/")) ===
        submenu.link.substring(submenu.link.lastIndexOf("/"))
          ? "text-black bg-[#9FF443] rounded-2xl font-bold"
          : ""
      }`}
    >
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0 w-[26px] h-[26px]">{submenu.icon}</div>
        <p className={`duration-300 ${!drawer.open && "scale-0"}`}>
          {submenu.title}
        </p>
      </div>
    </Link>
  );
};

export default SubmenuItem;
