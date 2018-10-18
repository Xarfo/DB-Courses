
exports.up = function(knex, Promise) {
    return knex.schema.table('courses', tbl => {
        tbl.boolean('finished').defaultTo(0);
    })
  
};

exports.down = function(knex, Promise) {
    tbl.dropColumn('finished');
};
