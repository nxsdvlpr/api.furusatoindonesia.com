import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostTable1645160828154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post',
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
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'title_jp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'excerpt',
            type: 'varchar',
          },
          {
            name: 'excerpt_jp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'body_jp',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'publish',
            type: 'boolean',
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
    await queryRunner.dropTable('post');
  }
}
