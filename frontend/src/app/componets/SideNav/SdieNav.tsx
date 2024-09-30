"use client";
import React from "react";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { FaRegFolder } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeDrawer, openDrawer, toggleDrawer } from "@/lib/features/drawer";

const MENU_ITEMS = [
  {
    id: 1,
    title: "Systems",
    icon: <FaRegFolder />,
    link: "/systems",
    submenus: [
      {
        id: 1,
        title: "System Code",
        icon: <RxDashboard />,
        link: "/systems/system-code",
      },
      {
        id: 2,
        title: "Properties",
        icon: <RxDashboard />,
        link: "/systems/properties",
      },
      {
        id: 3,
        title: "Menus",
        icon: <RxDashboard />,
        link: "/systems/menus",
      },
      {
        id: 4,
        title: "APIList",
        icon: <RxDashboard />,
        link: "/systems/api-list",
      },
    ],
  },
  {
    id: 2,
    title: "Users & Groups",
    icon: <FaRegFolder />,
    link: "/users",
    submenus: [
      {
        id: 1,
        title: "Users",
        icon: <RxDashboard />,
        link: "/users/users",
      },
      {
        id: 1,
        title: "Groups",
        icon: <RxDashboard />,
        link: "/users/groups",
      },
    ],
  },
  {
    id: 3,
    title: "Competition",
    icon: <FaRegFolder />,
    link: "/competition",
    submenus: [
      {
        id: 1,
        title: "Compettitors",
        icon: <RxDashboard />,
        link: "/competition/competitors",
      },
      {
        id: 1,
        title: "Analysis",
        icon: <RxDashboard />,
        link: "/competition/analysis",
      },
    ],
  },
];

const SdieNav = () => {
  const dispatch = useAppDispatch();
  const drawer = useAppSelector((state) => state.drawer);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        dispatch(closeDrawer());
      } else {
        dispatch(openDrawer());
      }
    });
    return () => window.removeEventListener("resize", () => {});
  }, [dispatch]);

  return (
    <nav
      className={`h-[97vh] md:h-full bg-[#101828] text-[#667085] overflow-y-scroll rounded-3xl duration-300 fixed md:static ${
        drawer.open ? "w-[18rem]" : "w-0 md:w-[5rem]"
      }`}
    >
      <div
        className={`h-[84px] flex items-center mx-10 ${
          drawer.open ? "justify-between" : "justify-center"
        }`}
      >
        <div className={`duration-300 ${!drawer.open && "scale-0"}`}>
          <Image src="/images/logo.png" width={70} height={21} alt="logo" />
        </div>
        <div
          onClick={() => dispatch(toggleDrawer())}
          className="cursor-pointer flex-shrink-0"
        >
          <Image
            src="/images/arrow-left.png"
            width={18}
            height={12}
            alt="arrow-left"
            className={`duration-500 ${!drawer.open && "-rotate-180"}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 m-4">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.id} menuItem={item} />
        ))}
      </div>
    </nav>
  );
};

export default SdieNav;
