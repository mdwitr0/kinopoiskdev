import { Test, TestingModule } from '@nestjs/testing';
import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let service: SeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonService],
    }).compile();

    service = module.get<SeasonService>(SeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
