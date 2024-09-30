import { TreeItemType } from "./entities";

export type FieldError = {
  field: string;
  message: string;
};

export type Context = {
  params: {
    menuId: string;
  };
};

export class CreateMenuResponseDto {
  message?: string;
  error?: string;
  errors?: FieldError[];
  menu?: TreeItemType;
}

export class GetMenusResponseDto {
  error?: string;
  menus?: TreeItemType[];
}

export class GetMenuResponseDto {
  error?: string;
  menu?: TreeItemType;
}
