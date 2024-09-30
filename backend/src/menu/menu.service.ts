import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

import {
  CreateMenuResponseDto,
  GetMenuResponseDto,
  GetMenusResponseDto,
} from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createMenuDto: Prisma.MenuCreateInput,
  ): Promise<CreateMenuResponseDto> {
    try {
      const menu = await this.prismaService.menu.create({
        data: createMenuDto,
      });

      return {
        menu,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  async findAll(): Promise<GetMenusResponseDto> {
    try {
      const menus = await this.prismaService.menu.findMany();

      return {
        menus,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  async findOne(id: Prisma.MenuWhereUniqueInput): Promise<GetMenuResponseDto> {
    try {
      const menu = await this.prismaService.menu.findUnique({
        where: id,
      });

      return {
        menu,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  async update(params: {
    where: Prisma.MenuWhereUniqueInput;
    data: Prisma.MenuUpdateInput;
  }): Promise<CreateMenuResponseDto> {
    try {
      const { data, where } = params;
      const menu = await this.prismaService.menu.update({
        where,
        data,
      });

      return {
        menu,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  async remove(
    where: Prisma.MenuWhereUniqueInput,
  ): Promise<CreateMenuResponseDto> {
    try {
      const menu = await this.prismaService.menu.delete({
        where,
      });

      return {
        menu,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
}
