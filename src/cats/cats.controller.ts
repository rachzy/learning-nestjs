import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { ZodValidationPipe } from './pipes/zodvalidation.pipe';
import { createCatSchema } from './pipes/cat.pipe';
import { RolesGuard } from './guards/roles.guard';

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post('add')
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async addCat(@Body() cat: Cat): Promise<Cat> {
    this.catsService.create(cat);
    return this.catsService.fidOne(cat.id);
  }

  @Get('get')
  async getCat(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ): Promise<Cat> {
    return this.catsService.fidOne(id);
  }

  @Get('getAll')
  async getAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
