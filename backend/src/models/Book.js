const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Book',
  columns: {
    id: { primary: true, type: 'int', generated: true },
    title: { type: 'varchar' },
    author: { type: 'varchar' },
    status: { type: 'varchar', default: 'available' },
  },
});