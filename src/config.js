const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverPort: process.env.SERVER_PORT,
    mdbUser: process.env.MDB_USER,
    mdbPass: process.env.MDB_PASS,
    mdbHost: process.env.MDB_HOST,
    mdbPort: process.env.MDB_PORT,
    mdbName: process.env.MDB_DB,
    mdbAuth: process.env.MDB_AUTHDB
};
