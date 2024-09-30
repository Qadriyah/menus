"use client";
import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { openDrawer } from "@/lib/features/drawer";

const MobileNav = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="flex-shrink-0 md:hidden cursor-pointer mt-5"
      onClick={() => dispatch(openDrawer())}
    >
      <Image src="/images/menu.png" width={36} height={36} alt="icon" />
    </div>
  );
};

export default MobileNav;
