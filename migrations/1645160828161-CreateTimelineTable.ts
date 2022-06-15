import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTimelineTable1645160828161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'timeline',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'taken_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'media_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'media_code',
            type: 'varchar',
          },
          {
            name: 'caption',
            type: 'text',
          },
          {
            name: 'url',
            type: 'jsonb',
          },
          {
            name: 'tags',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('timeline');
  }
}
