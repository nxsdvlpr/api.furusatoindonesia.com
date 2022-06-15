import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOptionTable1645160799579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'option',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'text',
          },
          {
            name: 'value_ja',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('option');
  }
}
