import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTradeinTable1645171953734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tradein',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'brand',
            type: 'enum',
            enumName: 'tradein_brand',
            enum: ['Acer', 'Asus', 'HP', 'Dell', 'Lenovo', 'Other'],
            default: `'Acer'`,
          },
          {
            name: 'processor_id',
            type: 'integer',
          },
          {
            name: 'condition',
            type: 'enum',
            enumName: 'tradein_condition',
            enum: ['normal', 'dead', 'other'],
            default: `'normal'`,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'pickup_date',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'suggested_partner_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'potential_voucher',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'potential_cashback',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'voucher_code',
            length: '6',
            type: 'varchar',
            default: 'random_string(6)',
            isUnique: true,
          },
          {
            name: 'expired_at',
            type: 'date',
            default: 'now()',
          },
          {
            name: 'validated_at',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'verifier_user_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'verifier_partner_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'approved_voucher_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'shipping_receipt_no',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enumName: 'tradein_status',
            enum: ['new', 'validated', 'canceled', 'completed'],
            default: `'new'`,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('tradein', [
      new TableForeignKey({
        columnNames: ['processor_id'],
        referencedTableName: 'processor',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),

      new TableForeignKey({
        columnNames: ['suggested_partner_id'],
        referencedTableName: 'partner',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),

      new TableForeignKey({
        columnNames: ['verifier_user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),

      new TableForeignKey({
        columnNames: ['verifier_partner_id'],
        referencedTableName: 'partner',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),

      new TableForeignKey({
        columnNames: ['approved_voucher_id'],
        referencedTableName: 'voucher',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tradein');

    const processorIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('processor_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein', processorIdForeignKey);
    await queryRunner.dropColumn('tradein', 'processor_id');

    const partnerIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('suggested_partner_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein', partnerIdForeignKey);
    await queryRunner.dropColumn('tradein', 'suggested_partner_id');

    const verifierUserIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('verifier_user_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein', verifierUserIdForeignKey);
    await queryRunner.dropColumn('tradein', 'verifier_user_id');

    const verifierPartnerIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('verifier_partner_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein', verifierPartnerIdForeignKey);
    await queryRunner.dropColumn('tradein', 'verifier_partner_id');

    const voucherIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('approved_voucher_id') !== -1,
    );
    await queryRunner.dropForeignKey('tradein', voucherIdForeignKey);
    await queryRunner.dropColumn('tradein', 'approved_voucher_id');

    await queryRunner.dropTable('tradein');
  }
}
