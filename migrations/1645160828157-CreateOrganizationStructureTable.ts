import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrganizationStructureTable1645160828157
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organization_structure',
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
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'subject_ja',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'description_ja',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('organization_structure');
  }
}
