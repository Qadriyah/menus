export type SubMenuItemType = {
  id: number;
  title: string;
  icon: React.ReactElement;
  link: string;
};

export type MenuItemType = {
  id: number;
  title: string;
  icon: React.ReactElement;
  link: string;
  submenus: SubMenuItemType[];
};

export type ParentItemType = {
  id: number;
  name: string;
  children: string[];
};

export type TreeItemType = {
  id: number;
  depth: number;
  name: string;
  parent: number | null;
  children?: TreeItemType[];
};
