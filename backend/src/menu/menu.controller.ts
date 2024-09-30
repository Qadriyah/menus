import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  CreateMenuDto,
  CreateMenuResponseDto,
  GetMenuResponseDto,
  GetMenusResponseDto,
} from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  CreateMenuValidationPipe,
  UpdateMenuValidationPipe,
} from './menu.pipe';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(
    @Body(CreateMenuValidationPipe) createMenuDto: CreateMenuDto,
  ): Promise<CreateMenuResponseDto> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll(): Promise<GetMenusResponseDto> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetMenuResponseDto> {
    return this.menuService.findOne({
      id: Number(id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(UpdateMenuValidationPipe) updateMenuDto: UpdateMenuDto,
  ): Promise<CreateMenuResponseDto> {
    return this.menuService.update({
      where: { id: Number(id) },
      data: updateMenuDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CreateMenuResponseDto> {
    return this.menuService.remove({ id: Number(id) });
  }
}
