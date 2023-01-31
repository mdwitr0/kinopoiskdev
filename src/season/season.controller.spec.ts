import { Test, TestingModule } from '@nestjs/testing';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';

describe('SeasonController', () => {
  let controller: SeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonController],
      providers: [SeasonService],
    }).compile();

    controller = module.get<SeasonController>(SeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
