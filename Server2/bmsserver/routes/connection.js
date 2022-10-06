var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'bmz.mysql.database.azure.com',
//     user     : 'sreeni@bmz',
//     password : '123456789@a',
//     database : 'bmsezetap'
// });

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bookmyshow'
});

connection.connect(function(err) {
    if (err) throw err;
    else{
        console.log("DB Connection Successfull!!!")
    }
});

module.exports=connection