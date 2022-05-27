import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sells extends BaseSchema {
  protected tableName = 'sells'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('bev_id')
      table.boolean('type')
      table.integer('price')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
