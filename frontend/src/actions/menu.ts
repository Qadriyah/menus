import { CreateMenuType } from "@/types/requests";

export const createMenu = async <T>(
  path: string,
  data: CreateMenuType
): Promise<T> => {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
};

export const getMenus = async <T>(path: string): Promise<T> => {
  const res = await fetch(path, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await res.json();
  return resData;
};

export const deleteMenu = async <T>(path: string): Promise<T> => {
  const res = await fetch(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await res.json();
  return resData;
};

export const updateMenu = async <T>(
  path: string,
  data: CreateMenuType
): Promise<T> => {
  const res = await fetch(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
};
