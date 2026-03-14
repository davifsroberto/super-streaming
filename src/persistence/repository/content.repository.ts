import { Inject, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { DefaultTypeOrmRepository } from '@src/infra/module/typeorm/repository/default-typeorm.repository';
import { Content } from '@src/persistence/entity/content.entity';

@Injectable()
export class ContentRepository extends DefaultTypeOrmRepository<Content> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(Content, dataSource);
  }
}
