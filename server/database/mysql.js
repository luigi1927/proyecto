const mysql = require('mysql');


const mysqlConfig = mysql.createPool({
    connectionLimit: 10,
    host: process.env.BDD_LOPEZ_ASOCIADOS_HOST,
    user: process.env.BDD_LOPEZ_ASOCIADOS_USER,
    password: process.env.BDD_LOPEZ_ASOCIADOS_PASSWORD,
    database: process.env.BDD_LOPEZ_ASOCIADOS_NAME,
    timezone: 'utc'
});

mysqlConfig.getConnection(function(err) {
    if (err) console.log('BASE DE DATOS NO CONECTADA; ERROR:', err)
    else
        console.log(`¡Base de datos  ${process.env.BDD_LOPEZ_ASOCIADOS_NAME} ONLINE!`)
});



async function executeQueries(stringSql) {

    return new Promise((resolve) => {
        mysqlConfig.query(stringSql,
            function(errorData, ResultData) {
                let responseDataBase = {
                    responseCode: (errorData) ? 500 : 200,
                    responseStatus: (errorData) ? false : true,
                    responseMessage: (errorData) ? errorData.sqlMessage : "OK",
                    resultData: (errorData) ? null : ResultData

                }
                resolve(responseDataBase);
            });
    });

}

module.exports = {
    executeQueries
}