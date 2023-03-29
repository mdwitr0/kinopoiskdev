import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';

@Injectable()
export class MeiliSearchService {
  private client: MeiliSearch;
  private index: Index;

  constructor(private readonly host: string, private readonly apiKey: string) {
    this.client = new MeiliSearch({
      host: host,
      apiKey: apiKey,
    });
  }

  async initIndex(indexName: string): Promise<void> {
    try {
      this.index = await this.client.getIndex(indexName);
    } catch (error) {
      const task = await this.client.createIndex(indexName, {
        primaryKey: 'id',
      });
      const { status } = await this.client.getTask(task.taskUid);

      if (status === 'failed') throw new Error('Index creation failed');

      this.index = await this.client.getIndex(indexName);
    }
  }

  async findById<Entity>(id: string): Promise<Entity> {
    return this.index.getDocument<Entity>(id);
  }

  async save<Entity>(data: Entity): Promise<void> {
    await this.index.addDocuments([data]);
  }

  async saveMany<Entity>(titles: Entity[]): Promise<void> {
    await this.index.addDocuments(titles);
  }
}
