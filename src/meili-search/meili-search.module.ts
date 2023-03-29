import { DynamicModule, Global, Module } from '@nestjs/common';
import { MeiliSearchService } from './meili-search.service';
import { MeiliSearchModuleOptions } from './meili-search-module-options.interface';

@Global()
@Module({})
export class MeiliSearchModule {
  static forRoot(options: MeiliSearchModuleOptions): DynamicModule {
    return {
      module: MeiliSearchModule,
      providers: [
        {
          provide: MeiliSearchService,
          useFactory: () => {
            return new MeiliSearchService(options.host, options.apiKey);
          },
        },
      ],
      exports: [MeiliSearchService],
    };
  }

  static forFeature(indexName: string): DynamicModule {
    return {
      module: MeiliSearchModule,
      providers: [
        {
          provide: MeiliSearchService,
          useFactory: (meiliSearchService: MeiliSearchService) => {
            meiliSearchService.initIndex(indexName).then();
            return meiliSearchService;
          },
          inject: [MeiliSearchService],
        },
      ],
      exports: [MeiliSearchService],
    };
  }
}
