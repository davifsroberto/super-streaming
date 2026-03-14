import { Column, Entity } from 'typeorm';

import { DefaultEntity } from '@src/infra/module/typeorm/entity/default.entity';

@Entity({ name: 'Thumbnail' })
export class Thumbnail extends DefaultEntity<Thumbnail> {
  @Column()
  url: string;
}
