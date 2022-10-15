var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'bmsshrink.mysql.database.azure.com',
    user     : 'sreeni_bms',
    password : '123456789@a',
    database : 'bmsezetap'
});

//For local uncomment the below code
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'bookmyshow'
// });

connection.connect(function(err) {
    if (err) throw err;
    else{
        console.log("DB Connection Successfull!!!")
    }
});

module.exports=connection