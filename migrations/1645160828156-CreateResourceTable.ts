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
            name: 'excerpt',
            type: 'text',
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'published',
            type: 'boolean',
            default: false,
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
