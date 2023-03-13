const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('uncaught Exeption. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

dotenv.config({path: './config.env'});
const app = require('./app');




const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connections successful');
});

const port = 5000 || process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Server is up at ${port}`);
})

//Handling if DB not connected
process.on('unhandledRejection', err => {
console.log(err.name, err.message);
console.log('Unhandled Rejection. Shutting down...');
server.close(() => {
process.exit(1)
})
})