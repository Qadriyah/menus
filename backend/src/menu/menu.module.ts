import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'src/prisma.service';
import { UtilsService } from 'src/utils.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService, UtilsService],
})
export class MenuModule {}
