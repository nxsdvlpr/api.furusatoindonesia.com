import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticleTable1645160828154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'article',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'group',
            type: 'varchar',
          },
          {
            name: 'slug',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title_ja',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'subtitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'subtitle_ja',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'excerpt',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'excerpt_ja',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'body_ja',
            type: 'text',
            isNullable: true,
            default: "''",
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'counter',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'published',
            type: 'boolean',
            default: true,
          },
          {
            name: 'sequence',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('article');
  }
}
