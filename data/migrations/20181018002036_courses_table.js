//modules.exports(up, down);


exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', function(tbl) {
    //Primary key called id
    //Creates a PK that auto-increments
    tbl.increments('id');
    
    tbl.string('name', 255).notNullable();
});

};

exports.down = function(knex, Promise) {
    //Rollback
    return knex.schema.dropTableIfExists('courses');
};
