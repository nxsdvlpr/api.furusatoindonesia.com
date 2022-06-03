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
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'subject_jp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'excerpt',
            type: 'text',
          },
          {
            name: 'excerpt_jp',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'body_jp',
            type: 'text',
            isNullable: true,
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
            name: 'published',
            type: 'boolean',
            default: true,
          },
          {
            name: 'sequence',
            type: 'int',
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
