import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1773574695329 implements MigrationInterface {
  name = 'Migration1773574695329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "FK_b6ac53aff4b7200e4b01ca43a9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "FK_e4e17f7e4fbf10e4bcd61aa8e59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_bc417590af57a49dc42ce4ba038"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "FK_46efd1060cb7a7c545b06120d14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "FK_ce049b6bf5d3e5aee0f3dbd8dc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "FK_a20dc7d8915f1caf6079301b10e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "FK_c155b5944bdd1e260a4ae79bc82"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_b6ac53aff4b7200e4b01ca43a9c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_e4e17f7e4fbf10e4bcd61aa8e59"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_6c57a6d8be1b8001ee31093ee99"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."REL_46efd1060cb7a7c545b06120d1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_ce049b6bf5d3e5aee0f3dbd8dc0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."REL_c155b5944bdd1e260a4ae79bc8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_a20dc7d8915f1caf6079301b10e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD "externalRating" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "Thumbnail" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Thumbnail" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "UQ_b6ac53aff4b7200e4b01ca43a9c" UNIQUE ("contentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "UQ_e4e17f7e4fbf10e4bcd61aa8e59" UNIQUE ("thumbnailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "UQ_6c57a6d8be1b8001ee31093ee99" UNIQUE ("thumbnailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "UQ_46efd1060cb7a7c545b06120d14" UNIQUE ("movieId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "UQ_ce049b6bf5d3e5aee0f3dbd8dc0" UNIQUE ("episodeId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "UQ_c155b5944bdd1e260a4ae79bc82" UNIQUE ("contentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "UQ_a20dc7d8915f1caf6079301b10e" UNIQUE ("thumbnailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "Content" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Content" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "FK_b6ac53aff4b7200e4b01ca43a9c" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "FK_e4e17f7e4fbf10e4bcd61aa8e59" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_bc417590af57a49dc42ce4ba038" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "FK_46efd1060cb7a7c545b06120d14" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "FK_ce049b6bf5d3e5aee0f3dbd8dc0" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "FK_c155b5944bdd1e260a4ae79bc82" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "FK_a20dc7d8915f1caf6079301b10e" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "FK_a20dc7d8915f1caf6079301b10e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "FK_c155b5944bdd1e260a4ae79bc82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "FK_ce049b6bf5d3e5aee0f3dbd8dc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "FK_46efd1060cb7a7c545b06120d14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "FK_bc417590af57a49dc42ce4ba038"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "FK_e4e17f7e4fbf10e4bcd61aa8e59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "FK_b6ac53aff4b7200e4b01ca43a9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Content" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Content" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "UQ_a20dc7d8915f1caf6079301b10e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" DROP CONSTRAINT "UQ_c155b5944bdd1e260a4ae79bc82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "UQ_ce049b6bf5d3e5aee0f3dbd8dc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" DROP CONSTRAINT "UQ_46efd1060cb7a7c545b06120d14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP CONSTRAINT "UQ_6c57a6d8be1b8001ee31093ee99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "UQ_e4e17f7e4fbf10e4bcd61aa8e59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" DROP CONSTRAINT "UQ_b6ac53aff4b7200e4b01ca43a9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Thumbnail" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "Thumbnail" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "Movie" DROP COLUMN "externalRating"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_a20dc7d8915f1caf6079301b10e" ON "Movie" ("thumbnailId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_c155b5944bdd1e260a4ae79bc8" ON "Movie" ("contentId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_ce049b6bf5d3e5aee0f3dbd8dc0" ON "Video" ("episodeId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_46efd1060cb7a7c545b06120d1" ON "Video" ("movieId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_6c57a6d8be1b8001ee31093ee99" ON "episode" ("thumbnailId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_e4e17f7e4fbf10e4bcd61aa8e59" ON "TvShow" ("thumbnailId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_b6ac53aff4b7200e4b01ca43a9c" ON "TvShow" ("contentId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "FK_c155b5944bdd1e260a4ae79bc82" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Movie" ADD CONSTRAINT "FK_a20dc7d8915f1caf6079301b10e" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "FK_ce049b6bf5d3e5aee0f3dbd8dc0" FOREIGN KEY ("episodeId") REFERENCES "episode"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Video" ADD CONSTRAINT "FK_46efd1060cb7a7c545b06120d14" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_bc417590af57a49dc42ce4ba038" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD CONSTRAINT "FK_6c57a6d8be1b8001ee31093ee99" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "FK_e4e17f7e4fbf10e4bcd61aa8e59" FOREIGN KEY ("thumbnailId") REFERENCES "Thumbnail"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "TvShow" ADD CONSTRAINT "FK_b6ac53aff4b7200e4b01ca43a9c" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
