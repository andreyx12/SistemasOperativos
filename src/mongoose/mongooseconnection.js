var mongoose = require('mongoose');

/* URL de conexión */
const connectionURL =  'mongodb+srv://admin:admin!x.@cluster0-ezvg3.mongodb.net/test?retryWrites=true&w=majority'

/* Parámetros de la conexión */
var connectionParams = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}
/* Conexión MongoDB */
mongoose.connect(connectionURL, connectionParams).then(() =>  
        console.log('MongoDB connection succesful!')
    ).catch((err) => 
        console.error(err)
);