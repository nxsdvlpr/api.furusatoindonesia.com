import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateResourceTable1645160828156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resource',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'slug',
            type: 'varchar',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'subject_ja',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'excerpt',
            type: 'text',
          },
          {
            name: 'excerpt_ja',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'body_ja',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'file',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'published',
            type: 'boolean',
            default: true,
          },
          {
            name: 'published_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('resource');
  }
}
