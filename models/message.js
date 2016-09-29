
var connection = require('../config/db');

 // Use module
     var create = function(content){
     connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], function(err, result) {
      if (err) throw err;

      });

    };

    var all = function(req, res){

       connection.query('SELECT * FROM messages', function(err, rows) {
            if (err) throw err;
            return rows;
        });

    };

 module.exports = {
     create:create,
     all:all

 };