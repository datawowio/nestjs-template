import { DataSource, EntityMetadata } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';

export class TestUtils {
  _dataSource: DataSource;

  constructor(dataSoruce: DataSource) {
    this._dataSource = dataSoruce;
  }

  static setup() {
    initializeTransactionalContext();
  }

  async getEntities(): Promise<EntityMetadata[]> {
    return await this._dataSource.entityMetadatas;
  }

  async reloadFixtures() {
    try {
      const entities = await this.getEntities();
      await this.cleanAll(entities);
    } catch (err) {
      throw err;
    }
  }

  async cleanAll(entities: EntityMetadata[]) {
    try {
      for (const entity of entities) {
        try {
          const repository = await this._dataSource.getRepository(entity.name);
          await repository.query(
            `truncate  table  ${entity.tableName} CASCADE`,
          );
        } catch (err) {
          console.log('*****************************');
          console.log(err);
          console.log('*****************************');
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }
}
