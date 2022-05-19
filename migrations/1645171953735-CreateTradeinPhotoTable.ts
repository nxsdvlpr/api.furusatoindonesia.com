import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTradeinPhotoTable1645171953735
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tradein_photo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tradein_id',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'url',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tradein_photo',
      new TableForeignKey({
        columnNames: ['tradein_id'],
        referencedTableName: 'tradein',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tradein_photo');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('tradein_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein_photo', foreignKey);
    await queryRunner.dropColumn('tradein_photo', 'tradein_id');
    await queryRunner.dropTable('tradein_photo');
  }
}
