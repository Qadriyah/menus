import { Menu } from '@prisma/client';

export class CreateMenuDto {
  name: string;
  depth: number;
  parent: number | null;
}

export class CreateMenuResponseDto {
  message?: string;
  error?: string;
  menu?: Menu;
}

export class GetMenusResponseDto {
  error?: string;
  menus?: Menu[];
}

export class GetMenuResponseDto {
  error?: string;
  menu?: Menu;
}
