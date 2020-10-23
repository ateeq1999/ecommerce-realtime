'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table
        .uuid('id')
        .unique()
        .defaultTo(this.db.raw('public.gen_random_uuid()'))

      table.string('slug').notNullable()
      table.string('title', 100)
      table.string('description', 255)
      table.uuid('image_id').unsigned()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('categories')
  }
}

module.exports = CategorySchema
