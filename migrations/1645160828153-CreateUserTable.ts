import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTable1645160828153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_id',
            type: 'integer',
          },
          {
            name: 'partner_id',
            type: 'integer',
            isNullable: true,
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
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('user', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedTableName: 'role',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),

      new TableForeignKey({
        columnNames: ['partner_id'],
        referencedTableName: 'partner',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    const roleIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('role_id') !== -1,
    );
    await queryRunner.dropForeignKey('user', roleIdForeignKey);
    await queryRunner.dropColumn('user', 'role_id');

    const partnerIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('partner_id') !== -1,
    );
    await queryRunner.dropForeignKey('user', partnerIdForeignKey);
    await queryRunner.dropColumn('user', 'partner_id');

    await queryRunner.dropTable('user');
  }
}
