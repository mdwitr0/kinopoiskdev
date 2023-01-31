import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  create(createSeasonDto: CreateSeasonDto) {
    return 'This action adds a new season';
  }

  findAll() {
    return `This action returns all season`;
  }

  findOne(id: number) {
    return `This action returns a #${id} season`;
  }

  update(id: number, updateSeasonDto: UpdateSeasonDto) {
    return `This action updates a #${id} season`;
  }

  remove(id: number) {
    return `This action removes a #${id} season`;
  }
}
