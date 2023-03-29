import { Injectable } from '@nestjs/common';
import { Index, MeiliSearch } from 'meilisearch';
import { InjectMeiliSearch } from 'nestjs-meilisearch';

@Injectable()
export class MeiliService {
  constructor(@InjectMeiliSearch() private readonly client: MeiliSearch) {}

  async initIndex(indexName: string): Promise<Index> {
    try {
      return await this.client.getIndex(indexName);
    } catch (error) {
      const task = await this.client.createIndex(indexName, {
        primaryKey: 'id',
      });
      const { status } = await this.client.getTask(task.taskUid);

      if (status === 'failed') throw new Error('Index creation failed');

      return await this.client.getIndex(indexName);
    }
  }

  async findById<Entity>(id: string, indexName: string): Promise<Entity> {
    const index = await this.initIndex(indexName);
    return index.getDocument<Entity>(id);
  }

  async save<Entity>(data: Entity, indexName: string): Promise<void> {
    const index = await this.initIndex(indexName);

    await index.addDocuments([data]);
  }

  async saveMany<Entity>(items: Entity[], indexName: string): Promise<void> {
    const index = await this.initIndex(indexName);

    await index.addDocuments(items);
  }
}
