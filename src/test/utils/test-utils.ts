import { DataSource, EntityMetadata } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import config from '@infra/configuration/config';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { UseCaseModule } from '@application/module/usecase/usecase.module';

export class TestUtils {
  _dataSource: DataSource;

  constructor(dataSoruce: DataSource) {
    this._dataSource = dataSoruce;
  }

  static setup() {
    initializeTransactionalContext();
  }

  static createTestModuleUtil(
    moduleMetadata?: ModuleMetadata,
  ): TestingModuleBuilder {
    return Test.createTestingModule({
      imports: [
        // predefine essential module testing need
        TypeOrmPersistenceModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        UseCaseModule,
        ...(moduleMetadata?.imports || []),
      ],
      controllers: [...(moduleMetadata?.controllers || [])],
      providers: [...(moduleMetadata?.providers || [])],
      exports: [...(moduleMetadata?.exports || [])],
    });
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
