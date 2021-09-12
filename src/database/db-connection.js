const mysql     = require('mysql2');
const dotenv    = require('dotenv');
dotenv.config();

class DB {
    constructor(){
        this.db = mysql.createPool({
            host: process.env.HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_DATABASE || 'test_db'
        });
        this.checkConnection();
    }

    checkConnection = () => {
        this.db.getConnection((err, connection) => {
            if(err){
                if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                    console.error('Database connection was closed.');
                }
                if(err.code === 'ER_CON_COUNT_ERROR'){
                    console.error('Database has too many connections.');
                }
                if(err.code === 'ECONNREFUSED'){
                    console.error('Database connection was refused');
                }
            }
            if(connection){
                connection.release();
            }
            return;
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}


const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 442,
    ER_DUP_ENTRY: 409
});

module.exports = new DB().query;
