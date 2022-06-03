import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrganizationMemberTable1645160828158
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organization_member',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'organization_structure_id',
            type: 'integer',
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
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'profession',
            type: 'varchar',
          },
          {
            name: 'profession_jp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sequence',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('organization_member', [
      new TableForeignKey({
        columnNames: ['organization_structure_id'],
        referencedTableName: 'organization_structure',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('organization_member');

    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('organization_structure_id') !== -1,
    );
    await queryRunner.dropForeignKey('organization_member', foreignKey);
    await queryRunner.dropColumn(
      'organization_member',
      'organization_structure_id',
    );

    await queryRunner.dropTable('organization_member');
  }
}
