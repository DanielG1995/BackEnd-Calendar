const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('BD Conectada')
    } catch (error) {
        throw new Error('Error al conectar a DB');
    }
}

module.exports={
    dbConnection
}