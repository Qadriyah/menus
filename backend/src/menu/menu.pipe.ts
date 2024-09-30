import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UtilsService } from 'src/utils.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import {
  CreateMenuValidationSchema,
  UpdateMenuValidationSchema,
} from './menu.validation.schema';

@Injectable()
export class CreateMenuValidationPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(data: CreateMenuDto) {
    const { error, value } = CreateMenuValidationSchema.validate(data);
    if (error) {
      const errors = this.utilsService.formatError(error);
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors,
      });
    }
    return value;
  }
}

@Injectable()
export class UpdateMenuValidationPipe implements PipeTransform {
  constructor(private utilsService: UtilsService) {}

  transform(data: CreateMenuDto) {
    const { error, value } = UpdateMenuValidationSchema.validate(data);
    if (error) {
      const errors = this.utilsService.formatError(error);
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors,
      });
    }
    return value;
  }
}
